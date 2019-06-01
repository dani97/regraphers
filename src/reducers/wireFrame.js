import { CREATE_WIRE_FRAME } from "../actions/wireFrame";

export const wireFrame = (wireFrame = {
    query: {},
    image_url: null
}, action) => {

    switch(action.type) {
        case CREATE_WIRE_FRAME:
            return action.payload;
        default:
            return wireFrame;
    }

}