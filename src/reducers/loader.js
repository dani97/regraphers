import {SHOW_LOADER} from "../actions/loader";

export const loader = (loaderVisibility = false, action) => {
    console.log('loaderVisibility is ', loaderVisibility);
    switch(action.type) {
        case SHOW_LOADER:
            return action.payload;
        default:
            return loaderVisibility;
    }
}
