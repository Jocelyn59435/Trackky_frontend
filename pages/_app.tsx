import 'tailwindcss/tailwind.css';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/useApollo';
import { useAuth } from '../lib/useAuth';

export default function App({ Component, pageProps }) {
  const { token } = useAuth();
  const apolloClient = useApollo(token);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
