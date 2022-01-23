<script>
  export let server
  import Button from './button.svelte'
  import Item from './item/index.svelte'
</script>

<div class="main">
  <Button title={server.server} url={server.notion} />
  {#each server.list as item}
    <Item {item} />
  {/each}
</div>

<style>
  .main {
    font-size: 16px;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 1em;
  }
  @media (max-width: 768px) {
    .main{ font-size: 14px; }
  }
</style>
