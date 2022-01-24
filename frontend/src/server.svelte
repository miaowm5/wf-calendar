<script>
  export let server
  import Button from './button.svelte'
  import Item from './item/index.svelte'
</script>

<div class="main">
  <Button title={server.server} url={server.notion} />
  {#each server.list as item(item.id)}
    <Item {item} server={server.flag} />
  {/each}
</div>

<style>
  .main {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 1em;
  }
  @media (max-width: 460px){
    .main{ padding: 0 .5em; }
  }
</style>
