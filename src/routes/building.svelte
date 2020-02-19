<script lang="typescript">
  import { createApolloClient } from "../utils/apolloClient";
  import { onMount } from "svelte";
  // @ts-ignore: need help
  import { stores } from "@sapper/app";
  import { GetTypologyUnitsQuery } from "../typings/lead/graphql";
  import { GET_TYPOLOGY_UNITS } from "../graphql/query";
  import { generateWingGroups } from "../utils/units";
  import { formatNumber } from "../utils/formatNumber";

  interface WingInfo {
    id: string;
    name: string;
    floors: number;
    count: number;
    minPrice: number;
  }

  let loading = false;
  let wings: WingInfo[];
  const { preloading, page, session } = stores();
  // @ts-ignore: need help
  const { host, path, params, query } = $page;
  const { supplyEntityId, typologyId } = query;

  onMount(async () => {
    const client = createApolloClient();
    try {
      loading = true;
      const { data } = await client.query<GetTypologyUnitsQuery>({
        query: GET_TYPOLOGY_UNITS,
        variables: { supplyEntityId, typologyId }
      });
      wings = generateWingGroups(data.typologyUnits);
      loading = false;
    } catch (e) {
      loading = false;
      throw e;
    }
  });
</script>

<style>
  .top-btn {
    background: #ffffff;
    box-shadow: 1px 3px 8px rgba(105, 105, 105, 0.1);
    border-radius: 20px;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #101721;
    padding: 12px 15px;
    display: inline;
  }
  .heading {
    font-size: 28px;
    line-height: 38px;
    color: #101721;
    font-weight: 600;
    margin: 40px 0px;
  }
  .cards-wrap {
    margin-top: 30px;
  }
  .typology-card {
    background: #ffffff;
    border: 1px solid rgba(159, 166, 176, 0.3);
    box-sizing: border-box;
    border-radius: 10px;
    padding: 25px;
    display: flex;
    justify-content: space-between;
    margin: 10px 0px;
  }
  .card-heading {
    font-size: 17px;
    font-weight: 600;
    line-height: 15px;
    color: #101721;
  }
  .card-sub-heading {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 13px;
    color: #6b7785;
  }
  .card-text {
    font-size: 14px;
    line-height: 15px;
    letter-spacing: -0.02em;
    color: #101721;
  }
  .typology-area {
    margin: 10px 0px 20px;
  }
  .count-wrap {
    align-self: center;
  }
  .available-count {
    font-weight: 500;
    font-size: 30px;
    line-height: 33px;
    color: #088650;
  }
  .count-text {
    font-weight: 500;
    font-size: 12px;
    line-height: 13px;
    color: #23bf7b;
  }
  .count-text-align {
    margin-top: 10px;
  }
</style>

<svelte:head>
  <title>Inventory: Choose Wing</title>
</svelte:head>

<div class="page-wrap">
  <div class="top-btn">2 BHK Regular</div>
  <div class="heading">Choose a building</div>
  {#if loading}
    <div>Loading...</div>
  {/if}
  {#if wings}
    <div class="cards-wrap">
      {#each wings as wing, i (wing.name)}
        <a href={`/wing?id=${wing.id}`}>
          <div class="typology-card">
            <div>
              <div class="card-heading">{wing.name}</div>
              <div class="card-sub-heading typology-area">
                {wing.floors} Floors
              </div>
              <div class="card-text">
                &#8377; {formatNumber(wing.minPrice, 2)} +
              </div>
            </div>
            <div class="count-wrap">
              <div class="available-count">
                {wing.count}
                <span class="count-text">/ {wing.count}</span>
              </div>
              <div class="count-text count-text-align">units available</div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>
