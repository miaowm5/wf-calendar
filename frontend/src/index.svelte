<script>
  import './reset.css'
  import Server from './server.svelte'
  import Time from './time.svelte'
  import getInfo from './getInfo'

  let data = {}
  let promise
  const load = async ()=>{
    const result = await getInfo()
    data = result
  }
  promise = load()

</script>

{#await promise}
  <p class="hint">读取数据日历列表中...</p>
{:then}
  <header></header>
  {#each data.list as server(server.id)}
    <Server server={server} />
  {/each}
  <Time date={data.time} />
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
