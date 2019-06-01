import {SAVE_ANNOTATED_QUERY } from "../actions/query";

export const query = (query = {}, action) => {
    switch(action.type) {
        case SAVE_ANNOTATED_QUERY:
            return action.payload;
        default:
            return query;
    }
}