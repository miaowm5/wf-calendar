<script>
  export let data
  import List from '../list/index.svelte'
  import Nav from './nav.svelte'
  import Page from './page.svelte'
  import Title from './title.svelte'
  import Footer from './footer.svelte'
  const list = data.list
  let selectServer = 0
  let server = list[selectServer]
</script>

<Nav list={list} current={selectServer} change={(index)=>{
  selectServer = index
  server = list[selectServer]
}} />
{#key selectServer}
  <Page data={server.header} server={server.flag} />
  <Title text="活动一览" />
  <List server={server} />
  {#if server.forecast}
    <Title text="千里眼" />
    <p class="hint">千里眼基于过往活动数据预测，最终活动请以官宣内容为准</p>
    <List server={server} forecast={true} />
  {/if}
  <Page data={server.footer} server={server.flag} />
  <Footer server={server} />
{/key}
<p class="time">日历更新时间：{new Date(data.time).toLocaleString()}</p>

<style>
  .hint{
    line-height: 2em;
    font-size: .9em;
    color: #777;
  }
  .time{
    margin: 4em 0 3em;
    text-align: center;
    color: #999;
    font-size: .9em;
  }
</style>
