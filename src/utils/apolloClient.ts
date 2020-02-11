// https://frustrated.blog/2019/07/18/sapper-graphql-subscriptions.html

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

export const createApolloClient = (initialState = {}) => {
  const cache = new InMemoryCache({
    // dataIdFromObject: object => object.__typename || "" + object.id // anoop make sure __typename is present
  });
  const httpLink = new HttpLink({
    uri: "https://anoopm.staging.anarock.com:3010/graphql", // `${process.env.LEAD_URL}/graphql`,
    credentials: "include"
  });
  const client = new ApolloClient({
    cache: cache.restore(initialState),
    link: httpLink
  });
  return client;
};
