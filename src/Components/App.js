import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateProject from './CreateProject';
import ProjectGrid from "./ProjectGrid";
import { updateProject } from "../Reducers/reducers";
import { bindActionCreators } from "redux";
import { Provider } from 'react-redux';
import store from '../store';

// const setProjectName = (projectName) => store.dispatch(updateProject({name: projectName}));
//
// const setEndPoint = (endPoint) => store.dispatch(updateProject({endpoint: endPoint}));

// const actions = bindActionCreators({updateProject}, store.dispatch);
/*const render = () => {
    const state = store.getState();
    console.log('state in render ', state);
    return (
        <Switch>
            <Route path={"/projects"} render={() => <ProjectGrid {...state} />} />
            <Route exact path={"/create"} component={() => <CreateProject {...state} setProjectName={actions.updateProject} setEndPoint={actions.updateProject}/>} />
        </Switch>
    )
}
const App = () => render();

store.subscribe(render);*/

const App = () => {
    console.log('store :', store.getState());
    return (

        <Provider store={store}>
            <Switch>
                <Route exact path={"/"} component={ProjectGrid} />
                <Route path={"/projects"} component={ProjectGrid} />
                <Route exact path={"/create"} component={() => <CreateProject/>} />
                {/*<Route exact path={"/create"} component={() => <CreateProject setProjectName={actions.updateProject} setEndPoint={actions.updateProject}/>} />*/}
            </Switch>
        </Provider>
    )
}


export default App;