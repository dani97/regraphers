import { gql } from  'apollo-server';

const typeDefs = gql`
    # Comments in GraphQL are defined with the hash (#) symbol.

    # This "Book" type can be used in other type declarations.

    type QueryResult {
        queryResult: String
    }

    type GraphqlQuery {
        query: String
    }

    type Introspection {
        result: QueryResult
    }

    # (A "Mutation" type will be covered later on.)
    type Query {
        introspection: Introspection
    }

    type Mutation {
        queryData(query : String!): QueryResult
    }
`;

export default typeDefs;