import React, {Fragment, useState} from 'react';
import { executeGraphqlOperation, getGraphQLOperationPayload } from '../services/project';
import { Formik } from 'formik';

// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.

const QueryTester = (props) => {
    let initialValues = {};
    props.args.forEach(arg => {
        if(arg.type.kind == 'SCALAR') {

            if(arg.type.name) {
                const inputType = arg.type.name;
                switch (inputType) {
                    case 'Int':
                        initialValues[arg.name] = 1;
                        break;
                    case 'Float':
                        initialValues[arg.name] = 1.0;
                        break;
                    case 'Boolean':
                        initialValues[arg.name] = false;
                        break;
                    default:
                        initialValues[arg.name] = ''
                }
            }
        }
        else {
            initialValues[arg.name] = '';
        }
    });

    let [graphQLResult, setGraphQLResult] = useState('');

    function getInput(arg, handleChange) {
        console.log(arg);
        if(arg.type.kind == 'SCALAR') {

            if(arg.type.name) {
                const inputType = arg.type.name;
                switch (inputType) {
                    case 'Int':
                        return <input type = "number" name={arg.name} onChange={handleChange}/>;
                    case 'Float':
                        return <input type = "number" step = 'any' name={arg.name} onChange={handleChange}/>;
                    case 'Boolean':
                        return <input type = "checkbox" name={arg.name} onChange={handleChange} />;
                    default:
                        return <input name={arg.name} onChange={handleChange} />;
                }
            }
        }
        else {
            return <textarea name={arg.name} onChange={handleChange}></textarea>
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


                        <button className={"btn-play"} type="submit" disabled={isSubmitting}>
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