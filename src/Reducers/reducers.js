/**
 * Each project has {
 *     id, name, endpoint
 * }
 * @type {{current: *, projects: Array}}
 */
const initState = {
    projects: [],
    projectName: '',
    endPoint: ''
}

const UPDATE_PROJECT_NAME = 'UPDATE_PROJECT_NAME',
      UPDATE_ENDPOINT = 'UPDATE_ENDPOINT',
      CREATE_PROJECT = 'CREATE_PROJECT';

export const updateProjectName = (data) => ({
    type: UPDATE_PROJECT_NAME,
    payload: data
});

export const updateEndPoint = (data) => ({
    type: UPDATE_ENDPOINT,
    payload: data
});

export const createProject = (data) => ({
    type: CREATE_PROJECT,
    payload: data
})

const reducers = (state = initState, action) => {
    switch (action.type) {
        case CREATE_PROJECT:
            return {
                ...state,
                projects: state.projects.concat(action.payload)
            }
        case UPDATE_PROJECT_NAME:
            return {
                ...state,
                projectName: action.payload
            }
        case UPDATE_ENDPOINT:
            return {
                ...state,
                endPoint: action.payload
            }
        default:
            return state;
    }
}

export default reducers;