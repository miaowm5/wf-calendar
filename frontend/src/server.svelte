<script>
  export let server
  import Button from './button.svelte'
  import Item from './item/index.svelte'
</script>

<div class="main">
  <Button title={server.server} url={server.notion} />
  {#each server.list as item}
    <Item {item} imagePath={server.flag} />
  {/each}
</div>

<style>
  .main {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 1em;
    font-size: 16px;
  }
</style>
