import { createStore, combineReducers } from "redux";
import reducers from './Reducers/reducers';

const reducer = combineReducers({
    project: reducers
})

export default createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);