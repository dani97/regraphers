import React from 'react';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { createEndPointOperation} from "../services/project";
import {connect} from "react-redux";

const QueryViewer = (props) => {
    let queryHtml = !(Object.keys(props.query).length === 0
        && props.query.constructor === Object) ?
        jsonToGraphQLQuery(props.query, {pretty: true}): '';
    function handleTest() {
        alert("button clicked");
    }

    function handleSave() {
        console.log("query to be saved" , props.query);
        const payload = {
                "endpoint": props.endPoint+'/',
                "name": "CMS query 404 page",
                "query_string": queryHtml,
                "page": "404 page",
                "description": "CMS query on the 404"
            };
        createEndPointOperation(payload).then((result) => console.log(result));
    }
    return (
        <div>
            <pre dangerouslySetInnerHTML={{__html: queryHtml}}></pre>
            <button onClick={handleTest}> Test </button>
            <button onClick={handleSave}> save </button>
        </div>
    )

}
export default connect(
    state => ({
        endPoint: state.project.endPoint
    })
)(QueryViewer);
