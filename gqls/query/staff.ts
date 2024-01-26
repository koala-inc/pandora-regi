import { gql } from "graphql-request";

export { searchStaff, searchSalaryStaff, searchAttendanceManagementStaff };

const searchStaff = gql`
  query (
    $store_code: [Int]!
    $staff_code: [Int]
    $leaving_date_from: String
    $leaving_date_to: String
    $entry_date_from: String
    $entry_date_to: String
    $section: Int
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
      section: $section
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

const searchAttendanceManagementStaff = gql`
  query (
    $store_code: [Int]!
    $staff_id: [Int]
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
      staff_id: $staff_id
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
      store_attendance_management_staff {
        attendance_management_staff {
          staff_id
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
