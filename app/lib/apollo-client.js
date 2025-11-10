import { ApolloClient, InMemoryCache } from "@apollo/client";

const URL = process.env.NEXT_PUBLIC_GRAPHQL_URI;
const TOKEN = process.env.NEXT_PUBLIC_GRAPHQL_AUTH_TOKEN;

const client = new ApolloClient({
  link: new HttpLink({
        URL,
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    }),
  cache: new InMemoryCache(),
});

export default client;
