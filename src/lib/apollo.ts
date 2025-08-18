import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { nhost } from "../utils/nhost";

// Ensure environment variable is defined
const nhostSubdomain = import.meta.env.VITE_REACT_APP_NHOST_SUBDOMAIN;
if (!nhostSubdomain) {
    throw new Error(
        "VITE_REACT_APP_NHOST_SUBDOMAIN environment variable is not defined"
    );
}

const httpLink = createHttpLink({
    uri: `https://${nhostSubdomain}.hasura.ap-south-1.nhost.run/v1/graphql`,
});

const wsLink = new GraphQLWsLink(
    createClient({
        url: `wss://${nhostSubdomain}.hasura.ap-south-1.nhost.run/v1/graphql`,
        connectionParams: async () => {
            const token = await nhost.auth.getAccessToken();
            if (!token) {
                console.warn(
                    "No access token available, retrying authentication..."
                );
                // Optionally trigger re-authentication here if supported by Nhost
            }
            return {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            };
        },
        retryAttempts: 5,
        shouldRetry: () => true,
        keepAlive: 10_000,
    })
);

const authLink = setContext(async (_, { headers }) => {
    const token = await nhost.auth.getAccessToken();
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    authLink.concat(httpLink)
);

export const apolloClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
        // Optional: Configure cache policies if needed
        typePolicies: {
            // Example: Add type policies for specific types if required
        },
    }),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "cache-and-network",
            errorPolicy: "all",
        },
        query: {
            fetchPolicy: "network-only",
            errorPolicy: "all",
        },
        mutate: {
            errorPolicy: "all",
        },
    },
});
