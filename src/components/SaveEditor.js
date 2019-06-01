import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

const querySchema = Yup.object().shape({
    queryName: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required')
});

const SaveEditor = (props) => (
    <div className={"modal-container"}>
        <h2 className={"modal-header"}>Save Query</h2>
        <Formik
            initialValues={{
                queryName: '',
                description: '',
                page: ''
            }}
            validationSchema={querySchema}
            onSubmit={values => {
                props.handleSave(values);
            }}>
            {({ errors, touched }) => (
                <Form>
                    <div>
                        <Field className={"mt-10"} type="text" name="queryName" placeholder="Query Name" />
                        <ErrorMessage name="queryName" />
                    </div>
                    <div>
                        <Field type="text" className={"mt-10"} placeholder="Description" name="description" component="textarea" />
                    </div>
                    <div>
                        <Field type="text" className={"mt-10"} placeholder="page" name="page" />
                    </div>
                    <div className={"flex-display mt-20"}>
                        <button type={'submit'} className={"btn-primary"}>Submit</button>
                        <button type={'button'} className={"btn-secondary"} onClick={() => {
                            props.closeModal()
                        }}>Cancel
                        </button>
                    </div>                    
                </Form>
            )}
        </Formik>
        <div>
            
        </div>
    </div>
);

export default SaveEditor;
