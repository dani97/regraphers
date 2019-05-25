import React, {useState, useEffect} from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";
import gql from 'graphql-tag';
import { buildClientSchema } from 'graphql';
import 'regenerator-runtime/runtime';
import { DocExplorer } from './DocExplorer';
import './app.css';
import 'react-sortable-tree/style.css';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import TreeCheckBox from './TreeCheckBox';

const client = new ApolloClient({
  uri: "https://graphql-hackers.now.sh/"
});

const introspectionQuery = gql`
query introspection {
    introspection {
      result {
        queryResult
      }
    }
}`;


function formatQueryToTree(query) {
    const maxDepth = 7;
    const treeData =  [
        { title: "Chicken", expanded: true, children: [{ title: "Egg" }] }
    ]
    return treeData;
}

function createSchemaTree(schema, schemaTree, field, parentName = '') {
    let node = {
        value: parentName + '_' + field.name,
        label: field.name
    };
    let name = parentName + '-' + field.name;
    schemaTree.push(node);
    console.log("field is",field);
    if(field.type && field.type.kind == "OBJECT" && field.type.name !== null) {
        schemaTree[schemaTree.length-1].children = [];
        const fields = schema[field.type.name].fields;
        for(const innerfield of fields)
        createSchemaTree(schema,schemaTree[schemaTree.length-1].children , innerfield, name);
    }
    return;
}

function formatSchemaToTree(schemaType) {
    if(schemaType === null || schemaType ==  {} ) {
        return [];
    }
    console.log("schema type", schemaType);
    let fields = schemaType['ProductInterface'].fields;
    const schemaTree = [];
    for (const field of fields) {
        createSchemaTree(schemaType, schemaTree, field, 'products');
    }

    return schemaTree;
}

function createTypesObject(schema) {
    if(!schema) return {};
    const fields = schema.__schema.types;
    const typesObject = fields.reduce((obj,item) => {
        obj[item.name] = item;
        return obj;
    }, {});
    return typesObject;
}


const App = () => {
    let [schema, setSchema] = useState(null);
    let [clientSchema, setClientSchema] = useState(null);
    let [treeData, setTreeData] = useState([]);
    let [query, setQuery] = useState([]);
    const maxDepth = 7;
    let typesObject = {};


    useEffect(() => {
        async function getSchema() {
            return await client.query({query: introspectionQuery});
        }
        getSchema().then((result) => {
            setSchema(JSON.parse(result.data.introspection.result.queryResult));
            console.log("schema", schema);
        });
    },[]);

    useEffect(() => {
        if(schema) {
            const typesObject = createTypesObject(schema);
            setTreeData(formatSchemaToTree(typesObject));
            setClientSchema(buildClientSchema(schema));
        }
    }, [schema]);

    // useEffect(() => {
    //     setQuery(formatQueryToTree(query));
    // },[query]);



    return (
        <ApolloProvider client = {client}>
            <DocExplorer schema = {clientSchema}/>
            <TreeCheckBox
                schema = {treeData}
                handleQueryChange={(query) => {formatQueryToTree(query)}}
            />
            {/*<div style={{ height: 500 }}>*/}
            {/*    <SortableTree*/}
            {/*        treeData = {query}*/}
            {/*        onChange = {(query) => setQuery(query)}*/}
            {/*    />*/}
            {/*</div>*/}
        </ApolloProvider>
    );
}

export default App;