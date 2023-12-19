import { gql } from "graphql-request";

export { searchPurchaseOrder };

const searchPurchaseOrder = gql`
  query (
    $store_code: [Int]!
    $id: [Int]
    $user_id: [Int]
    $seat_id: [Int]
    $seat_user_id: [Int]
    $cast_id: [Int]
    $staff_id: [Int]
    $slip_key: [String]
    $item_id: [Int]
    $item_type: Int
    $item_group_code: Int
    $item_group_type: Int
    $item_category_id: [Int]
    $ordered_at_form: String
    $ordered_at_to: String
    $is_closed: Int
    $closed_at_form: String
    $closed_at_to: String
    $is_deleted: Int
    $deleted_at_from: String
    $deleted_at_to: String
  ) {
    purchaseOrder(
      store_code: $store_code
      id: $id
      user_id: $user_id
      seat_id: $seat_id
      seat_user_id: $seat_user_id
      cast_id: $cast_id
      staff_id: $staff_id
      slip_key: $slip_key
      item_id: $item_id
      item_type: $item_type
      item_group_code: $item_group_code
      item_group_type: $item_group_type
      item_category_id: $item_category_id
      ordered_at_form: $ordered_at_form
      ordered_at_to: $ordered_at_to
      is_closed: $is_closed
      closed_at_form: $closed_at_form
      closed_at_to: $closed_at_to
      is_deleted: $is_deleted
      deleted_at_from: $deleted_at_from
      deleted_at_to: $deleted_at_to
    ) {
      store_purchase_order {
        purchase_order {
          purchase_order_cast {
            cast_id
            id
            purchase_order_id
          }
          purchase_order_revision {
            user_id
            slip_key
            seat_user_id
            seat_id
            purchase_order_id
            price
            ordered_at
            item_id
            id
          }
          purchase_order_staff {
            staff_id
            id
            purchase_order_id
          }
          id
        }
      }
    }
  }
`;
