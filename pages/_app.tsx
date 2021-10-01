import 'tailwindcss/tailwind.css';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../utils/useApollo';
import { useAuth } from '../utils/useAuth';

export default function App({ Component, pageProps }) {
  const { token } = useAuth();
  const apolloClient = useApollo(token);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
