import gql from 'graphql-tag';

export const CreateWireFrameMutation = gql`    
    mutation createWireFrame($input: CreateWireFrameInput!) {
      createWireFrame(input: $input) {
        query_id
        file {
          bucket
          key
          region
        }
      }
    }
`;