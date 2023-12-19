import { gql } from "graphql-request";

export { searchStaff, searchSalaryStaff };

const searchStaff = gql`
  query (
    $store_code: [Int]!
    $staff_code: [Int]
    $leaving_date_from: String
    $leaving_date_to: String
    $entry_date_from: String
    $entry_date_to: String
    $name: String
    $phone_number: String
    $media_id: [Int]
    $introducer_id: [Int]
  ) {
    staff(
      store_code: $store_code
      staff_code: $staff_code
      leaving_date_from: $leaving_date_from
      leaving_date_to: $leaving_date_to
      entry_date_from: $entry_date_from
      entry_date_to: $entry_date_to
      name: $name
      phone_number: $phone_number
      media_id: $media_id
      introducer_id: $introducer_id
    ) {
      store_staff {
        staff {
          address
          birthday
          staff_code
          id
          introducer_id
          leaving_date
          media_id
          name
          phone_number
          name_ruby
          remarks
          display
          section
          entry_date
        }
      }
    }
  }
`;

const searchSalaryStaff = gql`
  query ($store_code: [Int]!, $staff_id: [Int], $is_apply: Int) {
    salaryStaff(
      store_code: $store_code
      staff_id: $staff_id
      is_apply: $is_apply
    ) {
      store_salary_staff {
        salary_staff {
          staff_id
          salary_staff_revision {
            wage_daily
            wage_hourly
          }
        }
      }
    }
  }
`;
