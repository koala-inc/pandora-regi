import { gql } from "graphql-request";

export { createDesignate, deleteDesignate, updateDesignate };

const createDesignate = gql`
  mutation (
    $store_code: Int!
    $item_category_id: Int
    $type: Int
    $name: String
    $price: Int
    $cost: Int
    $default_stock: Int
    $display: Int
    $extra_time: Int
    $extra_price: Int
    $is_tax_service: Int
    $point: Int
    $symbol: String
  ) {
    createDesignate(
      input: {
        store_code: $store_code
        item_category_id: $item_category_id
        type: $type
        name: $name
        price: $price
        cost: $cost
        default_stock: $default_stock
        display: $display
        extra_time: $extra_time
        extra_price: $extra_price
        is_tax_service: $is_tax_service
        point: $point
        symbol: $symbol
      }
    ) {
      __typename
    }
  }
`;

const updateDesignate = gql`
  mutation (
    $store_code: Int!
    $id: Int!
    $item_category_id: Int
    $type: Int
    $name: String
    $price: Int
    $cost: Int
    $default_stock: Int
    $display: Int
    $extra_time: Int
    $extra_price: Int
    $is_tax_service: Int
    $point: Int
    $symbol: String
  ) {
    updateDesignate(
      input: {
        store_code: $store_code
        id: $id
        item_category_id: $item_category_id
        type: $type
        name: $name
        price: $price
        cost: $cost
        default_stock: $default_stock
        display: $display
        extra_time: $extra_time
        extra_price: $extra_price
        is_tax_service: $is_tax_service
        point: $point
        symbol: $symbol
      }
    ) {
      __typename
    }
  }
`;

const deleteDesignate = gql`
  mutation ($store_code: Int!, $id: Int!) {
    deleteDesignate(input: { store_code: $store_code, id: $id }) {
      __typename
    }
  }
`;
