import { ApolloServer, gql } from  'apollo-server-lambda';

import typeDefs from '../../schema/index';
import resolvers from '../../resolvers/index';
const server = new ApolloServer({ 
    typeDefs, 
    resolvers ,
    playground: {
      endpoint: `http://localhost:9000/`,
      settings: {
            'editor.theme': 'dark'
        }
    }
  });

exports.handler = server.createHandler();