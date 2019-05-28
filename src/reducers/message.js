import { SHOW_MESSAGE } from "../actions/message";
import { CREATE_PROJECT } from "../actions/project";

export const message = (messages = [], action) => {
    console.log('state is ', messages);
    switch(action.type) {
        case SHOW_MESSAGE:
            return [action.payload];
        case CREATE_PROJECT:
            return [];
        default:
            return messages;
    }
}
