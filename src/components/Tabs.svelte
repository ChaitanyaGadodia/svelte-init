<script lang="typescript">
  import { onMount } from "svelte";

  export let TABS: string[];
  export let onChange: (selected: string) => {};
  export let initialTab: string;

  let selectedTab: string;

  onMount(() => {
    selectedTab = initialTab || TABS[0];
  });

  const onClick = (tab: string) => {
    selectedTab = tab;
    onChange(tab);
  };
</script>

<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    line-height: 17px;
    color: #9fa6b0;
    margin: 15px 0px;
  }
  .tab {
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
  .selected {
    color: #101721;
    margin-bottom: 4px;
  }
  .border {
    width: 0px;
    height: 5px;
    background: #101721;
    border-radius: 14px;
    align-self: flex-start;
  }
  .selected-border {
    width: 11px;
  }
</style>

<div class="wrapper">
  {#each TABS as tab, i (tab)}
    <div class="tab">
      <div on:click={() => onClick(tab)} class:selected={selectedTab === tab}>
        {tab}
      </div>
      <div class="border" class:selected-border={selectedTab === tab} />
    </div>
  {/each}
</div>
