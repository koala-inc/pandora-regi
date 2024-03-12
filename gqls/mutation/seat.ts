import { gql } from "graphql-request";

export {
  createSeatArea,
  createSeatSetPriceChange,
  deleteSeatArea,
  updateSeatArea,
};

const createSeatArea = gql`
  mutation (
    $store_code: Int!
    $name: String
    $room_name: String
    $is_preset: Int
    $area_key: String
    $area_code: Int
    $price: Int
    $charge_price: Int
    $extra_time: Int
    $extra_price: Int
    $extra_charge_time: Int
    $extra_charge_price: Int
    $service_tax: Int
  ) {
    createSeatArea(
      input: {
        store_code: $store_code
        name: $name
        room_name: $room_name
        is_preset: $is_preset
        area_key: $area_key
        area_code: $area_code
        price: $price
        charge_price: $charge_price
        extra_time: $extra_time
        extra_price: $extra_price
        extra_charge_time: $extra_charge_time
        extra_charge_price: $extra_charge_price
        service_tax: $service_tax
      }
    ) {
      __typename
    }
  }
`;

const createSeatSetPriceChange = gql`
  mutation (
    $store_code: Int!
    $slip_key: String!
    $charge_price: Int
    $set_price: Int
  ) {
    createSeatSetPriceChange(
      input: {
        store_code: $store_code
        slip_key: $slip_key
        charge_price: $charge_price
        set_price: $set_price
      }
    ) {
      __typename
    }
  }
`;

const updateSeatArea = gql`
  mutation (
    $store_code: Int!
    $id: Int!
    $name: String
    $room_name: String
    $is_preset: Int
    $area_key: String
    $area_code: Int
    $price: Int
    $charge_price: Int
    $extra_time: Int
    $extra_price: Int
    $extra_charge_time: Int
    $extra_charge_price: Int
    $service_tax: Int
  ) {
    updateSeatArea(
      input: {
        store_code: $store_code
        id: $id
        name: $name
        room_name: $room_name
        is_preset: $is_preset
        area_key: $area_key
        area_code: $area_code
        price: $price
        charge_price: $charge_price
        extra_time: $extra_time
        extra_price: $extra_price
        extra_charge_time: $extra_charge_time
        extra_charge_price: $extra_charge_price
        service_tax: $service_tax
      }
    ) {
      __typename
    }
  }
`;

const deleteSeatArea = gql`
  mutation ($store_code: Int!, $id: Int!) {
    deleteSeatArea(input: { store_code: $store_code, id: $id }) {
      __typename
    }
  }
`;
