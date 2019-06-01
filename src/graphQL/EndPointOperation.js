import gql from 'graphql-tag';

export const CreateEndPointOperation = gql`    
    mutation operationCreate($input : CreateEndPointOperationInput!) {
        createEndPointOperation(input: $input) {
            endpoint
            query_string
            graphql_query
            page
            name
            description
        }
    }
`;