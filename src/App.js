import React, {useState, useEffect} from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";
import gql from 'graphql-tag';
import { buildClientSchema } from 'graphql';
import 'regenerator-runtime/runtime';
import { DocExplorer } from './DocExplorer';
import './app.css';
import 'react-sortable-tree/style.css';
import TreeCheckBox from './TreeCheckBox';
import QueryViewer from './QueryViewer';
import QueryArguments from "./QueryArguments";

const client = new ApolloClient({
    uri: "http://127.0.0.1:4000/"
});

const introspectionQuery = gql`
query introspection {
    introspection {
      result {
        queryResult
      }
    }
}`;

function buildQuery(queryLine , queryJson) {
    let path = queryLine.split("-");
    let queryJsonTraverser = queryJson;
    path.forEach((pathItem, index, pathRef) => {
        if(!queryJsonTraverser.hasOwnProperty(pathItem)) {
            if(pathRef.length - 1 != index) {
                queryJsonTraverser[pathItem] = {};
            }
            else {
                queryJsonTraverser[pathItem] = true;
            }

        }
        queryJsonTraverser = queryJsonTraverser[pathItem];
    });
}

function checkInfRecursion(parentname , name) {
    const listName = parentname.split("-");
    return listName.indexOf(name) != -1;
}

function createSchemaTree(schema, schemaTree, field, parentName = '') {
    const hasRecursion = checkInfRecursion(parentName, field.name);
    let node = {
        value: parentName + '-' + field.name,
        label: hasRecursion? '...' + field.name: field.name,
        parentNode: schemaTree
    };
    let name = parentName + '-' + field.name;
    schemaTree.push(node);
    if(hasRecursion) {
        return;
    }
    if(field.type && field.type.kind == "OBJECT" && field.type.name !== null) {
        schemaTree[schemaTree.length-1].children = [];
        const fields = schema[field.type.name].fields;
        for(const innerField of fields) {
            createSchemaTree(schema, schemaTree[schemaTree.length - 1].children, innerField, name);
        }
    }
    else if(field.type && field.type.kind == "LIST") {
        try {
            const interfaceNode = field.type.ofType;
            const fields = schema[interfaceNode.name].fields;
            schemaTree[schemaTree.length-1].children = [];
            if(fields) {
                for (const innerField of fields) {
                    createSchemaTree(schema, schemaTree[schemaTree.length - 1].children, innerField, name);
                }
            }
        }
        catch (e) {
            console.log("error on list processing",e)
        }
    }
    return;
}

function formatSchemaToTree(schemaType) {
    if(schemaType === null || schemaType ==  {} ) {
        return [];
    }
    console.log("schema type", schemaType);
    let fields = schemaType['Products'].fields;
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


function formatArg(types) {
    try {
        const queryType = types['Query'].fields.find((type) => {
            return (type.name == 'products')});

        return queryType.args;
    }
    catch (e) {
        return null;
    }
}

const App = () => {
    let [schema, setSchema] = useState(null);
    let [clientSchema, setClientSchema] = useState(null);
    let [treeData, setTreeData] = useState([]);
    let [query, setQuery] = useState({});
    let [arg , setArg] = useState([]);
    function formatQueryToTree(query) {
        let queryJson = {}
        query.forEach(queryLine => {
            buildQuery(queryLine , queryJson);
        });
        setQuery(queryJson);
    }


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
            setArg(formatArg(typesObject));
            setTreeData(formatSchemaToTree(typesObject));
            setClientSchema(buildClientSchema(schema));
        }
    }, [schema]);


    return (
        <ApolloProvider client = {client}>
            <DocExplorer schema = {clientSchema}/>
            <TreeCheckBox
                schema = {treeData}
                handleQueryChange={(query) => {formatQueryToTree(query)}}
            />
            <QueryViewer query = {query}/>
            <QueryArguments args={arg}/>
        </ApolloProvider>
    );
}

export default App;