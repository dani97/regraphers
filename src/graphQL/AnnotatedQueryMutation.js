import gql from 'graphql-tag';

export const AnnotatedQueryMutation = gql`    
    mutation createAnnotatedQueries($input: CreateAnnotatedQueriesInput!) {
        createAnnotatedQueries(input: $input) {
            id
            query_id
            image_url
            annotation
        }                  
    }`;