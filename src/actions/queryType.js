export const SAVE_QUERY_TYPE =  'SAVE_QUERY_TYPE';

export const saveQueryType = (queryType) => ({
    type: SAVE_QUERY_TYPE,
    payload: queryType
});
