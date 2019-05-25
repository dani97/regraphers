import React from 'react';
import { connect } from "react-redux";
import { updateProjectName, updateEndPoint, createProject } from "../Reducers/reducers";
import { bindActionCreators } from "redux";

const CreateProject = (props) => {
    /**
     * By default in RouterV4, there are certain props that all routes can
     * access inside a Router Component, match, location, history, staticContext
     */
    console.log('props are ',props);
    const handleProjectNameChange = (event) => {
        console.log('project name :', event.target.value);
        props.updateProjectName(event.target.value);
    }

    const handleEndPointChange = (event) => {
        console.log('end point :', event.target.value);
        props.updateEndPoint(event.target.value);
    }

    const createProject = (event) => {
        console.log('event :', event);
        event.preventDefault();

        props.createProject({
            id: new Date().getTime(),
            projectName: props.projectName,
            endPoint: props.endPoint
        });

    }
    console.log('in create project');
    return (
        <div>
            <h2>Create New Project</h2>
            <form onSubmit={createProject}>
                <div className={'control'}>
                    <label className={'project-name'}>
                        Project Name
                    </label>
                    <input type={'text'} value={props.projectName} onChange={handleProjectNameChange}/>
                </div>
                <div className={'control'}>
                    <label className={'end-point'}>
                        End Point
                    </label>
                    <input type={'text'} value={props.endPoint} onChange={handleEndPointChange}/>
                </div>
                <input type={'submit'} value={"Create"}/>
            </form>
        </div>
    )
}

/*const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => bindActionCreators({updateProject}, dispatch);
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(CreateProject);
export default ConnectedApp;*/

export default connect(
    (state) => ({
        projectName: state.project.projectName,
        endPoint: state.project.endPoint
    }),
    {updateProjectName, updateEndPoint, createProject}
)(CreateProject);
