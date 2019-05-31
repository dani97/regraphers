import { getIntrospectionSchema } from "../services/project";
import { ERROR_TYPE, getMessage } from "../services/message";
import { showMessage } from "./message";

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const ENDPOINT_ERROR_MESSAGE = 'Invalid endpoint';
export const SAVE_QUERY_TYPE = 'SAVE_QUERY_TYPE';

export const saveProject = (project, routerProps) => {
    /**
     * Dispatches createProject action creator if the endPoint
     * provided is valid
     */
    return(dispatch) => {
        getIntrospectionSchema(project.endPoint)
            .then(schema => {
                    dispatch(createProject(project, schema));
                    if(routerProps && routerProps.history) {
                        console.log('history exister');
                        routerProps.history.push('/explore');
                    }
                },
                  error => {
                    console.log('this is error ', error);
                    dispatch(showMessage(getMessage(ENDPOINT_ERROR_MESSAGE, ERROR_TYPE)));
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