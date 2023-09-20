import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
  "https://6lgkzgvreraa3cllhxxzhszk3i.appsync-api.ap-northeast-1.amazonaws.com/graphql",
  {
    headers: {
      "x-api-key": "da2-5wcacsduofc6fe52ixntje62oq",
    },
    errorPolicy: "ignore",
  }
);

export default client;
