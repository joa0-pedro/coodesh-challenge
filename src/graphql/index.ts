export * from "./mutations";
export * from "./queries";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// const endpoint =
//   "wss://dropmail.me/api/graphql/web-test-20230608KBE1x/websocket";

export const client = new ApolloClient({
  // link: new WebSocketLink(
  //   new SubscriptionClient(endpoint, { reconnect: true })
  // ),

  link: new HttpLink({
    uri: "https://dropmail.me/api/graphql/web-test-20230608KBE1x",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    fetch,
  }),

  // uri: "https://dropmail.me/api/graphql/web-test-20230608KBE1x",
  cache: new InMemoryCache(),
});
