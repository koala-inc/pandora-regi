import { gql } from "graphql-request";

export { searchUser };

const searchUser = gql`
  query ($store_code: [Int]!, $id: Int) {
    user(store_code: $store_code, id: $id) {
      store_user {
        user {
          id
          name
        }
      }
    }
  }
`;
