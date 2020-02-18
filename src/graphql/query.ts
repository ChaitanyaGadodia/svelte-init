import gql from "graphql-tag";

export const GET_UNITS = gql`
  query GET_UNITS($supplyEntityId: ID!) {
    units(supplyEntityId: $supplyEntityId) {
      id
      name
      basePrice
      basePriceStructure {
        id
        name
      }
      typology {
        id
        name
        totalArea
        sellableEntity {
          id
          name
        }
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
