<script>
  import './reset.css'
  import data from './store/data'
  import Server from './server.svelte'
  import Time from './time.svelte'

  const getInfo = async ()=>{
    const res = await fetch(`/data/info.json`)
    const text = await res.text()
    if (res.ok){
      data.set(JSON.parse(text))
    }else{
      console.error(text)
      throw new Error(text)
    }
  }
  const promise = getInfo()

</script>

{#await promise}
  <p class="hint">读取数据日历列表中...</p>
{:then}
  <header></header>
  {#each $data.list as server(server.id)}
    <Server server={server} />
  {/each}
  <Time date={$data.time} />
{:catch}
  <p class="hint">日历列表读取失败</p>
{/await}

<style>
  header{
    background-color: rgb(221, 85, 85);
    background-image: url(/front-assets/banner.jpg);
    background-size: auto 120%;
    background-repeat: no-repeat;
    background-position: center;
    height: 10em;
  }
  .hint{
    text-align: center;
    margin-top: 1em;
  }
</style>
