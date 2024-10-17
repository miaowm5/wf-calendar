<script>
  import Detail from './detail.svelte'
  export let server

  let list = server.die.sort((a, b)=>a.time - b.time)
</script>

<div class="list">
  {#each list as item}
    <Detail item={item} server={server.flag} />
  {/each}
</div>

<style>
  .list{ margin: -.5em 0 1em; }
</style>
