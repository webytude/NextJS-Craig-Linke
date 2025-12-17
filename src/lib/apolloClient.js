import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const uri = process.env.NEXT_PUBLIC_GRAPHQL_URI;
const token = process.env.NEXT_PUBLIC_GRAPHQL_AUTH_TOKEN;

const client = new ApolloClient({
    link: new HttpLink({
        uri,
        headers: {
            Authorization: `Bearer ${token}`
        },
    }),
});

export default client;
