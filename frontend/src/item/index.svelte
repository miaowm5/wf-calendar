<script>
  export let list
  export let flag
  export let type
  import Item from './item.svelte'

  let title = {
    "0": "已开始/结束",
    "1": "24小时内",
    "2": "7天内",
    "3": "30天内",
    "4": "更远",
  }[type]

</script>

{#if list.length > 0}
  <div class="main">
    <header class="header">
      <p>{title}</p>
      <p>{list.length}</p>
    </header>
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
  }
  .header>p:nth-child(1){
    font-weight: bold;
  }
  .header>p:nth-child(2){
    color: #999;
    font-size: .9em;
    margin-left: .5em;
    line-height: 1.3em;
  }
</style>
