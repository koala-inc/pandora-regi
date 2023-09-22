import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_URL || "", {
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY || "",
  },
  errorPolicy: "ignore",
});

export default client;
