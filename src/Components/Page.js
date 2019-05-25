import React from 'react';
import QueryIntrospectionSchema from '../GraphQL/QueryIntrospectionSchema';
import {graphql, compose} from "react-apollo";

const App = (props) => {
    console.log('PAGE RENDERING', props);
    return (<div>
        <h3>Awsappsync is great and cool</h3>
        <code>{props.introspectionQuery}</code>
    </div>);
}

export default compose(
    graphql(QueryIntrospectionSchema, {
        options: {
            fetchPolicy: "cache-and-network"
        },
        props: props => ({
            introspectionQuery: (props.data.getIntrospectionSchema) ? props.data.getIntrospectionSchema : 'No introspection query for the endpoint'
        })
    })
)(App);