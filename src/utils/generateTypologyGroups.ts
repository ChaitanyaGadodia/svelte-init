import { GetUnitsQuery } from "../typings/lead/graphql";
import _ from "lodash";

const PER_SQFT = "price_per_sqft";

const generateUnitPrice = (unit: GetUnitsQuery["units"][0]) => {
  if (unit.basePriceStructure?.name === PER_SQFT) {
    return (unit.basePrice || 0) * (unit.typology?.totalArea || 0);
  }
  return unit.basePrice || 0;
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
        let minPrice = generateUnitPrice(typologyGroup[1][0]);
        typologyGroup[1].map(unit => {
          const price = generateUnitPrice(unit);
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
