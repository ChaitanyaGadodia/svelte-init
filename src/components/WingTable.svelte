<script lang="typescript">
  import { GetWingQuery } from "../typings/lead/graphql";
  export let floors: NonNullable<GetWingQuery["wing"]>["floors"];
</script>

<style>
  tr {
    border: none;
    border-bottom: 1px dashed #e6e6e6;
    height: 80px;
  }
  table {
    background: #ffffff;
    width: 100%;
    border-collapse: collapse;
  }
  .floor-number {
    font-size: 17px;
    line-height: 19px;
    text-align: right;
    color: #9fa6b0;
    font-weight: 500;
  }
  .unit-name {
    font-size: 14px;
    line-height: 15px;
    padding: 15px 10px;
    border-radius: 8px;
    background: #f3f3f3;
    color: #e0e0e0;
    max-width: 60px;
    text-align: center;
  }
</style>

<table cell-spacing="0">
  {#each floors as floor, i (floor.id)}
    <tr>
      <td>
        {#if floor.isRefuge}
          <div>Refuge Floor</div>
        {:else}
          {#each floor.units as unit, i (unit.id)}
            <div class="unit-name">{unit.name}</div>
          {/each}
        {/if}
      </td>
      <td class="floor-number">{floor.number}</td>
    </tr>
  {/each}
</table>
