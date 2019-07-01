import gql from 'graphql-tag';

const listWireFramesQuery = gql`
    query($queryId: String) {
        listWireFrames(
            filter: {
                query_id: {
                    eq : $queryId
                }
            }
        ) {
            items {
                file {
                    bucket
                    key
                    region
                }
            }
        }
    }
`;

export default listWireFramesQuery;