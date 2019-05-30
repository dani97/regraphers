import React, { useState } from 'react';
import TreeCheckBox from './TreeCheckBox';
import QueryViewer from './QueryViewer';
import { createTypesObject, formatArg, formatSchemaToTree, buildQuery } from "../services/project";

const QueryTreeBuilder = (props) => {

    let treeData = [],
        args = [];

    let [query, setQuery] = useState({});

    if(props.schema) {
        let typesObject = createTypesObject(props.schema);
        args = formatArg(typesObject);
        treeData = formatSchemaToTree(typesObject);
    }

    const formatQueryToTree = (query) => {
        let queryJson = {}
        query.forEach(queryLine => {
            buildQuery(queryLine , queryJson);
        });
        console.log('query json ', queryJson);
        console.log('args are ', args);
        setQuery(queryJson);
    }

    return(
        <div>
            <TreeCheckBox schema = {treeData} handleQueryChange={(query) => {formatQueryToTree(query)}}/>
            <QueryViewer query = {query} args={args}/>
        </div>
    );
}

export default QueryTreeBuilder;