<script>
  export let item
  import Progress from './progress.svelte'
  import Remain from './remain.svelte'
  import Time from './time.svelte'
  import Tag from './tag.svelte'
</script>

<div class="main">
  <Progress status={item.status} remain={item.remain} timeStart={item.timeStart} timeEnd={item.timeEnd} />
  <div class="name">
    <Tag tag={item.tag} />
    <p class="title">{item.title}</p>
  </div>
  <div class="time">
    <Time time={item.timeSort} />
    <Remain status={item.status} remain={item.remain} />
  </div>
</div>

<style>
  .main{
    padding: .3em .5em;
    display: flex;
    margin-bottom: 3px;
    align-items: center;
    position: relative;
  }
  .time, .name{ display: flex; }
  .name{ flex: 1 }
  .title{ line-height: 1.5em; }
  @media (max-width: 460px){
    .main{ display: block; }
    .time{ margin-top: .5em; }
  }
</style>
