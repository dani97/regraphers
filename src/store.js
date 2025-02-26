import { createStore, applyMiddleware, combineReducers , compose} from "redux";
import thunk from 'redux-thunk';
import { project } from './reducers/project';
import { message} from "./reducers/message";
import { queryType } from "./reducers/queryType";
import {loader} from "./reducers/loader";
import { wireFrame } from "./reducers/wireFrame";

const reducers = combineReducers({
    project: project,
    messages: message,
    queryType: queryType,
    loaderVisibility: loader,
    wireFrame: wireFrame
})

/**
 * ERROR : 'It looks like you are passing several store enhancers to createStore()',
 * when applyMiddleware and redux dev tools are given separately, so always compose
 * whatever needs to be added on to the store
 */
export default createStore(
    reducers,
    compose(
        applyMiddleware(thunk)
    )
);
