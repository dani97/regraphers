import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { saveProject } from "../actions/project";
import Message from "./Message";

const CreateProject = (props) => {
    /**
     * By default in RouterV4, there are certain props that all routes can
     * access inside a Router Component, match, location, history, staticContext
     */
    console.log('props are ',props);

    /**
     * Sets projectName and endPoint as local state for
     * CreateProject Component
     */
    let [projectName, setProjectName] = useState('');
    let [endPoint, setEndPoint] = useState('');

    const handleProjectNameChange = (event) => {
        /**
         * To change the state of the variable declared use the
         * setters for the state
         */
        setProjectName(event.target.value);
    }
    const handleEndPointChange = (event) => {
        setEndPoint(event.target.value);
    }

    const saveProject = (event) => {
        event.preventDefault();
        let routerProps = (props.routerProps)
                            ? props.routerProps
                            : null;
        console.log('router props are ', routerProps);
        props.saveProject({
            id: new Date().getTime(),
            projectName: projectName,
            endPoint: endPoint
        }, routerProps);

    }

    const closeModal = (event) => {
        console.log('into close modal');
        props.closeModal();
    }
    /**
     * Value assigned for input types are the state values of the CreateProject Component
     */
    return (
        <div className={"modal-container"}>
            <h2 className={"modal-header"}>Create New Project</h2>
            <form onSubmit={saveProject}>
                <div className={'control'}>
                    <input type={'text'} value={projectName} placeholder={"Project Name"} onChange={handleProjectNameChange}/>
                </div>
                <div className={'control'}>
                    <input type={'text'} value={endPoint} placeholder={"End Point"} onChange={handleEndPointChange}/>
                    <Message/>
                </div>
                <div className={"flex-display mt-50"}>
                    <input type={'submit'} className={"btn-primary"} value={'Save'}/>
                    <button type={'button'} className={"btn-secondary"} onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

/*const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => bindActionCreators({updateProject}, dispatch);
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(CreateProject);
export default ConnectedApp;*/

export default connect(
    (state) => ({}),
    {saveProject}
)(CreateProject);
