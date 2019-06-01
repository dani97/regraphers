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
    <div>
        <h1>Save Query</h1>
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
                        Query Name <Field name="queryName" required={"required"} />
                    </div>
                    <div>
                        Description <Field name="description" component="textarea" />
                    </div>
                    <div>
                        Page <Field name="page" />
                    </div>
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
        <div>
            <button type={'button'} className={"btn-secondary"} onClick={() => {
                props.closeModal();
            }}>Cancel</button>
        </div>
    </div>
);

export default SaveEditor;
