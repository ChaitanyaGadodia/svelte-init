import { GetUnitsQuery } from "../typings/lead/graphql";
import _ from "lodash-es";

const PER_SQFT = "price_per_sqft";

const generateUnitBasePrice = (unit: GetUnitsQuery["units"][0]) => {
  if (unit.basePriceStructure?.name === PER_SQFT) {
    return (unit.basePrice || 0) * (unit.typology?.totalArea || 0);
  }
  return unit.basePrice || 0;
};

interface WingInfo {
  name: string;
  floors: number;
  count: number;
  minPrice: number;
}

export const generateWingGroups = (
  units: GetUnitsQuery["units"]
): WingInfo[] => {
  const groups = _.entries(
    _.groupBy(
      units,
      unit => `${unit.floor.wing.building.id} - ${unit.floor.wing.id}`
    )
  );
  const result = groups.map(group => {
    const groupUnit = group[1][0];
    let minPrice = generateUnitBasePrice(groupUnit);
    group[1].map(unit => {
      const price = generateUnitBasePrice(unit);
      if (price < minPrice) {
        minPrice = price;
      }
    });
    return {
      name: `${groupUnit.floor.wing.building.name} - ${groupUnit.floor.wing.name}`,
      floors: groupUnit.floor.number,
      count: group[1].length,
      minPrice
    };
  });
  return result;
};

interface TypologyGroup {
  sellableEntityName: string;
  typologies: TypologyInfo[];
}

interface TypologyInfo {
  name: string;
  count: number;
  minPrice: number;
  totalArea: number;
}

export const generateTypologyGroups = (
  units: GetUnitsQuery["units"]
): TypologyGroup[] => {
  const groups = _.entries(
    _.groupBy(units, unit => unit.typology?.sellableEntity.name)
  );
  const result = groups.map(group => {
    const typologyGroups = _.entries(
      _.groupBy(group[1], unit => unit.typology?.id)
    );
    return {
      sellableEntityName: group[0],
      typologies: typologyGroups.map(typologyGroup => {
        let minPrice = generateUnitBasePrice(typologyGroup[1][0]);
        typologyGroup[1].map(unit => {
          const price = generateUnitBasePrice(unit);
          if (price < minPrice) {
            minPrice = price;
          }
        });
        return {
          name: typologyGroup[1][0].typology?.name || "",
          count: typologyGroup[1].length,
          minPrice,
          totalArea: typologyGroup[1][0].typology?.totalArea || 0
        };
      })
    };
  });
  return result;
};
