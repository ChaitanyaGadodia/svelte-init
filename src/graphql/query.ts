import gql from "graphql-tag";

export const GET_UNITS = gql`
  query GET_UNITS($supplyEntityId: ID!) {
    units(supplyEntityId: $supplyEntityId) {
      id
      basePrice
      basePriceStructure {
        id
        name
      }
      typology {
        id
        name
        totalArea
      }
    }
  }
`;

export const GET_TYPOLOGY_UNITS = gql`
  query GET_TYPOLOGY_UNITS($supplyEntityId: ID!, $typologyId: ID!) {
    typologyUnits(supplyEntityId: $supplyEntityId, typologyId: $typologyId) {
      id
      basePrice
      basePriceStructure {
        id
        name
      }
      typology {
        id
        totalArea
      }
      floor {
        id
        number
        wing {
          id
          name
          building {
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_WING = gql`
  query GET_WING($id: ID!) {
    wing(id: $id) {
      id
      floors {
        id
        number
        isRefuge
        units {
          id
          name
          typologyId
        }
      }
    }
  }
`;
