import { InMemoryCache } from '@apollo/client';
import { toggleProductStatus } from './toggleProductStatus';

export const cacheForLocalState: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        local: {
          read() {
            return toggleProductStatus();
          },
        },
      },
    },
  },
});
