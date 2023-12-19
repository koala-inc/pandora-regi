import { gql } from "graphql-request";

export { searchCategory };

const searchCategory = gql`
  query ($store_code: [Int]!, $id: [Int]) {
    category(store_code: $store_code, id: $id) {
      store_category {
        category {
          category_revision {
            parent_id
            name
            item_category_id
          }
          id
        }
      }
    }
  }
`;
