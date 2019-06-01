import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { listEndPointOperations } from "../services/project";
import { saveAnnotatedQuery } from "../actions/query";
import Modal from "react-awesome-modal";
import SaveEditor from "./SaveEditor";
import Message from "./Message";
import QueryTester from "./QueryTester";

const QueryGrid = (props) => {

    let [queries, setQueries] = useState([]);
    let [visible, setVisible] = useState(false);

    const onOpenModal = () => {
        setVisible(true);
    }

    const onCloseModal= () => {
        setVisible(false);
    }

    console.log('in query gris props ', props);
    useEffect(() => {
        console.log('endpoint in grid ', props.endPoint);
        if(props.endPoint.trim().length) {
            console.log('endpoint has length');
            listEndPointOperations(props.endPoint).then((result) => {
                console.log(result);
                if(result.data && result.data.listEndPointOperations) {
                    let endPointOperations = result.data.listEndPointOperations;
                    if(endPointOperations && endPointOperations.items && endPointOperations.items.length) {
                        console.log('before setting to query  ', endPointOperations.items);
                        setQueries(endPointOperations.items);
                    }
                }
            });
        }
    },[]);

    return (
        <div>
            {queries.map((query, index) => (
                <div key={index}>
                    <div onClick={onOpenModal}>
                        <div>
                            <h3>{query.name}</h3>
                            <p>{query.description}</p>
                        </div>
                    </div>
                    <Modal visible={visible} width="1000" height="550" effect="fadeInUp" onClickAway={onCloseModal}>
                        <pre dangerouslySetInnerHTML={{__html: query.graphql_query}}></pre>
                        <button type={'button'} className={"btn-secondary"} onClick={() => {
                            onCloseModal();
                        }}>Cancel</button>
                    </Modal>
                    <button onClick={() => {
                        props.saveAnnotatedQuery(query);
                        props.routerProps.history.push('/wireFrame');
                    }}>Annotate</button>
                </div>
                )
            )}
        </div>);
}

export default connect(
    state => ({
        endPoint: state.project.endPoint
    }),
    {saveAnnotatedQuery}
)(QueryGrid);