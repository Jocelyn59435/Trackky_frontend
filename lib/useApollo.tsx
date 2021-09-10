import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import useAuth from './useAuth';

const httpLink = new HttpLink({
  uri: 'https://trackkybackend.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  //get the authentication token from cookies
  const userToken = useAuth();
  //return headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: userToken ? `Bearer ${userToken}` : '',
    },
  };
});

export const useApollo = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  ssrMode: typeof window === 'undefined',
});
