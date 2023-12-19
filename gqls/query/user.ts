import { gql } from "graphql-request";

export { searchUser };

const searchUser = gql`
  query ($id: ID, $store_code: [Int]!) {
    user(id: $id, store_code: $store_code) {
      store_user {
        user {
          id
          name
        }
      }
    }
  }
`;
