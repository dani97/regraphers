import gql from 'graphql-tag';

const updateAnnotationsListMutation = gql`
    mutation updateAnnotationsList($input: UpdateAnnotationsInput!) {
        id
        query_id
        annotationsList
    }
`;

export default updateAnnotationsListMutation;