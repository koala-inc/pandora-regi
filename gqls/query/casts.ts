import { gql } from "graphql-request";

export { searchCastQuery };

const searchCastQuery = gql`
  query (
    $store_code: [Int]!
    $id: [Int]
    $cast_code: [Int]
    $staff_id: [Int]
    $name: String
    $name_syllabary_search_code: Int
    $real_name: String
    $real_name_ruby: String
    $section: [Int]
    $entry_date_from: String
    $entry_date_to: String
    $leaving_date_from: String
    $leaving_date_to: String
    $birthday_from: String
    $birthday_to: String
    $phone_number: String
    $media_id: [Int]
    $introducer_id: [Int]
    $display: Int
  ) {
    cast(
      store_code: $store_code
      id: $id
      cast_code: $cast_code
      staff_id: $staff_id
      name: $name
      name_syllabary_search_code: $name_syllabary_search_code
      real_name: $real_name
      real_name_ruby: $real_name_ruby
      section: $section
      entry_date_from: $entry_date_from
      entry_date_to: $entry_date_to
      leaving_date_from: $leaving_date_from
      leaving_date_to: $leaving_date_to
      birthday_from: $birthday_from
      birthday_to: $birthday_to
      phone_number: $phone_number
      media_id: $media_id
      introducer_id: $introducer_id
      display: $display
    ) {
      store_cast {
        cast {
          address
          birthday
          cast_code
          staff_id
          id
          introducer_id
          leaving_date
          media_id
          name
          phone_number
          real_name
          real_name_ruby
          remarks
          display
          section
          entry_date
        }
      }
    }
  }
`;
