import gql from "graphql-tag";

export const GET_COUNTRY = gql`
  query GET_COUNTRY($code: ID!) {
    country(code: $code) {
      code
      name
      languages {
        native
      }
      currency
    }
  }
`;

export const GET_COUNTRIES = gql`
  query GET_COUNTRIES {
    countries {
      code
      name
    }
  }
`;
