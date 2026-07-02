import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const uri = process.env.NEXT_PUBLIC_GRAPHQL_URI;
const token = process.env.GRAPHQL_AUTH_TOKEN;

const client = new ApolloClient({
    link: new HttpLink({
        uri,
        headers: {
            Authorization: `Bearer ${token}`
        },
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            fetchPolicy: "cache-first",
            errorPolicy: "all",
        },
        watchQuery: {
            fetchPolicy: "cache-first",
            errorPolicy: "all",
        },
    },
});

export default client;
