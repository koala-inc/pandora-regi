import { gql } from "graphql-request";

export { createStaff, createSalaryStaff, updateStaff, updateSalaryStaff };

const createStaff = gql`
  mutation (
    $store_code: Int!
    $staff_code: Int!
    $name: String!
    $name_ruby: String
    $employment_type: Int
    $section: Int
    $staff_role_id: Int
    $entry_date: String
    $birthday: String
    $phone_number: String
    $address: String
    $media_id: Int
    $introducer_id: Int
    $remarks: String
  ) {
    createStaff(
      input: {
        store_code: $store_code
        staff_code: $staff_code
        name: $name
        name_ruby: $name_ruby
        employment_type: $employment_type
        section: $section
        staff_role_id: $staff_role_id
        entry_date: $entry_date
        birthday: $birthday
        phone_number: $phone_number
        address: $address
        media_id: $media_id
        introducer_id: $introducer_id
        remarks: $remarks
      }
    ) {
      staff {
        id
        name
      }
    }
  }
`;

const createSalaryStaff = gql`
  mutation (
    $store_code: Int!
    $staff_id: Int!
    $salary_type: Int!
    $wage_hourly: Int
    $wage_daily: Int
  ) {
    createSalaryStaff(
      input: {
        store_code: $store_code
        staff_id: $staff_id
        salary_type: $salary_type
        wage_hourly: $wage_hourly
        wage_daily: $wage_daily
      }
    ) {
      salary_staff {
        id
      }
    }
  }
`;

const updateStaff = gql`
  mutation (
    $store_code: Int!
    $id: Int!
    $staff_code: Int
    $name: String
    $name_ruby: String
    $section: Int
    $entry_date: String
    $leaving_date: String
    $birthday: String
    $phone_number: String
    $address: String
    $media_id: Int
    $introducer_id: Int
    $remarks: String
    $display: Int
  ) {
    updateStaff(
      input: {
        store_code: $store_code
        id: $id
        staff_code: $staff_code
        name: $name
        name_ruby: $name_ruby
        section: $section
        entry_date: $entry_date
        leaving_date: $leaving_date
        birthday: $birthday
        phone_number: $phone_number
        address: $address
        media_id: $media_id
        introducer_id: $introducer_id
        remarks: $remarks
        display: $display
      }
    ) {
      staff {
        id
        name
      }
    }
  }
`;

const updateSalaryStaff = gql`
  mutation (
    $store_code: Int!
    $staff_id: Int!
    $salary_type: Int
    $wage_hourly: Int
    $wage_daily: Int
  ) {
    updateSalaryStaff(
      input: {
        store_code: $store_code
        staff_id: $staff_id
        salary_type: $salary_type
        wage_hourly: $wage_hourly
        wage_daily: $wage_daily
      }
    ) {
      salary_staff {
        id
      }
    }
  }
`;
