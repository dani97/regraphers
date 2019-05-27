import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { saveProject } from "../actions/project";

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
        props.saveProject({
            id: new Date().getTime(),
            projectName: projectName,
            endPoint: endPoint
        });

    }

    const closeModal = (event) => {
        console.log('into close modal');
        props.closeModal();
    }
    /**
     * Value assigned for input types are the state values of the CreateProject Component
     */
    return (
        <div>
            <h2>Create New Project</h2>
            <form onSubmit={saveProject}>
                <div className={'control'}>
                    <label className={'project-name'}>
                        Project Name
                    </label>
                    <input type={'text'} value={projectName} onChange={handleProjectNameChange}/>
                </div>
                <div className={'control'}>
                    <label className={'end-point'}>
                        End Point
                    </label>
                    <input type={'text'} value={endPoint} onChange={handleEndPointChange}/>
                </div>
                <input type={'submit'} value={'Save'}/>
                <button type={'button'} onClick={closeModal}>Cancel</button>
            </form>
            <h3>
                <Link to={"/queryBuilder"}>Go to Step 3</Link>
            </h3>
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
