// https://frustrated.blog/2019/07/18/sapper-graphql-subscriptions.html

import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

export const createApolloClient = (
  initialState = {}
): ApolloClient<NormalizedCacheObject> => {
  const cache = new InMemoryCache({
    // dataIdFromObject: object => object.__typename || "" + object.id // make sure __typename is present
  });
  const httpLink = new HttpLink({
    uri: "https://countries.trevorblades.com/graphql"
    // credentials: "include"
  });
  const client = new ApolloClient({
    cache: cache.restore(initialState),
    link: httpLink
  });
  return client;
};
