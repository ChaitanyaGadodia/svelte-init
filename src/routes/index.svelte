<script lang="typescript">
  import { createApolloClient } from "../utils/apolloClient";
  import { onMount } from "svelte";
  import gql from "graphql-tag";

  const GET_UNITS = gql`
    query GET_UNITS($supplyEntityId: ID!) {
      units(supplyEntityId: $supplyEntityId) {
        id
      }
    }
  `;

  let units;
  let loading;

  onMount(async () => {
    const client = createApolloClient();
    try {
      const { data, loading: fetchLoading } = await client.query<{ units: [] }>(
        {
          query: GET_UNITS,
          variables: { supplyEntityId: 739 }
        }
      );
      loading = fetchLoading;
      units = data && data.units;
    } catch (e) {
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
  {#if loading}
    <div>Loading...</div>
  {/if}
  {#if units}{JSON.stringify(units)}{/if}
</div>
