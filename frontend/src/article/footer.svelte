<script>
  export let server
  import Title from './title.svelte'
  import Link from './link.svelte'
</script>

<Title text="手机订阅" />
<div class="content">
  <p>使用以下地址将活动日程订阅到手机日历中</p>
  <Link url="https://wf-calendar.miaowm5.com/event-{server.flag}.ics" media="text/calendar" />
  <Link url="/manual" desc="订阅教程" />
</div>
<Title text="意见反馈" />
<div class="content">
  <Link url="https://nga.178.com/read.php?tid=28982479" prefix="NGA：" />
  <Link url="https://github.com/miaowm5/wf-calendar" prefix="Github：" />
  {#if server.flag === 'ch'}
    <Link url="https://ngabbs.com/nuke.php?func=ucp&uid=60999453" prefix="国服维护协力：" desc="御坂葉子" />
  {:else}
    <p>台服、国际服日历维护者募集中</p>
  {/if}
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
    <Link url="https://www.taptap.com/app/218693/topic?type=official" prefix="官方TapTap：" />
  {/if}
</div>

<style>
  .content{
    line-height: 2em;
  }
</style>
