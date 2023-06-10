import { gql } from "@apollo/client";

export const CREATE_SESSION_ID = gql`
  mutation {
    introduceSession {
      id
      expiresAt
      addresses {
        address
      }
    }
  }
`;
