<script>
  export let server
  import Item from './item/index.svelte'
  import Article from './article/index.svelte'
</script>

<Article data={server.header.content} server={server.flag} />
<a class="button" href="{server.notion}" target="_blank">Notion 日历</a>
<div class="list">
  {#each server.list as item(item.id)}
    <Item {item} server={server.flag} />
  {/each}
</div>
<Article data={server.footer.content} server={server.flag} />

<style>
  .button{
    font-size: .9em;
    color: white;
    background-color: rgb(42, 42, 42);
    margin: 1em 0;
    text-align: center;
    padding: .8em;
    display: block;
    text-decoration: none;
    border-radius: 5px;
  }
  .list{
    margin: 1em 0;
  }
</style>
