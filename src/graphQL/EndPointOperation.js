import gql from 'graphql-tag';

export const CreateEndPointOperation = gql`    
    mutation operationCreate($input : CreateEndPointOperationInput!) {
        createEndPointOperation(input: $input) {
            query_string
            page
            name
            description
        }
    }
`;