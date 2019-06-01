import gql from 'graphql-tag';

export const CreateWireFrameMutation = gql`    
    mutation createWireFrame($input: CreateWireFrameInput!) {
      createWireFrame(input: $input) {
        id
        query_id
        file {
          bucket
          key
          region
        }
      }
    }
`;