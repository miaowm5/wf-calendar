<script>
  import './reset.css'
  import Nav from './nav.svelte'
  import Server from './server.svelte'
  import Time from './time.svelte'
  import getInfo from './getInfo'

  let data = {}
  let selectServer = 0
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
  <header />
  <div class="main">
    <Nav list={data.list} current={selectServer} change={(index)=>selectServer = index} />
    {#key selectServer}<Server server={data.list[selectServer]} />{/key}
    <Time date={data.time} />
  </div>
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
  .main {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1em;
  }
  @media (max-width: 460px){
    .main{ padding: 0 .5em; }
  }
</style>
