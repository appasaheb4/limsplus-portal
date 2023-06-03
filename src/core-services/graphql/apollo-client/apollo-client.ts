/* eslint-disable folders/match-regex */
/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable no-console */
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  from,
} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {stores} from '@/stores';
import {setContext} from '@apollo/client/link/context';
import {createUploadLink} from 'apollo-upload-client';

const customFetch = async (uri, options): Promise<any> => {
  try {
    if (!stores.loading) stores.setLoading(true);
    const response = await fetch(uri, options).then(response => {
      if (response.status >= 500) {
        return Promise.reject(response.status);
      }
      // if (response)
      //   setTimeout(() => {
      //     stores.setLoading(false);
      //   }, 1000);
      stores.setLoading(false);
      return response;
    });
    return response;
  } catch (error) {
    stores.setLoading(false);
    return await Promise.reject(error);
  }
};

const getBaseUrl = env => {
  switch (env) {
    case 'Production':
      return process.env.REACT_APP_API_HOST_PORD;
    case 'Development':
      return process.env.REACT_APP_API_HOST_DEV;
    default:
      return process.env.REACT_APP_API_HOST_LOCAL;
  }
};

const authLink = setContext(async (_, {headers}) => {
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  };
});

const UploadLink = createUploadLink({
  uri: getBaseUrl(process.env.REACT_APP_ENV),
  fetch: customFetch,
});

const UploadLinkLocal = createUploadLink({
  uri: process.env.REACT_APP_API_HOST_LOCAL,
  fetch: customFetch,
});

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({message, locations, path, extensions}) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
      if (extensions && extensions.validation) {
        const firstMessageKey = Object.keys(extensions.validation)[0];
        if (firstMessageKey) {
          alert(extensions.validation[firstMessageKey][0]);
        }
      } else {
        alert('Something went wrong! Please try again.');
      }
    });
  }
  if (networkError) {
    stores.setLoading(false);
    console.log(`[Network error]: ${networkError}`);
  }
});

export const client = new ApolloClient({
  link: authLink.concat(from([errorLink, UploadLink])),
  cache: new InMemoryCache(),
});

export const clientLocal = new ApolloClient({
  link: authLink.concat(from([errorLink, UploadLinkLocal])),
  cache: new InMemoryCache(),
});

export {ApolloProvider};
