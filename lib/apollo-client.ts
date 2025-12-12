import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { SERVER_URL, WEBSOCKET_URL } from "./constants/env";
import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { Kind, OperationTypeNode } from "graphql";

const httpLink = createUploadLink({
  uri: SERVER_URL,
  credentials: "include",
  headers: {
    "apollo-require-preflight": "true",
  },
});

const wsLink = new WebSocketLink({
  uri: WEBSOCKET_URL,
  options: {
    reconnect: true,
  },
});

const splitLink = split(({ query }) => {
  const definition = getMainDefinition(query);

  return (
    definition.kind === Kind.OPERATION_DEFINITION &&
    definition.operation === OperationTypeNode.SUBSCRIPTION
  );
}, wsLink, httpLink);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
