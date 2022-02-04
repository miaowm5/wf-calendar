<script>
  export let server
  import Header from './header.svelte'
</script>

<Header data={server.header.content} server={server.flag} />
<div class="list">
  <slot></slot>
</div>
<Header data={server.footer.content} server={server.flag} />
<a class="button" href="{server.notion}" target="_blank">Notion 日历</a>

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
