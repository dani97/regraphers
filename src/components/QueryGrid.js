import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { listEndPointOperations } from "../services/project";
import Modal from "react-awesome-modal";
import AwsExports from '../AwsExports';
import AwsClient from '../AwsClient';
import Amplify, { Auth } from 'aws-amplify';
import {v4 as uuid } from 'uuid';
import { createWireFrame } from "../actions/wireFrame";
import { createNewWireFrame } from "../services/project";
import { showLoader } from "../actions/loader";

Amplify.configure(AwsExports);

const QueryGrid = (props) => {

    const S3_BASE_URL = 'https://s3.amazonaws.com/';

    let [queries, setQueries] = useState([]);
    let [visible, setVisible] = useState([]);

    const onOpenModal = (id) => {
        let visibleState = visible.slice(0);
        visibleState[id] = true;
        setVisible(visibleState);
    }

    const onCloseModal= (id) => {
        let visibleState = visible.slice(0);
        visibleState[id] = false;
        setVisible(visibleState);
    }

    const handleFileChange = (fileInput, query) => {
        if(fileInput && fileInput.length > 0) {
            let selectedFile = fileInput[0];
            (async () => {
                let file;
                console.log("input", fileInput);
                if (selectedFile) { // selectedFile is the file to be uploaded, typically comes from an <input type="file" />
                    const {type: mimeType} = selectedFile;
                    const name = selectedFile.name;
                    const extension = /([^.]+)(\.(\w+))?$/.exec(name)[3];
                    console.log(extension);
                    const bucket = AwsExports.aws_user_files_s3_bucket;
                    const region = AwsExports.aws_user_files_s3_bucket_region;
                    const visibility = 'public';
                    const {identityId} = await Auth.currentCredentials();

                    const key = `${visibility}/${identityId}/${uuid()}${extension && '.'}${extension}`;

                    file = {
                        bucket,
                        key,
                        region,
                        mimeType,
                        localUri: selectedFile
                    };
                    console.log("selected file", file, extension);
                }
                let payload = {
                    query_id: query.id,
                    file
                }
                props.showLoader(true);
                createNewWireFrame(payload).then((result) => {
                        props.showLoader(false);
                        console.log(result);
                        let image_url= null;
                        if(result && result.data && result.data.createWireFrame) {
                            let file = result.data.createWireFrame.file;
                            image_url = S3_BASE_URL + file.bucket + '/' + file.key
                        }
                        props.createWireFrame({
                            query,
                            image_url
                        });
                        props.routerProps.history.push('/wireFrame');
                    },
                    error => {
                        console.log('error is ', error);
                        props.showLoader(false);
                    }
                );
            })();
        }
    }

    console.log('in wireFrame gris props ', props);
    useEffect(() => {
        console.log('endpoint in grid ', props.endPoint);
        if(props.endPoint.trim().length) {
            console.log('endpoint has length');
            listEndPointOperations(props.endPoint).then((result) => {
                console.log(result);
                if(result.data && result.data.listEndPointOperations) {
                    let endPointOperations = result.data.listEndPointOperations;
                    if(endPointOperations && endPointOperations.items && endPointOperations.items.length) {
                        console.log('before setting to wireFrame  ', endPointOperations.items);
                        setQueries(endPointOperations.items);
                        setVisible(Array(endPointOperations.items.length).fill(false));
                    }
                }
            });
        }
    },[]);

    return (
        <div>
            <div className={"title-bar"}>
                <h2>Saved Queries</h2>
            </div>
            {queries.map((query, index) => (
                <div className={"secondary-card saved-query"} key={index}>
                    <div className={"secondary-card-main"}>
                        <div onClick={() => onOpenModal(index)}>
                            <h3>{query.name}</h3>
                            <p>{query.description}</p>
                        </div>
                    </div>
                    <div className={"secondary-card-actions"}>
                        <input type='file' name='file'  onChange={(event) => handleFileChange(event.target.files, query)} />
                    </div>
                    <Modal visible={visible[index]} width="800" height="450" effect="fadeInUp" onClickAway={() => onCloseModal(index)}>
                        <div className={"modal-container"}>
                            <h2 className={"modal-header"}>Your Query</h2>
                            <div className={"test-sample-response"}>
                                <pre dangerouslySetInnerHTML={{__html: query.graphql_query}}></pre>
                            </div>
                            <button type={'button'} className={"btn-secondary fixed-right close"} onClick={() => {
                                onCloseModal(index);
                            }}>X</button>
                        </div>
                    </Modal>
                </div>
                )
            )}
        </div>);
}

export default connect(
    state => ({
        endPoint: state.project.endPoint
    }),
    {createWireFrame, showLoader}
)(QueryGrid);