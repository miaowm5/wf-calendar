<script>
  export let item
  // export let imagePath
  import Progress from './progress.svelte';
  import Remain from './remain.svelte'
  import Time from './time.svelte'
  import Tag from './tag.svelte'
</script>

<div class="main">
  <Progress status={item.status} remain={item.remain} timeStart={item.timeStart} timeEnd={item.timeEnd} />
  <Tag tag={item.tag} />
  <p class="title">{item.title}</p>
  <Time time={item.timeSort} />
  <Remain status={item.status} remain={item.remain} />
</div>
<!-- {#if item.image}
  <div class="img">
    <img src={`/banner/${imagePath}/${item.id}.${item.image}`} alt={item.title}>
  </div>
{/if} -->

<style>
  .main{
    padding: .3em .5em;
    display: flex;
    margin-bottom: 3px;
    align-items: center;
    position: relative;
  }
  .title{
    flex: 1;
  }
  /* .img{ max-width: 100%; }
  .img>img{ max-width: 100%; } */
</style>
