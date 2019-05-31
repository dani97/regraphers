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
        args = formatArg(typesObject, props.queryType);
        treeData = formatSchemaToTree(typesObject, props.queryType);
    }

    const formatQueryToTree = (query) => {
        let queryJson = {};
        query.forEach(queryLine => {
            buildQuery(queryLine , queryJson);
        });
        setQuery(queryJson);
    }

    return(
        <div>
            <TreeCheckBox schema = {treeData} handleQueryChange={(query) => {formatQueryToTree(query)}}/>
            <QueryViewer query = {query} args={args} endPoint={props.endPoint}/>
        </div>
    );
}

export default QueryTreeBuilder;