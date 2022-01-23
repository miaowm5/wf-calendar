<script>
  import Button from './button.svelte'
  import Time from './time.svelte'

  let info = {}

  const getInfo = async ()=>{
    const res = await fetch(`/data/info.json`)
    const text = await res.text()
    if (res.ok){
      info = JSON.parse(text)
    }else{
      console.error(text)
      throw new Error(text)
    }
  }
  let promise = getInfo()

</script>

{#await promise}
  <p>读取数据日历列表中...</p>
{:then}
  <p>请选择要查看的日历</p>
  {#each info.list as server}
    <Button title="{server.server}日历" url={server.notion} />
  {/each}
  <Time date={info.time} />
{:catch}
  <p>日历列表读取失败</p>
{/await}

<style>
  p{
    text-align: center;
  }
</style>
