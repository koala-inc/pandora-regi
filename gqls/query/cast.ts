import { gql } from "graphql-request";

export { searchCast, searchSalaryCast, searchAttendanceManagementCast };

const searchCast = gql`
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

const searchSalaryCast = gql`
  query ($store_code: [Int]!, $cast_id: [Int], $is_apply: Int) {
    salaryCast(
      store_code: $store_code
      cast_id: $cast_id
      is_apply: $is_apply
    ) {
      store_salary_cast {
        salary_cast {
          cast_id
          salary_cast_revision {
            wage_daily
            wage_hourly
          }
        }
      }
    }
  }
`;

const searchAttendanceManagementCast = gql`
  query (
    $store_code: [Int]!
    $cast_id: [Int]
    $id: [Int]
    $working_date_from: String
    $working_date_to: String
    $work_schedule_date_time_start_from: String
    $work_schedule_date_time_start_to: String
    $work_schedule_date_time_end_from: String
    $work_schedule_date_time_end_to: String
    $attendance_status: Int
    $time_card_date_time_start_from: String
    $time_card_date_time_start_to: String
    $time_card_date_time_end_from: String
    $time_card_date_time_end_to: String
    $work_date_time_start_from: String
    $work_date_time_start_to: String
    $work_date_time_end_from: String
    $work_date_time_end_to: String
    $is_processed: Int
  ) {
    attendanceManagementCast(
      store_code: $store_code
      cast_id: $cast_id
      id: $id
      working_date_from: $working_date_from
      working_date_to: $working_date_to
      work_schedule_date_time_start_from: $work_schedule_date_time_start_from
      work_schedule_date_time_start_to: $work_schedule_date_time_start_to
      work_schedule_date_time_end_from: $work_schedule_date_time_end_from
      work_schedule_date_time_end_to: $work_schedule_date_time_end_to
      attendance_status: $attendance_status
      time_card_date_time_start_from: $time_card_date_time_start_from
      time_card_date_time_start_to: $time_card_date_time_start_to
      time_card_date_time_end_from: $time_card_date_time_end_from
      time_card_date_time_end_to: $time_card_date_time_end_to
      work_date_time_start_from: $work_date_time_start_from
      work_date_time_start_to: $work_date_time_start_to
      work_date_time_end_from: $work_date_time_end_from
      work_date_time_end_to: $work_date_time_end_to
      is_processed: $is_processed
    ) {
      store_attendance_management_cast {
        attendance_management_cast {
          cast_id
          attendance_status
          is_processed
          late_time
          time_card_date_time_start
          working_date
          time_card_date_time_end
          work_date_time_end
          work_date_time_start
          work_schedule_date_time_end
          work_schedule_date_time_start
          id
        }
      }
    }
  }
`;
