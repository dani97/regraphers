import gql from 'graphql-tag';

export const ListEndPointOperations = gql`
    query endPointOperations($filter: TableEndPointOperationFilterInput) {
        listEndPointOperations(filter: $filter) {
            items {
                id
                endpoint
                description
                query_string
                graphql_query
                page
                name
                
            }
        }
    }
`;