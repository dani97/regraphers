import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {ApolloProvider} from 'react-apollo';
import {Rehydrated} from 'aws-appsync-react';
import App from './src/containers/App';


ReactDOM.render(<App/>, document.getElementById('app'));