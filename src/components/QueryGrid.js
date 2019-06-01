import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { listEndPointOperations } from "../services/project";
import { saveAnnotatedQuery } from "../actions/query";
import Modal from "react-awesome-modal";
import AwsExports from '../AwsExports';
import Amplify, { Auth } from 'aws-amplify';
import {v4 as uuid } from 'uuid';

Amplify.configure(AwsExports);

const QueryGrid = (props) => {

    let [queries, setQueries] = useState([]);
    let [visible, setVisible] = useState(false);

    const onOpenModal = () => {
        setVisible(true);
    }

    const onCloseModal= () => {
        setVisible(false);
    }

    const handleFileChange = (fileInput) => {
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

                client.mutate({
                    mutation: gql(createTodo),
                    variables: {
                        input: {
                            name: 'Upload file',
                            description: 'Uses complex objects to upload',
                            file: file,
                        }
                    }
                }).then((result) => {
                    console.log(result)
                });

            })();
        }
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
            <div className={"title-bar"}>
                <h2>Saved Queries</h2>
            </div>
            {queries.map((query, index) => (
                <div className={"secondary-card saved-query"} key={index}>
                    <div className={"secondary-card-main"} onClick={onOpenModal}>
                        <div>
                            <h3>{query.name}</h3>
                            <p>{query.description}</p>
                        </div>
                        <div>
                            <input type='file' name='file'  onChange={(event) => handleFileChange(event.target.files)} />
                        </div>
                    </div>
                    <Modal visible={visible} width="1000" height="550" effect="fadeInUp" onClickAway={onCloseModal}>
                        <pre dangerouslySetInnerHTML={{__html: query.graphql_query}}></pre>
                        <button type={'button'} className={"btn-secondary"} onClick={() => {
                            onCloseModal();
                        }}>Cancel</button>
                    </Modal>
                    <div className={"secondary-card-actions"}>
                    <button className={"action primary"} onClick={() => {
                        props.saveAnnotatedQuery(query);
                        props.routerProps.history.push('/wireFrame');
                    }}>Annotate</button>
                    </div>
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