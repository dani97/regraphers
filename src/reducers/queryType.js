import { SAVE_QUERY_TYPE } from '../actions/queryType';

export const queryType = (queryType = '', action) => {
    switch(action.type) {
        case SAVE_QUERY_TYPE:
            return action.payload;
        default:
            return queryType;
    }
}
