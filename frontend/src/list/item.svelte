<script>
  export let item
  export let server
  import Progress from './progress.svelte'
  import Time from './time.svelte'
  import Tag from './tag.svelte'
  import Detail from "./detail.svelte"

  let fold = false
  const toggleFold = ()=>{ fold = !fold }
  let width = 0

</script>

<svelte:window bind:outerWidth={width} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="main" onclick={toggleFold}>
  <Progress status={item.status} remain={item.remain} timeStart={item.timeStart} timeEnd={item.timeEnd} />
  <div class="name">
    <Tag tag={item.tag} tag2={item.tag2} />
    <p class="title">{item.title}</p>
  </div>
  {#if !fold || width <= 460}
    <Time time={item.timeSort} status={item.status} remain={item.remain} />
  {/if}
</div>
{#if fold}<Detail item={item} server={server} />{/if}

<style>
  .main{
    padding: .3em .5em;
    display: flex;
    margin-bottom: 5px;
    align-items: center;
    position: relative;
    cursor: pointer;
  }
  .name{
    display: flex;
    flex: 1;
    align-items: baseline;
  }
  .title{ line-height: 1.5em; }
  @media (max-width: 460px){
    .main{ display: block; }
  }
</style>
