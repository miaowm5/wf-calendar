<script>
  export let data
  export let updateGrey
  import List from '../list/index.svelte'
  import Milestone from '../milestone/index.svelte'
  import Nav from './nav.svelte'
  import Page from './page.svelte'
  import Title from './title.svelte'
  import Footer from './footer.svelte'
  const list = data.list
  let selectServer = 1
  if (localStorage.getItem('selectServer')){
    selectServer = parseInt(localStorage.getItem('selectServer')) - 0 || 1
  }
  if (!list[selectServer]){ selectServer = 0 }
  let server = list[selectServer]

  $: {
    if (server.die){ updateGrey(0) }
    else{ updateGrey(0) }
  }
</script>

<Nav list={list} current={selectServer} change={(index)=>{
  selectServer = index
  server = list[selectServer]
  localStorage.setItem('selectServer', index)
}} />
{#key selectServer}
  {#if !server.die}
    <Page data={server.header} server={server.flag} />
    <Title text="活动一览" />
    <List server={server} />
    {#if server.forecast}
      <Title text="千里眼" />
      <p class="hint">千里眼基于过往活动数据预测，最终活动请以官宣内容为准</p>
      <List server={server} forecast={true} />
    {/if}
    <Page data={server.footer} server={server.flag} />
  {:else}
    <Milestone server={server} />
  {/if}
  <Footer server={server} />
{/key}
<p class="time">日历更新时间：{new Date(data.time).toLocaleString()}</p>

<style>
  .hint{
    line-height: 2em;
    font-size: .9em;
    font-weight: bold;
  }
  .time{
    margin: 4em 0 3em;
    text-align: center;
    color: #999;
    font-size: .9em;
  }
</style>
