export * from "./mutations";
export * from "./queries";

import { ApolloClient, InMemoryCache } from "@apollo/client";

// const endpoint =
//   "wss://dropmail.me/api/graphql/web-test-20230608KBE1x/websocket";

export const client = new ApolloClient({
  // link: new WebSocketLink(
  //   new SubscriptionClient(endpoint, { reconnect: true })
  // ),
  uri: "https://dropmail.me/api/graphql/web-test-20230608KBE1x",
  cache: new InMemoryCache(),
});
