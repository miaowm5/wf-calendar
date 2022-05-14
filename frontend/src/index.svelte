<script>
  import './reset.css'
  import Nav from './nav.svelte'
  import Server from './server.svelte'
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

<header />
<div class="main">
  {#await promise}
    <p class="hint">读取日历数据中...</p>
  {:then}
    <Nav list={data.list} current={selectServer} change={(index)=>selectServer = index} />
    {#key selectServer}<Server server={data.list[selectServer]} />{/key}
    <p class="time">日历更新时间：{new Date(data.time).toLocaleString()}</p>
  {:catch}
    <p class="hint">日历数据读取失败</p>
  {/await}
</div>

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
    margin-top: 2em;
  }
  .main {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1em;
  }
  .time{
    margin: 4em 0 3em;
    text-align: center;
    color: #999;
    font-size: .9em;
  }
  @media (max-width: 460px){
    .main{ padding: 0 .5em; }
  }
</style>
