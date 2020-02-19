<script lang="typescript">
  import { GetWingQuery } from "../typings/lead/graphql";
  export let floors: NonNullable<GetWingQuery["wing"]>["floors"];
</script>

<style>
  tr {
    border: none;
    border-bottom: 1px dashed #e6e6e6;
  }
  table {
    background: #ffffff;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0px;
    border: none;
    border-top: 3px solid #e9edf4;
  }
  .floor-number {
    font-size: 17px;
    line-height: 19px;
    text-align: right;
    color: #9fa6b0;
    font-weight: 500;
    width: 30px;
  }
  .unit-btn {
    font-size: 14px;
    line-height: 15px;
    padding: 15px 10px;
    border-radius: 8px;
    background: #f3f3f3;
    color: #e0e0e0;
    width: 50px;
    text-align: center;
    margin: 5px;
  }
  .units-wrap {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0px;
  }
  .refuge-row {
    padding: 15px 0px;
    text-align: center;
    font-size: 16px;
    color: #101721;
  }
</style>

<table border="0" cellspacing="0" cellpadding="0">
  {#each floors.sort((a, b) =>
    a.number > b.number ? -1 : 1
  ) as floor, i (floor.id)}
    <tr>
      <td>
        {#if floor.isRefuge}
          <div class="refuge-row">Refuge Floor</div>
        {:else}
          <div class="units-wrap">
            {#each floor.units.sort((a, b) =>
              a.name > b.name ? 1 : -1
            ) as unit, i (unit.id)}
              <div class="unit-btn">{unit.name}</div>
            {/each}
          </div>
        {/if}
      </td>
      <td class="floor-number">{floor.number}</td>
    </tr>
  {/each}
</table>
