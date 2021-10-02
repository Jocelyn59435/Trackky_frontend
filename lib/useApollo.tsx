import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const useApollo = (token: string | undefined) =>
  new ApolloClient({
    cache: new InMemoryCache(),
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
