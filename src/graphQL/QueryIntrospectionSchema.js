import gql from 'graphql-tag';

const QueryIntrospectionSchema = gql`
    query introspectionSchema($endPoint: String!) {
        getIntrospectionSchema(endPoint: $endPoint) 
    }
`;

export default  QueryIntrospectionSchema;