import AWSAppSyncClient from "aws-appsync";
import AwsExports from "./AwsExports";

export const AwsClient = new AWSAppSyncClient({
    url: AwsExports.aws_appsync_graphqlEndpoint,
    region: AwsExports.aws_appsync_region,
    auth: {
        type: AwsExports.aws_appsync_authenticationType,
        apiKey: AwsExports.aws_appsync_apiKey
    }
});