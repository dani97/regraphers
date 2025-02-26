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
            initialValues[arg.name] = {};
        }
    });

    let [graphQLResult, setGraphQLResult] = useState('{}'),
        [visible, setVisible] = useState(false);

    const onOpenModal = () => {
        console.log('into open modal in wireFrame tester');
        setVisible(true);
    }

    const onCloseModal= () => {
        setVisible(false);
    }

    function getInput(arg, handleChange) {
        console.log(arg);
        if(arg.type.kind == 'SCALAR') {

            if(arg.type.name) {
                const inputType = arg.type.name;
                switch (inputType) {
                    case 'Int':
                        return <input type = "number" className={"mb-20"} name={arg.name} onChange={handleChange}/>;
                    case 'Float':
                        return <input type = "number" step = 'any' className={"mb-20"} name={arg.name} onChange={handleChange}/>;
                    case 'Boolean':
                        return <input type = "checkbox" className={"mb-20"} name={arg.name} onChange={handleChange} />;
                    default:
                        return <input type="text" className={"mb-20"} name={arg.name} onChange={handleChange} />;
                }
            }
        }
        else {
            return <textarea name={arg.name} className={"mb-20"} onChange={handleChange}></textarea>
        }
    }

    const closeModal = (event) => {
        props.closeModal();
    }

    return (
        <div className={"modal-container"}>
            <h2 className={"modal-header"}>Test Query</h2>
            <Formik
                initialValues={initialValues}
                onSubmit= {(values) => {
                        props.showLoader(true);
                        console.log('values are ', values);
                      //  let query = "query cmsPage($id : Int) { cmsPage(id: $id) { content } }";
                        //    values = "{ \"id\": 3}";
                        let payload = getGraphQLOperationPayload(props.endPoint, props.query, JSON.stringify(values));
                        console.log('payload is ', payload);
                        executeGraphqlOperation(payload).then((result) => {
                            if(result && result.data && result.data.executeGraphqlOperation) {
                                setGraphQLResult(result.data.executeGraphqlOperation);
                            }
                            props.showLoader(false);
                        },
                           error => {
                                props.showLoader(false);
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
                        <h3 className={"mb-20 mt-0"}>Arguments</h3>
                        {
                            props.args.map((arg,index) => (
                                <Fragment key={index}>
                                    <label>{arg.name} : </label>
                                    {getInput(arg, handleChange)}
                                </Fragment>
                            ))
                        }


                        <button className={"btn-play"} type="submit" disabled={isSubmitting}>
                            <svg width="35" height="35" viewBox="3.5,4.5,24,24"><path d="M 11 9 L 24 16 L 11 23 z"></path></svg>
                        </button>

                        <button type={'button'} className={"btn-secondary fixed-right close"} onClick={closeModal}>X</button>
                    </form>
                )

                }
            </Formik>
            <div className={"sample-response-container"}>
                <h3 className={"mb-20 mt-0"}>Sample Response</h3>
                <div className={"test-sample-response"}>
                    <pre dangerouslySetInnerHTML={{__html: JSON.stringify(JSON.parse(graphQLResult),null,2)}}></pre>
                </div>
            </div>
        </div>
    );
}

export default QueryTester;