import React, {Fragment, useState} from 'react';
import { executeGraphqlOperation, getGraphQLOperationPayload } from '../services/project';
import { Formik } from 'formik';

// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.

const QueryTester = (props) => {
    let initialValues = {};
    props.args.forEach(arg => {
        initialValues[arg.name] = '';
    });

    let [graphQLResult, setGraphQLResult] = useState('');

    function getInput(arg, handleChange) {
        console.log(arg);
        if(arg.type.kind == 'SCALAR') {
            return <input type="text" className={"mb-20"} placeholder={arg.name} name={arg.name} onChange={handleChange}></input>
        }
        else {
            return <textarea name={arg.name} placeholder={arg.name} className={"mb-20"} onChange={handleChange}></textarea>
        }
    }

    const closeModal = (event) => {
        props.closeModal();
    }

    return (
        <div className={"modal-container"}>
            <h2 className={"modal-header"}>Args List</h2>
            <Formik
                initialValues={initialValues}
                onSubmit= {(values) => {
                        console.log('values are ', values);
                        let query = "query cmsPage($id : Int) { cmsPage(id: $id) { content } }";
                            values = "{ \"id\": 3}";
                        let payload = getGraphQLOperationPayload(props.endPoint, query, values);
                        console.log('payload is ', payload);
                        executeGraphqlOperation(payload).then((result) => {
                            if(result && result.data && result.data.executeGraphqlOperation) {
                                setGraphQLResult(result.data.executeGraphqlOperation);
                            }
                        });
                    }
                }>
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  }) => (
                    <form className={"args-form"} onSubmit={handleSubmit}>
                        {
                            props.args.map((arg,index) => (
                                <Fragment key={index}>
                                    {getInput(arg, handleChange)}
                                </Fragment>
                            ))
                        }


                        <button className={"btn-play"} type="submit" disabled={isSubmitting}>
                            <svg width="35" height="35" viewBox="3.5,4.5,24,24"><path d="M 11 9 L 24 16 L 11 23 z"></path></svg>
                        </button>

                        <button type={'button'} className={"btn-primary fixed-right"} onClick={() => {
                            props.handleSave();
                        }}>Save</button>

                        <button type={'button'} className={"btn-secondary fixed-right"} onClick={closeModal}>Cancel</button>
                    </form>
                )

                }
            </Formik>
            <div className={"test-sample-response"}>
                <pre dangerouslySetInnerHTML={{__html: graphQLResult}}></pre>
            </div>
        </div>
    );
}

export default QueryTester;