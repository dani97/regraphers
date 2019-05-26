import React, { useState } from 'react';
import TreeCheckBox from './TreeCheckBox';
import QueryViewer from './QueryViewer';
import { getTreeData, buildQuery } from "../services/project";

const QueryTreeBuilder = (props) => {

    const treeData = getTreeData(props.schema);

    let [query, setQuery] = useState({});

    const formatQueryToTree = (query) => {
        let queryJson = {}
        query.forEach(queryLine => {
            buildQuery(queryLine , queryJson);
        });
        setQuery(queryJson);
    }

    return(
        <div>
            <h3>This is tree builder</h3>
            <TreeCheckBox schema = {treeData} handleQueryChange={(query) => {formatQueryToTree(query)}}/>
            <QueryViewer query = {query}/>
        </div>
    );
}

export default QueryTreeBuilder;