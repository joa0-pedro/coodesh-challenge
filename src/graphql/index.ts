export * from "./mutations";
export * from "./queries";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://dropmailproxy.onrender.com/graphql/web-test-20230608KBE1x",
  }),
  cache: new InMemoryCache(),
});
