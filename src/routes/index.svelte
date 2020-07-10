<script lang="typescript">
  import { createApolloClient } from "../utils/apolloClient";
  import { onMount } from "svelte";
  import { GetCountriesQuery } from "../typings/graphql";
  import { GET_COUNTRIES } from "../graphql/query";

  let countries: GetCountriesQuery["countries"] = [];
  let loading = false;

  onMount(async () => {
    const client = createApolloClient();
    try {
      loading = true;
      const { data } = await client.query<GetCountriesQuery>({
        query: GET_COUNTRIES
      });
      countries = data && data.countries;
      loading = false;
    } catch (e) {
      loading = false;
      throw e;
    }
  });
</script>

<svelte:head>
  <title>Countries</title>
</svelte:head>

<div>
  <div>List of countries</div>
  {#if loading}
    <div>Loading...</div>
  {/if}
  {#if countries}
    <ul>
      {#each countries as country}
        <li>{country.code}</li>
      {/each}
    </ul>
  {/if}
</div>
