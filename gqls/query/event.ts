import { gql } from "graphql-request";

export { searchEvent };

const searchEvent = gql`
  query (
    $store_code: [Int]!
    $id: [Int]
    $course_id: [Int]
    $seat_area_id: [Int]
    $item_category_id: [Int]
    $name: String
    $display: Int
    $is_tax_service: Int
    $is_information_center: Int
  ) {
    event(
      store_code: $store_code
      id: $id
      course_id: $course_id
      seat_area_id: $seat_area_id
      item_category_id: $item_category_id
      name: $name
      display: $display
      is_tax_service: $is_tax_service
      is_information_center: $is_information_center
    ) {
      store_event {
        event {
          event_revision {
            event_item_id
            id
            is_information_center
            is_tax_service
            item_category_id
            item_id
            name
            point
            price
            seat_area_id
            set_adaptation_end_time
            set_adaptation_start_time
            set_time
          }
          id
        }
      }
    }
  }
`;
