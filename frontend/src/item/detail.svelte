<script>
  export let item
  export let server
  import { slide } from 'svelte/transition'
  import Remain from './remain.svelte'
</script>

<div class="detail" transition:slide>
  {#if item.image}
    <div
      class="img"
      style="background-image: url({`/banner/${server}/${item.id}.${item.image}`})">
    </div>
  {/if}
  <div class="content">
    {#if item.timeStart}
      <h1>开始时间</h1>
      <p>{new Date(item.timeStart).toLocaleString()}</p>
    {/if}

    {#if item.timeEnd}
      <h1>结束时间</h1>
      <p>{new Date(item.timeEnd).toLocaleString()}</p>
    {/if}

    <h1>当前状态</h1>
    <Remain status={item.status} remain={item.remain} />
  </div>
</div>

<style>
  .detail{
    display: flex;
    padding: .5em;
  }
  .img, .content{
    flex: 1;
  }
  .img{
    background: #ccc;
    border: 1px solid #ccc;
    height: 230px;
    background-size: cover;
    background-position: center;
    margin-right: 1em;
  }
  .content h1{
    font-size: .9em;
    background-image: url(/front-assets/header.png);
    background-repeat: no-repeat;
    background-size: auto 100%;
    height: 1.7em;
    line-height: 1.7em;
    padding-left: 2em;
    color: white;
    margin-bottom: .5em;
  }
  .content p{
    margin-bottom: .5em;
  }
  @media (max-width: 768px){
    .img{
      flex: 3;
      height: 180px;
      margin-right: .5em;
    }
    .content{ flex: 2; }
  }
  @media (max-width: 460px){
    .detail{
      display: block;
      padding: 0;
      margin-bottom: 1em;
    }
    .img{
      margin-right: 0;
      margin-bottom: .5em;
    }
  }
</style>
