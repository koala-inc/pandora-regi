import { gql } from "graphql-request";

export { createCategory, deleteCategory };

const createCategory = gql`
  mutation ($name: String!, $parent_id: Int, $store_code: Int!) {
    createCategory(
      input: { name: $name, parent_id: $parent_id, store_code: $store_code }
    ) {
      category {
        category_revision {
          id
          item_category_id
          name
          parent_id
        }
      }
    }
  }
`;

const deleteCategory = gql`
  mutation ($store_code: Int!, $id: Int!) {
    deleteCategory(input: { store_code: $store_code, id: $id }) {
      category {
        category_revision {
          id
          item_category_id
          name
          parent_id
        }
      }
    }
  }
`;
