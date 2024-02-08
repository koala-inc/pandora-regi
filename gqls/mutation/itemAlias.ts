import { gql } from "graphql-request";

export { createItemAlias };

const createItemAlias = gql`
  mutation ($store_code: Int!, $item_id: Int!, $alias_name: String!) {
    createItemAlias(
      input: {
        store_code: $store_code
        item_id: $item_id
        alias_name: $alias_name
      }
    ) {
      __typename
    }
  }
`;
