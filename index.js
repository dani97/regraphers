import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Client from 'aws-appsync';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';
import AwsExports from './src/AwsExports';
import App from './src/Components/App';

const client = new Client({
    url: AwsExports.aws_appsync_graphqlEndpoint,
    region: AwsExports.aws_appsync_region,
    auth: {
        type: AwsExports.aws_appsync_authenticationType,
        apiKey: AwsExports.aws_appsync_apiKey
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Rehydrated>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Rehydrated>
    </ApolloProvider>,
    document.getElementById('app'));