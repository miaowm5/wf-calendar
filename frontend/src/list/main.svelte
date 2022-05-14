<script>
  export let list
  export let flag
  export let title
  import Item from './item.svelte'
</script>

{#if list.length > 0}
  <div class="main">
    <header class="header">{title}</header>
    {#each list as item(item.id)}
      <Item {item} server={flag} />
    {/each}
  </div>
{/if}

<style>
  .main{
    padding: .5em 0 0;
  }
  .header{
    padding: .7em .5em .5em;
    margin-bottom: .7em;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
  }
</style>
