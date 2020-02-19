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

<style>
  .loader-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .head-wrap {
    display: flex;
    justify-content: center;
  }
  .top-btn {
    margin: 20px auto;
    background: #ffffff;
    box-shadow: 1px 3px 8px rgba(105, 105, 105, 0.1);
    border-radius: 20px;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #101721;
    padding: 12px;
    display: inline-block;
  }
  .white-block {
    height: 10px;
    background: #ffffff;
  }
</style>

<div>
  {#if loading}
    <div class="loader-wrap">Loading...</div>
  {/if}
  {#if wing && wing.floors}
    <div class="head-wrap">
      <a href={''}>
        <div class="top-btn">2 BHK Regular in Wing A North Tower</div>
      </a>
    </div>
    <div class="white-block" />
    <WingTable floors={wing.floors} />
  {/if}
</div>
