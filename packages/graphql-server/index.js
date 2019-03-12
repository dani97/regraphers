const { ApolloServer, gql } = require('apollo-server');
import { GraphQLDataSource } from 'apollo-datasource-graphql';

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const users = [
  {
    name: 'Chris Daniel',
    age: 21
  }
];

class QueryGraphQLAPI extends GraphQLDataSource {
  baseURL = 'https://release-dev-rxvv2iq-zddsyhrdimyra.us-4.magentosite.cloud/graphql';
 
  async getGraphqlQuery(graphqlQuery) {
    try {
      const response = await this.query(gql `${graphqlQuery}`);
      return JSON.stringify(response.data);
    } catch (error) {
      console.error("logging error",error);
    }
  }
}



// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  type User {
    name: String
    age: Int
  }

  type QueryResult {
    queryResult: String
  }

  type GraphqlQuery {
    query: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
    users: [User]
    queryResult: QueryResult
  }

  type Mutation {
   queryData(query : String!): QueryResult
  }
`;

function makeQuery(query) {
  return query;
}

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const graphqlApi = new QueryGraphQLAPI();
const resolvers = {
  Query: {
    books: () => books,
    users: () => users

  },

  Mutation: {
    queryData: async (parent, { query }) => {
      try {
        const result = await graphqlApi.getGraphqlQuery(query);
        return {queryResult: result};
      }
      catch(error) {
        console.log("error resolving", error);
      }
      
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});