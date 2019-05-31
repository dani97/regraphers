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
            return <input name={arg.name} onChange={handleChange}></input>
        }
        else {
            return <textarea name={arg.name} onChange={handleChange}></textarea>
        }
    }

    const closeModal = (event) => {
        props.closeModal();
    }

    return (
        <div>
            <h1>Args List</h1>
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
                    <form onSubmit={handleSubmit}>
                        {
                            props.args.map((arg,index) => (
                                <Fragment key={index}>
                                    <label>{arg.name}</label>
                                    {getInput(arg, handleChange)}
                                    <br></br>
                                </Fragment>
                            ))
                        }
                        <p>{JSON.stringify(values)}</p>


                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                        <button type={'button'} onClick={closeModal}>Cancel</button>

                        <button type={'button'} onClick={() => {
                            props.handleSave();
                        }}>Save</button>
                    </form>
                )

                }
            </Formik>
            <div>
                <pre dangerouslySetInnerHTML={{__html: graphQLResult}}></pre>
            </div>
        </div>
    );
}

export default QueryTester;