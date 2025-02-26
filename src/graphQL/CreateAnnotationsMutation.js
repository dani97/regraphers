import gql from 'graphql-tag';

export const CreateAnnotationsMutation = gql`    
    mutation createAnnotations($input: CreateAnnotationsInput!) {
      createAnnotations(input: $input) {
       id
       queryID
       annotationList
      }
    }
`;
