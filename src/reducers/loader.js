import {SHOW_LOADER} from "../actions/loader";
import {CREATE_PROJECT} from "../actions/project";

export const loader = (loaderVisibility = false, action) => {
    console.log('loaderVisibility is ', loaderVisibility);
    switch(action.type) {
        case SHOW_LOADER:
            return action.payload;
        case CREATE_PROJECT:
            return false;
        default:
            return loaderVisibility;
    }
}
