import { gql } from "graphql-request";

export { createEvent, deleteEvent, updateEvent };

const createEvent = gql`
  mutation (
    $store_code: Int!
    $course_id: Int
    $seat_area_id: Int
    $item_category_id: Int
    $name: String!
    $price: Int
    $cost: Int
    $default_stock: Int
    $display: Int
    $point: Int
    $set_adaptation_start_time: String
    $set_adaptation_end_time: String
    $set_time: Int
    $is_tax_service: Int
    $is_information_center: Int
  ) {
    createEvent(
      input: {
        store_code: $store_code
        course_id: $course_id
        seat_area_id: $seat_area_id
        item_category_id: $item_category_id
        name: $name
        price: $price
        cost: $cost
        default_stock: $default_stock
        display: $display
        point: $point
        set_adaptation_start_time: $set_adaptation_start_time
        set_adaptation_end_time: $set_adaptation_end_time
        set_time: $set_time
        is_tax_service: $is_tax_service
        is_information_center: $is_information_center
      }
    ) {
      __typename
    }
  }
`;

const updateEvent = gql`
  mutation (
    $store_code: Int!
    $id: Int!
    $course_id: Int
    $seat_area_id: Int
    $item_category_id: Int
    $name: String
    $price: Int
    $cost: Int
    $default_stock: Int
    $display: Int
    $point: Int
    $set_adaptation_start_time: String
    $set_adaptation_end_time: String
    $set_time: Int
    $is_tax_service: Int
    $is_information_center: Int
  ) {
    updateEvent(
      input: {
        store_code: $store_code
        id: $id
        course_id: $course_id
        seat_area_id: $seat_area_id
        item_category_id: $item_category_id
        name: $name
        price: $price
        cost: $cost
        default_stock: $default_stock
        display: $display
        point: $point
        set_adaptation_start_time: $set_adaptation_start_time
        set_adaptation_end_time: $set_adaptation_end_time
        set_time: $set_time
        is_tax_service: $is_tax_service
        is_information_center: $is_information_center
      }
    ) {
      __typename
    }
  }
`;

const deleteEvent: string = gql`
  mutation ($store_code: Int!, $id: Int!) {
    deleteEvent(input: { store_code: $store_code, id: $id }) {
      __typename
    }
  }
`;
