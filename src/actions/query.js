export const SAVE_ANNOTATED_QUERY = 'SAVE_ANNOTATED_QUERY';

export const saveAnnotatedQuery = (query) => ({
    type: SAVE_ANNOTATED_QUERY,
    payload: query
})
