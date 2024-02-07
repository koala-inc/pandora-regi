import { gql } from "graphql-request";

export {
  createCast,
  createSalaryCast,
  createAttendanceManagementCast,
  updateCast,
  updateSalaryCast,
  updateAttendanceManagementCast,
};

const createCast = gql`
  mutation (
    $store_code: Int!
    $cast_code: Int!
    $name: String!
    $name_ruby: String
    $real_name: String
    $real_name_ruby: String
    $section: Int
    $entry_date: String
    $birthday: String
    $phone_number: String
    $address: String
    $media_id: Int
    $introducer_id: Int
    $display: Int
    $remarks: String
  ) {
    createCast(
      input: {
        store_code: $store_code
        cast_code: $cast_code
        name: $name
        name_ruby: $name_ruby
        real_name: $real_name
        real_name_ruby: $real_name_ruby
        section: $section
        entry_date: $entry_date
        birthday: $birthday
        phone_number: $phone_number
        address: $address
        media_id: $media_id
        introducer_id: $introducer_id
        display: $display
        remarks: $remarks
      }
    ) {
      cast {
        id
        name
      }
    }
  }
`;

const createSalaryCast = gql`
  mutation (
    $store_code: Int!
    $cast_id: Int!
    $salary_type: Int!
    $wage_hourly: Int
    $wage_daily: Int
  ) {
    createSalaryCast(
      input: {
        store_code: $store_code
        cast_id: $cast_id
        salary_type: $salary_type
        wage_hourly: $wage_hourly
        wage_daily: $wage_daily
      }
    ) {
      salary_cast {
        id
      }
    }
  }
`;

const createAttendanceManagementCast = gql`
  mutation (
    $store_code: Int!
    $cast_id: Int!
    $working_date: String!
    $work_schedule_date_time_start: String
    $work_schedule_date_time_end: String
    $attendance_status: Int
    $time_card_date_time_start: String
    $time_card_date_time_end: String
    $work_date_time_start: String
    $work_date_time_end: String
    $late_time: Int
    $is_processed: Int
  ) {
    createAttendanceManagementCast(
      input: {
        store_code: $store_code
        cast_id: $cast_id
        working_date: $working_date
        work_schedule_date_time_start: $work_schedule_date_time_start
        work_schedule_date_time_end: $work_schedule_date_time_end
        attendance_status: $attendance_status
        time_card_date_time_start: $time_card_date_time_start
        time_card_date_time_end: $time_card_date_time_end
        work_date_time_start: $work_date_time_start
        work_date_time_end: $work_date_time_end
        late_time: $late_time
        is_processed: $is_processed
      }
    ) {
      attendance_management_cast {
        cast_id
        id
        attendance_status
        is_processed
        late_time
        time_card_date_time_end
        time_card_date_time_start
        work_date_time_end
        work_date_time_start
        work_schedule_date_time_end
        work_schedule_date_time_start
        working_date
      }
    }
  }
`;

const updateCast = gql`
  mutation (
    $store_code: Int!
    $id: Int!
    $cast_code: Int
    $name: String
    $name_ruby: String
    $real_name: String
    $real_name_ruby: String
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
    updateCast(
      input: {
        store_code: $store_code
        id: $id
        cast_code: $cast_code
        name: $name
        name_ruby: $name_ruby
        real_name: $real_name
        real_name_ruby: $real_name_ruby
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
      cast {
        id
        name
      }
    }
  }
`;

const updateSalaryCast = gql`
  mutation (
    $store_code: Int!
    $cast_id: Int!
    $salary_type: Int
    $wage_hourly: Int
    $wage_daily: Int
  ) {
    updateSalaryCast(
      input: {
        store_code: $store_code
        cast_id: $cast_id
        salary_type: $salary_type
        wage_hourly: $wage_hourly
        wage_daily: $wage_daily
      }
    ) {
      salary_cast {
        id
      }
    }
  }
`;

const updateAttendanceManagementCast = gql`
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
    updateAttendanceManagementCast(
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
      attendance_management_cast {
        cast_id
        id
        attendance_status
        is_processed
        late_time
        time_card_date_time_end
        time_card_date_time_start
        work_date_time_end
        work_date_time_start
        work_schedule_date_time_end
        work_schedule_date_time_start
        working_date
      }
    }
  }
`;
