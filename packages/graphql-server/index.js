import express from 'express';
import { ApolloServer } from 'apollo-server-express';

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

const app = express();
server.applyMiddleware({app});

// Initiate the server
app.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});