import React, { useState } from 'react';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { createEndPointOperation} from "../services/project";
import {connect} from "react-redux";
import Modal from "react-awesome-modal";
import Message from "./Message";
import CreateProject from "./CreateProject";
import QueryTester from './QueryTester';

const QueryViewer = (props) => {

    console.log('props are ', props);
    let queryHtml = !(Object.keys(props.query).length === 0
        && props.query.constructor === Object) ?
        jsonToGraphQLQuery(props.query, {pretty: true}): '';

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
                "query_string": queryHtml,
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
        endPoint: state.project.endPoint
    })
)(QueryViewer);
