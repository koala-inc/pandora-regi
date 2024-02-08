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
      __typename
    }
  }
`;

const deletePurchaseOrder = gql`
  mutation ($store_code: Int!, $id: Int!) {
    deletePurchaseOrder(input: { store_code: $store_code, id: $id }) {
      __typename
    }
  }
`;
