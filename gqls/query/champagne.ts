import { gql } from "graphql-request";

export { searchChampagne };

const searchChampagne: string = gql`
  query (
    $store_code: [Int]!
    $id: [Int]
    $item_code: [Int]
    $item_category_id: [Int]
    $name: String
    $price_from: Int
    $price_to: Int
    $cost_from: Int
    $cost_to: Int
    $display: Int
    $is_notice_kitchen: Int
  ) {
    champagne(
      store_code: $store_code
      id: $id
      item_code: $item_code
      item_category_id: $item_category_id
      name: $name
      price_from: $price_from
      price_to: $price_to
      cost_from: $cost_from
      cost_to: $cost_to
      display: $display
      is_notice_kitchen: $is_notice_kitchen
    ) {
      store_champagne {
        champagne {
          champagne_revision {
            cost
            default_stock
            display
            edited_at
            group_code
            id
            is_notice_kitchen
            item_category_id
            item_code
            item_id
            name
            point
            price
            type
          }
          type
          id
        }
      }
    }
  }
`;
