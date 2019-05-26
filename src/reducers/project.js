import { CREATE_PROJECT } from "../actions/project";

const initState = {
    projects: [],
    projectName: '',
    endPoint: '',
    schema: ''
}

export const project = (state = initState, action) => {
    console.log('action is ', action);
    switch (action.type) {
        case CREATE_PROJECT:
            return {
                projects: state.projects.concat(action.payload),
                projectName: action.payload.projectName,
                endPoint: action.payload.endPoint,
                schema: action.payload.schema
            }
        default:
            return state;
    }
}