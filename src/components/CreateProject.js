import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { connect } from "react-redux";
import { saveProject } from "../actions/project";
import Message from "./Message";

const projectSchema = Yup.object().shape({
    projectName: Yup.string()
        .required('Required'),
    endPoint: Yup.string()
        .required('Required')
});

const CreateProject = (props) => (
    <div className={"modal-container"}>
        <h2 className={"modal-header"}>Create New Project</h2>
        <Formik
            initialValues={{
                projectName: '',
                endPoint: ''
            }}
            validationSchema={projectSchema}
            onSubmit={values => {
                let routerProps = (props.routerProps)
                    ? props.routerProps
                    : null;
                console.log('router props are ', routerProps);
                props.saveProject({
                    id: new Date().getTime(),
                    projectName: values.projectName,
                    endPoint: values.endPoint
                }, routerProps);
            }}>
            {({ errors, touched }) => (
                <Form>
                    <Message/>
                    <div className={'control'}>
                        <Field name="projectName" placeholder={"Project Name"} required={"required"} />
                    </div>
                    <div className={'control'}>
                        <Field name="endPoint" placeholder={"End Point"} required={"required"} />
                    </div>
                    <div className={"flex-display mt-55"}>
                        <button type={'submit'} className={"btn-primary"} value={'Save'}/>
                        <button type={'button'} className={"btn-secondary"} value={'Cancel'} onClick={() => {
                            props.closeModal()
                        }}/>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
);

export default connect(
    (state) => ({}),
    {saveProject}
)(CreateProject);
