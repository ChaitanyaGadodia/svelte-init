<script lang="typescript">
  // @ts-ignore: https://github.com/UnwrittenFun/svelte-vscode/issues/64
  import Nav from "../components/Nav.svelte";

  export let segment: string | undefined;
</script>

<style>
  main {
    position: relative;
    max-width: 1024px;
    background-color: #f7f7f9;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
