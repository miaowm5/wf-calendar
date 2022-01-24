<script>
  export let item
  export let server
  import { fade } from 'svelte/transition'
  import Progress from './progress.svelte'
  import Remain from './remain.svelte'
  import Time from './time.svelte'
  import Tag from './tag.svelte'
  import Detail from "./detail.svelte"

  let fold = false
  const toggleFold = ()=>{ fold = !fold }

</script>

<div class="main" on:click={toggleFold}>
  <Progress status={item.status} remain={item.remain} timeStart={item.timeStart} timeEnd={item.timeEnd} />
  <div class="name">
    <Tag tag={item.tag} />
    <p class="title">{item.title}</p>
  </div>
  {#if !fold}
    <div class="time" transition:fade>
      <Time time={item.timeSort} />
      <p class="remain"><Remain status={item.status} remain={item.remain} /></p>
    </div>
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
  .time, .name{ display: flex; }
  .name{ flex: 1 }
  .title{ line-height: 1.5em; }
  .remain{ font-size: .9em; }
  @media (max-width: 460px){
    .main{ display: block; }
    .time{ margin-top: .5em; }
  }
</style>
