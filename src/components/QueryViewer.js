import React, { useState } from 'react';
import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';
import { createEndPointOperation} from "../services/project";
import {connect} from "react-redux";
import Modal from "react-awesome-modal";
import Message from "./Message";
import QueryTester from './QueryTester';

function combineQueryArgs(query, args, queryType) {
    if(!(Object.keys(query).length === 0
        && query.constructor === Object)) {
        query = {"query": query};
        let queryArgs =  {};
        let variables = {};
        args.forEach((arg) => {
            variables[arg.name] = arg.type.name;
            queryArgs[arg.name] = new VariableType(arg.name);
        });

        query['query']['__variables'] = variables;
        query['query'][queryType]['__args'] = queryArgs;

        let queryHtml = jsonToGraphQLQuery(query, {pretty: true});
        return queryHtml;
    }
    return '';

}

const QueryViewer = (props) => {

    let queryHtml = combineQueryArgs(props.query, props.args, props.queryType);

    let [visible, setVisible] = useState(false);

    const onOpenModal = () => {
        setVisible(true);
    }

    const onCloseModal= () => {
        setVisible(false);
    }

    const handleSave = () => {
        console.log("query to be saved" , props.query);
        const payload = {
                "endpoint": props.endPoint+'/',
                "name": "CMS query 404 page",
                "query_string": JSON.stringify(props.query),
                "page": "404 page",
                "description": "CMS query on the 404"
            };
        createEndPointOperation(payload).then((result) => console.log(result));
    }
    return (
        <div>
            <pre dangerouslySetInnerHTML={{__html: queryHtml}}></pre>
            <button onClick={onOpenModal}> Test </button>
            <Modal visible={visible} width="400" height="300" effect="fadeInUp" onClickAway={onCloseModal}>
                <Message/>
                <QueryTester closeModal={onCloseModal} args={props.args} endPoint={props.endPoint} query={queryHtml} handleSave={handleSave}/>
            </Modal>
            <button onClick={handleSave}> save </button>
        </div>
    )

}
export default connect(
    state => ({
        endPoint: state.project.endPoint,
        queryType: state.queryType
    })
)(QueryViewer);
