import { getIntrospectionSchema } from "../services/project";

export const CREATE_PROJECT = 'CREATE_PROJECT';

export const saveProject = (project) => {
    /**
     * Dispatches createProject action creator if the endPoint
     * provided is valid
     */
    return(dispatch) => {
        getIntrospectionSchema()
            .then(schema => dispatch(createProject(project, schema)),
                  error => {
                    console.log('this is error ', error);
                  });
    }
};

export const createProject = (project, schema) => ({
    type: CREATE_PROJECT,
    payload: {
        ...project,
        schema
    }
});
