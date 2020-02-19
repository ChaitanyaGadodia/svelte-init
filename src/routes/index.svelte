<script lang="typescript">
  import { createApolloClient } from "../utils/apolloClient";
  import { onMount } from "svelte";
  import { GetUnitsQuery } from "../typings/lead/graphql";
  import { GET_UNITS } from "../graphql/query";

  let units: GetUnitsQuery["units"];
  let loading = false;

  onMount(async () => {
    const client = createApolloClient();
    try {
      loading = true;
      const { data } = await client.query<GetUnitsQuery>({
        query: GET_UNITS,
        variables: { supplyEntityId: 739 }
      });
      units = data && data.units;
      loading = false;
    } catch (e) {
      loading = false;
      throw e;
    }
  });
</script>

<!-- <style>
  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style> -->

<svelte:head>
  <title>Inventory</title>
</svelte:head>

<div>
  <select />
  <div>Start with a typology</div>
  {#if loading}
    <div>Loading...</div>
  {/if}
  {#if units}
    <div>{JSON.stringify(units)}</div>
  {/if}
</div>
