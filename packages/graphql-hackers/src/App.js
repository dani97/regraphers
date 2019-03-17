import React, {useState, useEffect} from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";
import gql from 'graphql-tag';
import { buildClientSchema } from 'graphql';
import 'regenerator-runtime/runtime';
import { DocExplorer } from './DocExplorer';
import './app.css';

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const introspectionQuery = gql`
query introspection {
    introspection {
      result {
        queryResult
      }
    }
}`;

const App = () => {
    let [schema, setSchema] = useState();

   

    useEffect(() => {
        async function getSchema() {
            return await client.query({query: introspectionQuery});
        }
        getSchema().then((result) => {
            setSchema(buildClientSchema(JSON.parse(result.data.introspection.result.queryResult)));
        })
    },[]);
    
    return (
        <ApolloProvider client = {client}>
            <p>This is Graphql hackers</p>
            <DocExplorer schema = {schema}> </DocExplorer>
        </ApolloProvider>
    );
}

export default App;