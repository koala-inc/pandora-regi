import { gql } from "graphql-request";

export { searchItemAlias };

const searchItemAlias = gql`
  query (
    $store_code: [Int]!
    $alias_name: String
    $id: [Int]
    $item_id: [Int]
  ) {
    itemAlias(
      store_code: $store_code
      alias_name: $alias_name
      id: $id
      item_id: $item_id
    ) {
      store_item_alias {
        item_alias {
          alias_name
          id
          item_id
        }
      }
    }
  }
`;
