import { gql } from "graphql-request";

export { searchVisit };

const searchVisit = gql`
  query (
    $store_code: [Int]!
    $id: [Int]
    $is_checked: Int
    $checked_at_from: String
    $checked_at_to: String
    $seat_id: [Int]
    $user_id: [Int]
    $started_at_from: String
    $started_at_to: String
    $is_ended: Int
    $ended_at_form: String
    $ended_at_to: String
  ) {
    visit(
      store_code: $store_code
      id: $id
      is_checked: $is_checked
      checked_at_from: $checked_at_from
      checked_at_to: $checked_at_to
      seat_id: $seat_id
      user_id: $user_id
      started_at_from: $started_at_from
      started_at_to: $started_at_to
      is_ended: $is_ended
      ended_at_form: $ended_at_form
      ended_at_to: $ended_at_to
    ) {
      store_visit {
        visit {
          visit_revision {
            calling_time
            external_sales_id
            id
            inflow_section
            information_office_id
            is_auto_extension
            is_non_room_charge
            seat_id
            seat_user_id
            started_at
            user_id
          }
          id
        }
      }
    }
  }
`;
