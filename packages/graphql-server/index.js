import { ApolloServer, gql } from  'apollo-server';

import typeDefs from './schema/index';
import resolvers from './resolvers/index';
const server = new ApolloServer({ 
    typeDefs, 
    resolvers ,
    playground: {
      endpoint: `http://localhost:4000/`,
      settings: {
            'editor.theme': 'dark'
        }
    }
  });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});