<script>
  export let server
  import Header from './header.svelte'
  import Title from './title.svelte'
  import Link from './link.svelte'
</script>

<Header data={server.header} server={server.flag} />
<Title text="活动一览" />
<div class="list">
  <slot></slot>
</div>
<Header data={server.footer} server={server.flag} />
<Title text="手机订阅" />
<div class="content">
  <p>使用以下地址将活动日程订阅到手机日历中</p>
  <Link url="https://wf-calendar.miaowm5.com/event-{server.flag}.ics" />
  <Link url="https://miaowm5.notion.site/59cdd0e2d8a14e3f910fed68d9270f12" desc="订阅教程" />
</div>
<Title text="意见反馈" />
<div class="content">
  <Link url="https://nga.178.com/read.php?tid=28982479" prefix="NGA：" />
  <Link url="https://github.com/miaowm5/wf-calendar" prefix="Github：" />
  <p>台服、国际服、国服日历维护者募集中</p>
</div>
<Title text="相关链接" />
<div class="content">
  {#if server.flag === 'jp'}
    <Link url="https://twitter.com/world_flipper" prefix="官方推特：" />
    <Link url="https://worldflipper.jp/news/" prefix="日服官网：" />
  {/if}
  {#if server.flag === 'ch'}
    <Link url="https://weibo.com/u/7541735234" prefix="官方微博：" />
    <Link url="https://space.bilibili.com/1365027097/dynamic" prefix="官方B站：" />
  {/if}
  <Link url={server.notion} prefix="Notion 日历：" />
</div>

<style>
  .list{
    margin: -.5em 0 1em;
  }
  .content{
    line-height: 2em;
  }
</style>
