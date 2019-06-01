import React, { useState } from 'react';
import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';
import { createEndPointOperation} from "../services/project";
import {connect} from "react-redux";
import Modal from "react-awesome-modal";
import Message from "./Message";
import QueryTester from './QueryTester';
import SaveEditor from './SaveEditor';
import { Link } from 'react-router-dom';

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
    let [saveVisibility, setSaveVisibility] = useState(false);

    const onOpenModal = () => {
        setVisible(true);
    }

    const onCloseModal= () => {
        setVisible(false);
    }

    const onSaveOpenModal = () => {
        setSaveVisibility(true);
    }

    const onSaveCloseModal = () => {
        setSaveVisibility(false);
    }

    const handleSave = (queryValues) => {
        console.log("query to be saved" , queryValues);
        const payload = {
                "endpoint": props.endPoint+'/',
                "query_string": JSON.stringify(props.query),
                "graphql_query": queryHtml,
                "page": queryValues.page,
                "name": queryValues.queryName,
                "description": queryValues.description
            };
        console.log('payload is ', payload);
        createEndPointOperation(payload).then((result) => {
            console.log(result);
          //  onSaveCloseModal();
        });

    }
    return (
        <div className={"overflow-section"}>
            <pre dangerouslySetInnerHTML={{__html: queryHtml}}></pre>
            <button className={"btn-primary btn-test"} onClick={onOpenModal}> Test </button>
            <Modal visible={visible} width="1000" height="550" effect="fadeInUp" onClickAway={onCloseModal}>
                <Message/>
                <QueryTester closeModal={onCloseModal} args={props.args} endPoint={props.endPoint} query={queryHtml} />
            </Modal>

            <button className={"btn-secondary btn-save"} onClick={onSaveOpenModal}> Save </button>
            <Modal visible={saveVisibility} width="400" height="300" effect="fadeInUp" onClickAway={onSaveCloseModal}>
                <SaveEditor closeModal={onSaveCloseModal} handleSave={handleSave}/>
                <Link to={'/queries'}>Queries</Link>
            </Modal>
        </div>
    )

}
export default connect(
    state => ({
        endPoint: state.project.endPoint,
        queryType: state.queryType
    })
)(QueryViewer);
