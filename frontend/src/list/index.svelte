<script>
  export let server
  export let forecast = false
  import Main from './main.svelte'

  const title = ["已开始/结束", "今天", "24小时内", "7天内", "30天内", "更远"]
  const filterList = server.group.map((list)=>{
    return list.filter((item)=>item.tag === '千里眼' ? forecast : !forecast)
  })
</script>

<div class="list">
  {#each filterList as list, index}
    {#if index !== 0}
      <Main list={list} flag={server.flag} title={title[index] || ''} />
    {/if}
  {/each}
</div>

<style>
  .list{ margin: -.5em 0 1em; }
</style>
