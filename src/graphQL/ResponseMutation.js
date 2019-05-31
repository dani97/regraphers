import gql from 'graphql-tag';

const ResponseMutation = gql`    
    mutation graphqlOperation(
                            $endPoint: String!
                            $query: String!
                            $operation: String
                            $variables: String) 
    {
        executeGraphqlOperation(
                            endPoint: $endPoint
                            query: $query
                            operation: $operation
                            variables: $variables) 
    }`;

export default ResponseMutation;