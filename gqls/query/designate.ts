import { gql } from "graphql-request";

export { searchDesignate };

const searchDesignate = gql`
  query (
    $store_code: [Int]!
    $id: [Int]
    $item_category_id: [Int]
    $type: Int
    $name: String
    $price_from: Int
    $price_to: Int
    $cost_from: Int
    $cost_to: Int
    $is_tax_service: Int
  ) {
    designate(
      store_code: $store_code
      id: $id
      item_category_id: $item_category_id
      type: $type
      name: $name
      price_from: $price_from
      price_to: $price_to
      cost_from: $cost_from
      cost_to: $cost_to
      is_tax_service: $is_tax_service
    ) {
      store_designate {
        designate {
          designate_revision {
            extra_price
            extra_time
            group_code
            id
            is_tax_service
            item_category_id
            item_id
            name
            price
            symbol
            type
          }
          type
          id
        }
      }
    }
  }
`;
