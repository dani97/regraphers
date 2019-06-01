import awsExports from './AwsExports';
import AWSAppSyncClient from 'aws-appsync';
import {Auth} from 'aws-amplify';
import 'babel-polyfill';

const AwsClient = new AWSAppSyncClient({
    url: awsExports.aws_appsync_graphqlEndpoint,
    region: awsExports.aws_appsync_region,
    auth: {
        type: awsExports.aws_appsync_authenticationType,
        jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
    },
    disableOffline: true,
    complexObjectsCredentials: () => Auth.currentCredentials()
});

export default AwsClient;