import { gql } from "graphql-request";

export { searchSeat, searchSeatArea, searchSeatSetPriceChange, searchSeatMap };

const searchSeat = gql`
  query ($store_code: [Int]!, $id: [Int], $seat_area_id: [Int]) {
    seat(store_code: $store_code, id: $id, seat_area_id: $seat_area_id) {
      store_seat {
        seat {
          id
          seat_revision {
            name
            id
            type
            seat_area_id
            seat_id
          }
        }
      }
    }
  }
`;

const searchSeatArea = gql`
  query (
    $store_code: [Int]!
    $id: Int
    $name: String
    $area_key: String
    $area_code: Int
  ) {
    seatArea(
      store_code: $store_code
      id: $id
      name: $name
      area_key: $area_key
      area_code: $area_code
    ) {
      store_seat_area {
        seat_area {
          area_code
          area_key
          charge_price
          extra_charge_price
          extra_charge_time
          extra_price
          extra_time
          id
          name
          room_name
          price
          service_tax
        }
      }
    }
  }
`;

const searchSeatSetPriceChange = gql`
  query ($store_code: [Int]!, $id: Int, $slip_key: String) {
    seatSetPriceChange(store_code: $store_code, id: $id, slip_key: $slip_key) {
      store_seat_set_price_change {
        seat_set_price_change {
          slip_key
          set_price
          id
          edited_at
          deleted_at
          charge_price
          created_at
        }
      }
    }
  }
`;

const searchSeatMap = gql`
  query ($store_code: [Int]!, $id: [Int]) {
    seatMap(store_code: $store_code, id: $id) {
      store_seat_map {
        seat_map {
          id
          name
          location
          layer
          type
          text_value
        }
      }
    }
  }
`;
