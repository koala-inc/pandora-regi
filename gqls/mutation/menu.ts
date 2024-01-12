import { gql } from "graphql-request";

export { createMenu, updateMenu };

const createMenu = gql`
  mutation (
    $store_code: Int!
    $item_category_id: Int
    $type: Int
    $name: String!
    $price: Int
    $cost: Int
    $default_stock: Int
    $display: Int
    $point: Int
    $is_notice_kitchen: Int
  ) {
    createMenu(
      input: {
        store_code: $store_code
        item_category_id: $item_category_id
        type: $type
        name: $name
        price: $price
        cost: $cost
        default_stock: $default_stock
        display: $display
        point: $point
        is_notice_kitchen: $is_notice_kitchen
      }
    ) {
      menu {
        menu_revision {
          item_id
          name
        }
      }
    }
  }
`;

const updateMenu = gql`
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
    $is_notice_kitchen: Int
    $point: Int
  ) {
    updateMenu(
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
        is_notice_kitchen: $is_notice_kitchen
        point: $point
      }
    ) {
      menu {
        menu_revision {
          item_id
          name
        }
      }
    }
  }
`;
