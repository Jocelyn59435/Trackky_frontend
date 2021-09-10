import 'tailwindcss/tailwind.css';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/useApollo';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo;

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
