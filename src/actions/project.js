import { getIntrospectionSchema } from "../services/project";

export const CREATE_PROJECT = 'CREATE_PROJECT';

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
                        routerProps.history.push('/queryBuilder');
                    }
                },
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
