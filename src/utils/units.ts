import { GetUnitsQuery } from "../typings/lead/graphql";
import _ from "lodash";

const PER_SQFT = "price_per_sqft";

const generateUnitBasePrice = (unit: GetUnitsQuery["units"][0]) => {
  if (unit.basePriceStructure?.name === PER_SQFT) {
    return (unit.basePrice || 0) * (unit.typology?.totalArea || 0);
  }
  return unit.basePrice || 0;
};

export const generateWingGroups = (units: GetUnitsQuery["units"]) => {
  const buildingGroups = _.entries(
    _.groupBy(units, unit => unit.floor.wing.building.id)
  );
  const result = buildingGroups.map(buildingGroup => {
    const wingGroups = _.entries(
      _.groupBy(buildingGroup[1], unit => unit.floor.wing.id)
    );
    return {
      buildingName: buildingGroup[0],
      wings: wingGroups.map(wingGroup => {
        let minPrice = generateUnitBasePrice(wingGroup[1][0]);
        wingGroup[1].map(unit => {
          const price = generateUnitBasePrice(unit);
          if (price < minPrice) {
            minPrice = price;
          }
        });
        return {
          name: wingGroup[1][0].floor.wing.name,
          count: wingGroup[1].length,
          minPrice
        };
      })
    };
  });
  return result;
};

export const generateTypologyGroups = (units: GetUnitsQuery["units"]) => {
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
          name: typologyGroup[1][0].typology?.name,
          count: typologyGroup[1].length,
          minPrice
        };
      })
    };
  });
  return result;
};
