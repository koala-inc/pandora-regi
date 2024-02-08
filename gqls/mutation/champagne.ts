import { gql } from "graphql-request";

export { createChampagne, updateChampagne };

const createChampagne = gql`
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
  ) {
    createChampagne(
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
      }
    ) {
      __typename
    }
  }
`;

const updateChampagne: string = gql`
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
  ) {
    updateChampagne(
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
      }
    ) {
      __typename
    }
  }
`;
