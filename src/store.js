import { createStore, applyMiddleware, combineReducers , compose} from "redux";
import thunk from 'redux-thunk';
import { project } from './reducers/project';

const reducers = combineReducers({
    project: project
})

/**
 * ERROR : 'It looks like you are passing several store enhancers to createStore()',
 * when applyMiddleware and redux dev tools are given separately, so always compose
 * whatever needs to be added on to the store
 */
export default createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);