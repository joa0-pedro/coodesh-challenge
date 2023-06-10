import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Index } from "./pages";
import { client } from "./graphql";
import { customTheme } from "./styles/theme";

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={customTheme}>
        <Index />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
