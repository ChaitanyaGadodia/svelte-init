export type Maybe<T> = T | undefined;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ISO8601DateTime: any;
  Url: any;
}

export interface Building {
  createdAt: Scalars["ISO8601DateTime"];
  id: Scalars["ID"];
  name: Scalars["String"];
  phase: Phase;
  phaseId: Scalars["Int"];
  updatedAt: Scalars["ISO8601DateTime"];
  wings: Array<Wing>;
}

export interface Configurable {
  configurableType?: Maybe<ConfigurablesType>;
  configurableTypeId: Scalars["ID"];
  createdAt: Scalars["ISO8601DateTime"];
  id: Scalars["ID"];
  name: Scalars["String"];
  updatedAt: Scalars["ISO8601DateTime"];
}

export interface ConfigurablesType {
  configurables?: Maybe<Array<Configurable>>;
  createdAt: Scalars["ISO8601DateTime"];
  id: Scalars["ID"];
  name: Scalars["String"];
  updatedAt: Scalars["ISO8601DateTime"];
}

export interface CreateBuilding {
  name: Scalars["String"];
  wings: Array<CreateWing>;
}

export interface CreateDocument {
  name: Scalars["String"];
  resourceUrl: Scalars["Url"];
}

export interface CreatePhase {
  name: Scalars["String"];
  isSole: Scalars["Boolean"];
  buildings: Array<CreateBuilding>;
}

export interface CreateRoom {
  name: Scalars["String"];
  roomTypeId: Scalars["Int"];
  area: Scalars["Float"];
  attachedRooms?: Maybe<Array<CreateRoom>>;
}

export interface CreateSector {
  name: Scalars["String"];
  isSole: Scalars["Boolean"];
  phases: Array<CreatePhase>;
}

export interface CreateWing {
  name: Scalars["String"];
}

export interface Document {
  cloudinaryFileName?: Maybe<Scalars["String"]>;
  documentType: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  resourceUrl: Scalars["Url"];
  typologyId: Scalars["Int"];
}

export interface EditOrCreateBuilding {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  statusId?: Maybe<StatusId>;
  wings?: Maybe<Array<EditOrCreateWing>>;
}

export interface EditOrCreateDocument {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  resourceUrl?: Maybe<Scalars["Url"]>;
  statusId?: Maybe<StatusId>;
}

export interface EditOrCreateFloor {
  id?: Maybe<Scalars["ID"]>;
  number?: Maybe<Scalars["Int"]>;
  isRefuge?: Maybe<Scalars["Boolean"]>;
  statusId?: Maybe<StatusId>;
  units?: Maybe<Array<EditOrCreateUnit>>;
}

export interface EditOrCreatePhase {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  isSole?: Maybe<Scalars["Boolean"]>;
  statusId?: Maybe<StatusId>;
  buildings?: Maybe<Array<EditOrCreateBuilding>>;
}

export interface EditOrCreateRoom {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  roomTypeId?: Maybe<Scalars["Int"]>;
  area?: Maybe<Scalars["Float"]>;
  statusId?: Maybe<StatusId>;
  attachedRooms?: Maybe<Array<EditOrCreateRoom>>;
}

export interface EditOrCreateSector {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  isSole?: Maybe<Scalars["Boolean"]>;
  statusId?: Maybe<StatusId>;
  phases?: Maybe<Array<EditOrCreatePhase>>;
}

export interface EditOrCreateUnit {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  isRefuge?: Maybe<Scalars["Boolean"]>;
  bookingStatusId?: Maybe<Scalars["Int"]>;
  statusId?: Maybe<StatusId>;
  basePrice?: Maybe<Scalars["Float"]>;
  typologyId?: Maybe<Scalars["ID"]>;
  configurations?: Maybe<Array<EditOrCreateUnitConfiguration>>;
}

export interface EditOrCreateUnitConfiguration {
  id?: Maybe<Scalars["ID"]>;
  configurableId?: Maybe<Scalars["ID"]>;
  statusId?: Maybe<StatusId>;
}

export interface EditOrCreateWing {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  statusId?: Maybe<StatusId>;
}

export interface EditOrCreateWingConfiguration {
  id?: Maybe<Scalars["ID"]>;
  totalCount?: Maybe<Scalars["Int"]>;
  configurableId?: Maybe<Scalars["ID"]>;
  statusId?: Maybe<StatusId>;
}

export interface EditUnitConfigurationPricing {
  id?: Maybe<Scalars["String"]>;
  price: Scalars["Float"];
  priceStructureId?: Maybe<Scalars["ID"]>;
  configurableId?: Maybe<Scalars["ID"]>;
}

export interface EditUnitPricing {
  id: Scalars["String"];
  basePrice?: Maybe<Scalars["Float"]>;
  basePriceStructureId?: Maybe<Scalars["ID"]>;
  configurations?: Maybe<Array<EditUnitConfigurationPricing>>;
}

export interface Floor {
  createdAt: Scalars["ISO8601DateTime"];
  id: Scalars["ID"];
  isRefuge: Scalars["Boolean"];
  number: Scalars["Int"];
  units: Array<Unit>;
  updatedAt: Scalars["ISO8601DateTime"];
  wing: Wing;
  wingId: Scalars["Int"];
}

export interface Mutation {
  copyBuilding: Scalars["Boolean"];
  copyWing: Scalars["Boolean"];
  createMiscConfigurable: Configurable;
  createOrEditSectors: Array<Sector>;
  createOrEditWing: Wing;
  createParkingConfigurable: Configurable;
  createSectors: Array<Sector>;
  createTypology: Typology;
  editPricing: Array<Unit>;
  editTypology: Typology;
}

export interface MutationCopyBuildingArgs {
  from: Scalars["ID"];
  to: Array<Scalars["ID"]>;
}

export interface MutationCopyWingArgs {
  from: Scalars["ID"];
  to: Array<Scalars["ID"]>;
}

export interface MutationCreateMiscConfigurableArgs {
  name: Scalars["String"];
}

export interface MutationCreateOrEditSectorsArgs {
  sectors: Array<EditOrCreateSector>;
  supplyEntityId: Scalars["ID"];
}

export interface MutationCreateOrEditWingArgs {
  floors?: Maybe<Array<EditOrCreateFloor>>;
  unitNamingConvention?: Maybe<UnitNamingConvention>;
  namingSubstituteFor13Floor?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  configurations?: Maybe<Array<EditOrCreateWingConfiguration>>;
  statusId?: Maybe<StatusId>;
}

export interface MutationCreateParkingConfigurableArgs {
  name: Scalars["String"];
}

export interface MutationCreateSectorsArgs {
  sectors: Array<CreateSector>;
  supplyEntityId: Scalars["ID"];
}

export interface MutationCreateTypologyArgs {
  name: Scalars["String"];
  supplyEntityId: Scalars["Int"];
  sellableEntityId: Scalars["ID"];
  totalArea: Scalars["Float"];
  rooms?: Maybe<Array<CreateRoom>>;
  documents?: Maybe<Array<CreateDocument>>;
}

export interface MutationEditPricingArgs {
  units?: Maybe<Array<EditUnitPricing>>;
}

export interface MutationEditTypologyArgs {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  sellableEntityId?: Maybe<Scalars["ID"]>;
  totalArea?: Maybe<Scalars["Float"]>;
  rooms?: Maybe<Array<EditOrCreateRoom>>;
  documents?: Maybe<Array<EditOrCreateDocument>>;
  statusId?: Maybe<Scalars["Int"]>;
}

export interface Phase {
  buildings: Array<Building>;
  createdAt: Scalars["ISO8601DateTime"];
  id: Scalars["ID"];
  isSole: Scalars["Boolean"];
  name: Scalars["String"];
  sector: Sector;
  sectorId: Scalars["Int"];
  updatedAt: Scalars["ISO8601DateTime"];
}

export interface PriceStructure {
  id: Scalars["ID"];
  name: Scalars["String"];
}

export interface Query {
  building?: Maybe<Building>;
  configurableTypes: Array<ConfigurablesType>;
  floor?: Maybe<Floor>;
  priceStructures?: Maybe<Array<PriceStructure>>;
  roomType?: Maybe<RoomType>;
  roomTypes?: Maybe<Array<RoomType>>;
  sectors: Array<Sector>;
  sellableEntities: Array<Configurable>;
  typologies: Array<Typology>;
  typology?: Maybe<Typology>;
  typologyUnits: Array<Unit>;
  unit?: Maybe<Unit>;
  units: Array<Unit>;
  wing?: Maybe<Wing>;
}

export interface QueryBuildingArgs {
  id: Scalars["ID"];
}

export interface QueryFloorArgs {
  id: Scalars["ID"];
}

export interface QueryRoomTypeArgs {
  id: Scalars["ID"];
}

export interface QuerySectorsArgs {
  supplyEntityId: Scalars["ID"];
}

export interface QueryTypologiesArgs {
  supplyEntityId: Scalars["ID"];
}

export interface QueryTypologyArgs {
  id: Scalars["ID"];
}

export interface QueryTypologyUnitsArgs {
  supplyEntityId: Scalars["ID"];
  typologyId: Scalars["ID"];
}

export interface QueryUnitArgs {
  id: Scalars["ID"];
}

export interface QueryUnitsArgs {
  supplyEntityId: Scalars["ID"];
}

export interface QueryWingArgs {
  id: Scalars["ID"];
}

export interface Room {
  area?: Maybe<Scalars["Float"]>;
  attachedToRoom?: Maybe<Room>;
  attachedToRoomId?: Maybe<Scalars["ID"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  roomType: RoomType;
  roomTypeId: Scalars["ID"];
}

export interface RoomType {
  id: Scalars["ID"];
  isAttachable: Scalars["Boolean"];
  name: Scalars["String"];
}

export interface Sector {
  createdAt: Scalars["ISO8601DateTime"];
  id: Scalars["ID"];
  isSole: Scalars["Boolean"];
  name: Scalars["String"];
  phases: Array<Phase>;
  supplyEntityId: Scalars["Int"];
  updatedAt: Scalars["ISO8601DateTime"];
}

export enum StatusId {
  Active = "Active",
  Inactive = "Inactive"
}

export interface Typology {
  basePrice?: Maybe<Scalars["Float"]>;
  basePriceStructure?: Maybe<PriceStructure>;
  basePriceStructureId?: Maybe<Scalars["Int"]>;
  createdAt: Scalars["ISO8601DateTime"];
  documents: Array<Document>;
  id: Scalars["ID"];
  name: Scalars["String"];
  rooms: Array<Room>;
  sellableEntity: Configurable;
  sellableEntityId: Scalars["ID"];
  supplyEntityId: Scalars["Int"];
  totalArea?: Maybe<Scalars["Float"]>;
  updatedAt: Scalars["ISO8601DateTime"];
}

export interface Unit {
  basePrice?: Maybe<Scalars["Float"]>;
  basePriceStructure?: Maybe<PriceStructure>;
  basePriceStructureId?: Maybe<Scalars["ID"]>;
  bookingStatusId?: Maybe<Scalars["Int"]>;
  configurations: Array<UnitConfiguration>;
  createdAt: Scalars["ISO8601DateTime"];
  floor: Floor;
  floorId: Scalars["Int"];
  id: Scalars["ID"];
  isRefuge: Scalars["Boolean"];
  name: Scalars["String"];
  typology?: Maybe<Typology>;
  typologyId?: Maybe<Scalars["ID"]>;
  updatedAt: Scalars["ISO8601DateTime"];
}

export interface UnitConfiguration {
  configurable: Configurable;
  configurableId: Scalars["ID"];
  createdAt: Scalars["ISO8601DateTime"];
  id: Scalars["ID"];
  price?: Maybe<Scalars["Float"]>;
  priceStructure?: Maybe<PriceStructure>;
  priceStructureId?: Maybe<Scalars["ID"]>;
  unit: Unit;
  unitId: Scalars["ID"];
  updatedAt: Scalars["ISO8601DateTime"];
}

export enum UnitNamingConvention {
  Floor0Unit = "Floor0Unit"
}

export interface Wing {
  building: Building;
  buildingId: Scalars["Int"];
  configurations: Array<WingConfiguration>;
  createdAt: Scalars["ISO8601DateTime"];
  floors: Array<Floor>;
  id: Scalars["ID"];
  name: Scalars["String"];
  namingSubstituteFor13Floor?: Maybe<Scalars["String"]>;
  unitNamingConvention?: Maybe<UnitNamingConvention>;
  updatedAt: Scalars["ISO8601DateTime"];
}

export interface WingConfiguration {
  configurable: Configurable;
  configurableId: Scalars["ID"];
  createdAt: Scalars["ISO8601DateTime"];
  id: Scalars["ID"];
  totalCount?: Maybe<Scalars["Int"]>;
  updatedAt: Scalars["ISO8601DateTime"];
  wing: Wing;
  wingId: Scalars["ID"];
}

export type GetUnitsQueryVariables = {
  supplyEntityId: Scalars["ID"];
};

export type GetUnitsQuery = {
  units: Array<
    Pick<Unit, "id" | "name" | "basePrice"> & {
      basePriceStructure: Maybe<Pick<PriceStructure, "id" | "name">>;
      typology: Maybe<
        Pick<Typology, "id" | "name" | "totalArea"> & {
          sellableEntity: Pick<Configurable, "id" | "name">;
        }
      >;
      floor: Pick<Floor, "id" | "number"> & {
        wing: Pick<Wing, "id" | "name"> & {
          building: Pick<Building, "id" | "name">;
        };
      };
    }
  >;
};
