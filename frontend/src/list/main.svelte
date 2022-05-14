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
    border-bottom: 1px solid #ccc;
    padding: .5em 0 .8em;
  }
  .header{
    display: flex;
    margin: .5em .5em 1em;
    font-weight: bold;
  }
</style>
