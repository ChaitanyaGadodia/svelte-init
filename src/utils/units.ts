import { GetUnitsQuery, GetTypologyUnitsQuery } from "../typings/lead/graphql";
import _ from "lodash-es";

const PER_SQFT = "price_per_sqft";

const generateUnitBasePrice = (
  unit: Pick<
    GetTypologyUnitsQuery["typologyUnits"][0],
    "basePrice" | "basePriceStructure" | "typology"
  >
) => {
  if (unit.basePriceStructure?.name === PER_SQFT) {
    return (unit.basePrice || 0) * (unit.typology?.totalArea || 0);
  }
  return unit.basePrice || 0;
};

interface WingInfo {
  id: string;
  name: string;
  floors: number;
  count: number;
  minPrice: number;
}

export const generateWingGroups = (
  units: GetTypologyUnitsQuery["typologyUnits"]
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
      id: groupUnit.floor.wing.id,
      name: `${groupUnit.floor.wing.building.name} - ${groupUnit.floor.wing.name}`,
      floors: groupUnit.floor.number,
      count: group[1].length,
      minPrice
    };
  });
  return result;
};

interface TypologyInfo {
  id?: string;
  name: string;
  count: number;
  minPrice: number;
  totalArea: number;
}

export const generateTypologyGroups = (
  units: GetUnitsQuery["units"]
): TypologyInfo[] => {
  const groups = _.entries(_.groupBy(units, unit => unit.typology?.id));
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
      id: groupUnit.typology?.id,
      name: groupUnit.typology?.name || "-",
      count: group[1].length,
      minPrice,
      totalArea: groupUnit.typology?.totalArea || 0
    };
  });
  return result;
};
