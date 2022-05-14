<script>
  export let server
  import List from '../list/index.svelte'
  import Page from './page.svelte'
  import Title from './title.svelte'
  import Footer from './footer.svelte'
</script>

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

<style>
  .hint{
    line-height: 2em;
    font-size: .9em;
    color: #777;
  }
</style>
