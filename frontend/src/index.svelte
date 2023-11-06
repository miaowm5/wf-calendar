<script>
  import './reset.css'
  import Article from './article/index.svelte'
  import Manual from './manual/index.svelte'
  import getInfo from './getInfo'

  let data = {}
  let promise
  const load = async ()=>{ data = await getInfo() }
  promise = load()
  let grey = 0
  const updateGrey = (value)=>{ grey = value }
</script>

<div style={`-webkit-filter: grayscale(${grey}%); filter: grayscale(${grey}%);`}>

<header />
<div class="main">
{#if document.location.pathname === '/manual'}
  <Manual />
{:else}
  {#await promise}
    <p class="hint">读取日历数据中...</p>
  {:then}
    <Article data={data} updateGrey={updateGrey} />
  {:catch}
    <p class="hint">日历数据读取失败</p>
  {/await}
{/if}
</div>

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
  @media (max-width: 460px){
    .main{ padding: 0 .5em; }
  }
</style>
