import { gql } from "graphql-request";

export {
  createStaff,
  createSalaryStaff,
  updateStaff,
  updateSalaryStaff,
  createAttendanceManagementStaff,
  updateAttendanceManagementStaff,
  deleteStaff,
};

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
      __typename
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
      __typename
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
      __typename
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
      __typename
    }
  }
`;

const createAttendanceManagementStaff = gql`
  mutation (
    $store_code: Int!
    $staff_id: Int!
    $working_date: String!
    $work_schedule_date_time_start: String
    $work_schedule_date_time_end: String
    $time_card_date_time_start: String
    $time_card_date_time_end: String
    $work_date_time_start: String
    $work_date_time_end: String
  ) {
    createAttendanceManagementStaff(
      input: {
        store_code: $store_code
        staff_id: $staff_id
        working_date: $working_date
        work_schedule_date_time_start: $work_schedule_date_time_start
        work_schedule_date_time_end: $work_schedule_date_time_end
        time_card_date_time_start: $time_card_date_time_start
        time_card_date_time_end: $time_card_date_time_end
        work_date_time_start: $work_date_time_start
        work_date_time_end: $work_date_time_end
      }
    ) {
      __typename
    }
  }
`;

const updateAttendanceManagementStaff = gql`
  mutation (
    $store_code: Int!
    $id: Int!
    $work_schedule_date_time_start: String
    $work_schedule_date_time_end: String
    $attendance_status: Int
    $time_card_date_time_start: String
    $time_card_date_time_end: String
    $work_date_time_start: String
    $work_date_time_end: String
    $late_time: Int
    $is_processed: Int
    $is_leaving_work_cancel: Int
  ) {
    updateAttendanceManagementStaff(
      input: {
        store_code: $store_code
        id: $id
        work_schedule_date_time_start: $work_schedule_date_time_start
        work_schedule_date_time_end: $work_schedule_date_time_end
        attendance_status: $attendance_status
        time_card_date_time_start: $time_card_date_time_start
        time_card_date_time_end: $time_card_date_time_end
        work_date_time_start: $work_date_time_start
        work_date_time_end: $work_date_time_end
        late_time: $late_time
        is_processed: $is_processed
        is_leaving_work_cancel: $is_leaving_work_cancel
      }
    ) {
      __typename
    }
  }
`;

const deleteStaff = gql`
  mutation ($store_code: Int!, $id: Int!) {
    deleteStaff(input: { store_code: $store_code, id: $id }) {
      __typename
    }
  }
`;
