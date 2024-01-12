import { gql } from "graphql-request";

export { createVisit, deleteVisit };

const createVisit = gql`
  mutation (
    $store_code: Int!
    $seat_id: Int!
    $user_id: Int!
    $inflow_section: Int
    $information_office_id: Int
    $external_sales_id: Int
    $started_at: String
    $ended_at: String
    $calling_time: String
    $is_auto_extension: Int
    $is_non_room_charge: Int
  ) {
    createVisit(
      input: {
        store_code: $store_code
        seat_id: $seat_id
        user_id: $user_id
        inflow_section: $inflow_section
        information_office_id: $information_office_id
        external_sales_id: $external_sales_id
        started_at: $started_at
        ended_at: $ended_at
        calling_time: $calling_time
        is_auto_extension: $is_auto_extension
        is_non_room_charge: $is_non_room_charge
      }
    ) {
      visit {
        visit_revision {
          calling_time
          edited_at
          ended_at
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
      }
    }
  }
`;

const deleteVisit = gql`
  mutation ($store_code: Int!, $id: Int!) {
    deleteVisit(input: { store_code: $store_code, id: $id }) {
      visit {
        visit_revision {
          id
        }
      }
    }
  }
`;
