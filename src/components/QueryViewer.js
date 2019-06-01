import React, { useState, useRef } from 'react';
import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
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

    let [visible, setVisible] = useState(false),
        [saveVisibility, setSaveVisibility] = useState(false),
        [copySuccess, setCopySuccess] = useState(''),
        queryViewerRef = useRef(null);

    const copyToClipboard = (event) => {
        let textContent = queryViewerRef.current.textContent,
        textArea = document.getElementById("resultJsonText");
        if(!textArea) {
            textArea = document.createElement('textarea');
            textArea.setAttribute("id", "resultJsonText");
            textArea.setAttribute("class", "no-visible");
        }
        textArea.textContent = textContent;
        document.body.append(textArea);
        textArea.select();

        document.execCommand("copy");
        event.target.focus();
        setCopySuccess('Copied!');
    };

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
            onSaveCloseModal();
            props.routerProps.history.push('/queries');
        });
    }
    return (
        <div className={"overflow-section"}>
            <div>
                {
                    /* Logical shortcut for only displaying the
                       button if the copy command exists */
                    document.queryCommandSupported('copy') &&
                    <div className={"copy-status"}>
                        <button className={"btn-secondary copy-json"} onClick={copyToClipboard}><FontAwesomeIcon icon={faCopy}/></button>
                        {copySuccess}
                    </div>
                }
            </div>
            <pre ref={queryViewerRef} dangerouslySetInnerHTML={{__html: queryHtml}}></pre>
            <button className={"btn-primary btn-test"} onClick={onOpenModal}> Test </button>
            <Modal visible={visible} width="1000" height="550" effect="fadeInUp" onClickAway={onCloseModal}>
                <Message/>
                <QueryTester closeModal={onCloseModal} args={props.args} endPoint={props.endPoint} query={queryHtml} />
            </Modal>

            <button className={"btn-secondary btn-save"} onClick={onSaveOpenModal}> Save </button>
            <Modal visible={saveVisibility} width="400" height="300" effect="fadeInUp" onClickAway={onSaveCloseModal}>
                <SaveEditor closeModal={onSaveCloseModal} handleSave={handleSave}/>
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
