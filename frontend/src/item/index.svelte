<script>
  export let item
  // export let imagePath
  import Remain from './remain.svelte'
  import Time from './time.svelte'
  import Tag from './tag.svelte'
</script>

<div class="main">
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
  .main {
    display: flex;
    border-bottom: 1px solid #ccc;
    align-items: center;
    line-height: 1;
  }
  .title{
    flex: 1;
  }
  /* .img{ max-width: 100%; }
  .img>img{ max-width: 100%; } */
</style>
