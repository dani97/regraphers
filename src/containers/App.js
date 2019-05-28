import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateProject from '../components/CreateProject';
import ProjectGrid from "../components/ProjectGrid";
import QueryBuilder from "../components/QueryBuilder";
import Page from '../components/Page';
import { Provider } from 'react-redux';
import store from '../store';

const App = () => {
    return (
        <Provider store={store}>
            <Switch>
                <Route exact path={"/"} component={ProjectGrid} />
                <Route path={"/projects"} component={ProjectGrid} />
                <Route exact path={"/queryBuilder"} render={() => <QueryBuilder/>} />
                <Route exact path={"/page"} component={Page} />
            </Switch>
        </Provider>
    )
}

export default App;