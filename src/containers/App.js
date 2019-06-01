import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateProject from '../components/CreateProject';
import ProjectGrid from "../components/ProjectGrid";
import ExploreGrid from "../components/ExploreGrid";
import QueryBuilder from "../components/QueryBuilder";
import QueryGrid from "../components/QueryGrid";
import Page from '../components/Page';
import WireFrame from '../components/WireFrame';
import { Provider } from 'react-redux';
import store from '../store';
import LoaderComponent from './../components/LoaderComponent';
import Logo from './../../images/graphql.png';

const App = (props) => {
    return (
        
        <div>
            <a href={"/"}><img className={"logo"} src={Logo}/></a>
            <Provider store={store}>
            <LoaderComponent/>
                <Switch>
                    <Route exact path={"/"} component={ProjectGrid} />
                    <Route path={"/projects"} component={ProjectGrid} />
                    <Route exact path={"/explore"} render={(props) => <ExploreGrid routerProps={props}/>} />
                    <Route exact path={"/queryBuilder"} render={(props) => <QueryBuilder routerProps={props}/>} />
                    <Route exact path={"/queries"} render={(props) => <QueryGrid routerProps={props} />} />
                    <Route exact path={"/page"} component={Page} />
                    <Route exact path={"/wireFrame"} render={() => <WireFrame />} />
                </Switch>
            </Provider>
        </div>
    )
}

export default App;