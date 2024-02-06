import { gql } from "graphql-request";

export { searchMenu };

const searchMenu = gql`
  query (
    $store_code: [Int]!
    $id: [Int]
    $item_category_id: [Int]
    $group_code: Int
    $type: Int
    $name: String
    $price_from: Int
    $price_to: Int
    $cost_from: Int
    $cost_to: Int
    $display: Int
    $is_notice_kitchen: Int
  ) {
    menu(
      store_code: $store_code
      id: $id
      item_category_id: $item_category_id
      group_code: $group_code
      type: $type
      name: $name
      price_from: $price_from
      price_to: $price_to
      cost_from: $cost_from
      cost_to: $cost_to
      display: $display
      is_notice_kitchen: $is_notice_kitchen
    ) {
      store_menu {
        menu {
          id
          type
          menu_revision {
            item_id
            item_category_id
            group_code
            type
            name
            price
            cost
            default_stock
            display
            is_notice_kitchen
            point
          }
        }
      }
    }
  }
`;
