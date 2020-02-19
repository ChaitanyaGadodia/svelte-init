<script context="module">
  export async function preload({ query }) {
    let supplyEntityId;
    if (
      query.supplyEntityId &&
      !Array.isArray(query.supplyEntityId) &&
      parseInt(query.supplyEntityId, 10).toString(10) === query.supplyEntityId
    ) {
      supplyEntityId = parseInt(query.supplyEntityId, 10);
      return { supplyEntityId };
    }

    this.error(404, "Please make sure that supplyEntityId is present");
  }
</script>

<script lang="typescript">
  import { createApolloClient } from "../utils/apolloClient";
  import { onMount } from "svelte";
  // @ts-ignore: need help
  import { stores } from "@sapper/app";
  import { GetUnitsQuery } from "../typings/lead/graphql";
  import { GET_UNITS } from "../graphql/query";
  import { generateTypologyGroups } from "../utils/units";
  import { formatNumber } from "../utils/formatNumber";

  interface TypologyInfo {
    id?: string;
    name: string;
    count: number;
    minPrice: number;
    totalArea: number;
  }

  let loading = false;
  let typologies: TypologyInfo[] = [];
  const { page } = stores();
  // @ts-ignore: need help
  const { host, path, params, query } = $page;
  const { supplyEntityId } = query;

  onMount(async () => {
    const client = createApolloClient();
    try {
      loading = true;
      const { data } = await client.query<GetUnitsQuery>({
        query: GET_UNITS,
        variables: { supplyEntityId }
      });
      typologies = generateTypologyGroups(data.units);
      loading = false;
    } catch (e) {
      loading = false;
      throw e;
    }
  });
  const projects = [{ name: "Piramal Bla Bla" }, { name: "Shaporji Bla Bla" }];
</script>

<style>
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
  .select-css {
    background: #ffffff;
    box-shadow: 1px 3px 8px rgba(105, 105, 105, 0.1);
    border-radius: 25px;
    padding: 12px 15px;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }
  .select-css::-ms-expand {
    display: none;
  }
  .select-css:hover {
    border-color: #888;
  }
  .select-css:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }
  .select-css option {
    font-weight: normal;
  }
</style>

<svelte:head>
  <title>Inventory: Choose Typology</title>
</svelte:head>

<div>
  <select class="select-css">
    {#each projects as project}
      <option value={project}>{project.name}</option>
    {/each}
  </select>
  <div class="heading">Start with a typology</div>
  {#if loading}
    <div>Loading...</div>
  {/if}
  {#if typologies}
    <div class="cards-wrap">
      {#each typologies as typology, i (typology)}
        <a
          href={`/building?supplyEntityId=${supplyEntityId}&typologyId=${typology.id}`}>
          <div class="typology-card">
            <div>
              <div class="card-heading">{typology.name}</div>
              <div class="card-sub-heading typology-area">
                {typology.totalArea} ft²
              </div>
              <div class="card-text">
                &#8377; {formatNumber(typology.minPrice, 2)} +
              </div>
            </div>
            <div class="count-wrap">
              <div class="available-count">
                {typology.count}
                <span class="count-text">/ {typology.count}</span>
              </div>
              <div class="count-text count-text-align">units available</div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>
