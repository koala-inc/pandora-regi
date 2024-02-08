import { gql } from "graphql-request";

export { createUser };

const createUser: string = gql`
  mutation ($store_code: Int!, $name: String) {
    createUser(input: { store_code: $store_code, name: $name }) {
      __typename
    }
  }
`;
