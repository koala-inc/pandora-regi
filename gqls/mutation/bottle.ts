import { gql } from "graphql-request";

export { createBottle, updateBottle, deleteBottle };

const createBottle = gql`
  mutation (
    $store_code: Int!
    $item_category_id: Int
    $name: String!
    $price: Int
    $cost: Int
    $default_stock: Int
    $display: Int
    $point: Int
    $is_notice_kitchen: Int
    $item_code: Int
    $keep_expiration_day: Int
  ) {
    createBottle(
      input: {
        store_code: $store_code
        item_category_id: $item_category_id
        name: $name
        price: $price
        cost: $cost
        default_stock: $default_stock
        display: $display
        point: $point
        is_notice_kitchen: $is_notice_kitchen
        item_code: $item_code
        keep_expiration_day: $keep_expiration_day
      }
    ) {
      __typename
    }
  }
`;

const deleteBottle = gql`
  mutation ($store_code: Int!, $id: Int!) {
    deleteBottle(input: { store_code: $store_code, id: $id }) {
      __typename
    }
  }
`;

const updateBottle = gql`
  mutation (
    $store_code: Int!
    $id: Int!
    $item_code: Int
    $item_category_id: Int
    $name: String
    $price: Int
    $cost: Int
    $default_stock: Int
    $display: Int
    $is_notice_kitchen: Int
    $point: Int
    $keep_expiration_day: Int
  ) {
    updateBottle(
      input: {
        store_code: $store_code
        id: $id
        item_code: $item_code
        item_category_id: $item_category_id
        name: $name
        price: $price
        cost: $cost
        default_stock: $default_stock
        display: $display
        is_notice_kitchen: $is_notice_kitchen
        point: $point
        keep_expiration_day: $keep_expiration_day
      }
    ) {
      bottle {
        __typename
      }
    }
  }
`;
