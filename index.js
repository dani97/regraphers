import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {ApolloProvider} from 'react-apollo';
import {Rehydrated} from 'aws-appsync-react';
import App from './src/containers/App';
import {AwsClient} from "./src/AwsClient";

ReactDOM.render(
    <ApolloProvider client={AwsClient}>
        <Rehydrated>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Rehydrated>
    </ApolloProvider>,
    document.getElementById('app'));