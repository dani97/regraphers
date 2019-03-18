import { GraphQLDataSource } from 'apollo-datasource-graphql';
import introspectionQuery from '../introspectionQuery';
import { gql } from 'apollo-server';

class QueryGraphQLAPI extends GraphQLDataSource {
  constructor() {
        super();
  	this.baseURL = "https://release-dev-rxvv2iq-zddsyhrdimyra.us-4.magentosite.cloud/graphql";
  }
 
  async getGraphqlQuery(graphqlQuery) {
    try {
      const response = await this.query(gql `${graphqlQuery}`);
      return JSON.stringify(response.data);
    } catch (error) {
      console.error("logging error",error);
    }
  }
}

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const graphqlApi = new QueryGraphQLAPI();
const resolvers = {
    Query: {
        introspection: async () => {
          try {
            const result = await graphqlApi.getGraphqlQuery(introspectionQuery);
            return {result: {queryResult: result}};
        }
        catch(error) {
            console.log("error resolving", error);
        }
      }
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

export default resolvers;
