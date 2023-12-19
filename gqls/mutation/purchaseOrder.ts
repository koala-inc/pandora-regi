import { gql } from "graphql-request";

export { createPurchaseOrder, deletePurchaseOrder };

const createPurchaseOrder = gql`
  mutation (
    $store_code: Int!
    $item_id: Int!
    $user_id: Int
    $seat_id: Int!
    $slip_key: String!
    $price: Int
    $cast_id: [Int]
    $staff_id: [Int]
    $discount: Int
    $discount_type_id: Int
    $service_tax: Int
    $tax: Int
    $ordered_at: String!
  ) {
    createPurchaseOrder(
      input: {
        store_code: $store_code
        item_id: $item_id
        user_id: $user_id
        seat_id: $seat_id
        slip_key: $slip_key
        price: $price
        cast_id: $cast_id
        staff_id: $staff_id
        discount: $discount
        discount_type_id: $discount_type_id
        service_tax: $service_tax
        tax: $tax
        ordered_at: $ordered_at
      }
    ) {
      purchase_order {
        purchase_order_cast {
          cast_id
          id
          purchase_order_id
        }
        purchase_order_revision {
          item_id
          id
          price
          seat_id
          seat_user_id
          slip_key
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
`;

const deletePurchaseOrder = gql`
  mutation ($store_code: Int!, $id: Int!) {
    deletePurchaseOrder(input: { store_code: $store_code, id: $id }) {
      purchase_order {
        purchase_order_revision {
          id
          user_id
        }
      }
    }
  }
`;
