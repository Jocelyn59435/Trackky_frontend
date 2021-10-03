import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { cacheForLocalState } from './cacheForLocalState';

export const useApollo = (token: string | undefined) =>
  new ApolloClient({
    cache: cacheForLocalState,
    // link: authLink.concat(httpLink),
    link: new HttpLink({
      // uri: 'https://trackkybackend.herokuapp.com/graphql',
      uri: 'http://localhost:4000/graphql',
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    }),
    ssrMode: typeof window === 'undefined',
  });
