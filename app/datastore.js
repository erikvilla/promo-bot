// eslint-disable-next-line import/no-unresolved, import/extensions
import Storage from '@google-cloud/datastore';
// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
export default Storage({ keyFileName: '../credentials.json' });
