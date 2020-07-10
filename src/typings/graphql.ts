export type Maybe<T> = T | undefined;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Upload: any;
}

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

export interface Continent {
  code: Scalars["ID"];
  name: Scalars["String"];
  countries: Array<Country>;
}

export interface ContinentFilterInput {
  code?: Maybe<StringQueryOperatorInput>;
}

export interface Country {
  code: Scalars["ID"];
  name: Scalars["String"];
  native: Scalars["String"];
  phone: Scalars["String"];
  continent: Continent;
  capital?: Maybe<Scalars["String"]>;
  currency?: Maybe<Scalars["String"]>;
  languages: Array<Language>;
  emoji: Scalars["String"];
  emojiU: Scalars["String"];
  states: Array<State>;
}

export interface CountryFilterInput {
  code?: Maybe<StringQueryOperatorInput>;
  currency?: Maybe<StringQueryOperatorInput>;
  continent?: Maybe<StringQueryOperatorInput>;
}

export interface Language {
  code: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  native?: Maybe<Scalars["String"]>;
  rtl: Scalars["Boolean"];
}

export interface LanguageFilterInput {
  code?: Maybe<StringQueryOperatorInput>;
}

export interface Query {
  continents: Array<Continent>;
  continent?: Maybe<Continent>;
  countries: Array<Country>;
  country?: Maybe<Country>;
  languages: Array<Language>;
  language?: Maybe<Language>;
}

export interface QueryContinentsArgs {
  filter?: Maybe<ContinentFilterInput>;
}

export interface QueryContinentArgs {
  code: Scalars["ID"];
}

export interface QueryCountriesArgs {
  filter?: Maybe<CountryFilterInput>;
}

export interface QueryCountryArgs {
  code: Scalars["ID"];
}

export interface QueryLanguagesArgs {
  filter?: Maybe<LanguageFilterInput>;
}

export interface QueryLanguageArgs {
  code: Scalars["ID"];
}

export interface State {
  code?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  country: Country;
}

export interface StringQueryOperatorInput {
  eq?: Maybe<Scalars["String"]>;
  ne?: Maybe<Scalars["String"]>;
  in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  nin?: Maybe<Array<Maybe<Scalars["String"]>>>;
  regex?: Maybe<Scalars["String"]>;
  glob?: Maybe<Scalars["String"]>;
}

export type GetCountryQueryVariables = {
  code: Scalars["ID"];
};

export type GetCountryQuery = {
  country: Maybe<
    Pick<Country, "code" | "name" | "currency"> & {
      languages: Array<Pick<Language, "native">>;
    }
  >;
};

export type GetCountriesQueryVariables = {};

export type GetCountriesQuery = { countries: Array<Pick<Country, "code">> };
