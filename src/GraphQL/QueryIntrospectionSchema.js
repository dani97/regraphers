import gql from 'graphql-tag';

const QueryIntrospectionSchema = gql`
    query getIntrospectionSchema {
        getIntrospectionSchema(endPoint: "https://release-dev-231-npzdaky-zddsyhrdimyra.us-4.magentosite.cloud/graphql") 
    }
`;

export default  QueryIntrospectionSchema;