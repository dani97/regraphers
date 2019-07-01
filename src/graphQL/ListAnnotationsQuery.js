import gql from 'graphql-tag';

const listAnnotationsQuery = gql`
    query($queryId: String) {
        listAnnotations(filter: {
            query_id: {
                eq : $queryId
            }
        }) {
            items {
                id
                annotationsList
            }
        }
    }
`;

export default listAnnotationsQuery;