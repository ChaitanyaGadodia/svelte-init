<script lang="typescript">
  import { createApolloClient } from "../utils/apolloClient";
  import { onMount } from "svelte";
  // @ts-ignore: need help
  import { stores } from "@sapper/app";
  import { GET_WING } from "../graphql/query";
  import { GetWingQuery } from "../typings/lead/graphql";
  // @ts-ignore: need help
  import WingTable from "../components/WingTable.svelte";

  const { page } = stores();
  // @ts-ignore: need help
  const { query } = $page;
  const { id } = query;

  let loading = false;
  let wing;
  onMount(async () => {
    const client = createApolloClient();
    try {
      loading = true;
      const { data } = await client.query<GetWingQuery>({
        query: GET_WING,
        variables: { id }
      });
      wing = data.wing;
      loading = false;
    } catch (e) {
      loading = false;
      throw e;
    }
  });
</script>

<div>
  {#if loading}
    <div>Loading...</div>
  {/if}
  {#if wing && wing.floors}
    <WingTable floors={wing.floors} />
  {/if}
</div>
