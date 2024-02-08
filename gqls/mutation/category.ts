import { gql } from "graphql-request";

export { createCategory, deleteCategory, updateCategory };

const createCategory = gql`
  mutation ($name: String!, $parent_id: Int, $store_code: Int!) {
    createCategory(
      input: { name: $name, parent_id: $parent_id, store_code: $store_code }
    ) {
      __typename
    }
  }
`;

const updateCategory = gql`
  mutation ($name: String!, $id: Int!, $store_code: Int!) {
    updateCategory(input: { name: $name, id: $id, store_code: $store_code }) {
      __typename
    }
  }
`;

const deleteCategory = gql`
  mutation ($store_code: Int!, $is_parent: Int, $id: Int!) {
    deleteCategory(
      input: { store_code: $store_code, is_parent: $is_parent, id: $id }
    ) {
      __typename
    }
  }
`;
