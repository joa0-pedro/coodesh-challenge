import { gql } from "@apollo/client";

export const LOAD_MAILS = gql`
  query ($id: ID!) {
    session(id: $id) {
      mails {
        rawSize
        fromAddr
        toAddr
        downloadUrl
        text
        headerSubject
      }
    }
  }
`;
