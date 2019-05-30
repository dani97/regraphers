import React from 'react';
import { jsonToGraphQLQuery } from 'json-to-graphql-query'

const QueryViewer = (props) => {
    let queryHtml = !(Object.keys(props.query).length === 0
        && props.query.constructor === Object) ?
        jsonToGraphQLQuery(props.query, {pretty: true}): '';
    function handleTest() {
        alert("button clicked");
    }

    function handleSave() {
        alert("save query");
    }
    return (
        <div>
            <pre dangerouslySetInnerHTML={{__html: queryHtml}}></pre>
            <button onClick={handleTest}> Test </button>
            <button onClick={handleSave}> save </button>
        </div>
    )

}

export default QueryViewer;