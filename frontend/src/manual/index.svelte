<script>
  import MIUI from './miui.svelte'
  import IOS from './ios.svelte'
  document.title = '弹射日历 | 订阅教程'
  let article = 0
</script>

{#if article !== 0}
  <nav on:click={()=>article=0}>◀ 返回</nav>
{/if}
<article>
  {#if article === 0}
    <p>请选择订阅方式：</p>
    <div class="nav" on:click={()=>article=1}>安卓（MIUI）订阅</div>
    <div class="nav" on:click={()=>article=2}>iOS（低版本）订阅</div>
  {:else if article === 1}
    <MIUI/>
  {:else if article === 2}
    <IOS/>
  {/if}
</article>

<style>
  nav{
    margin: 1em 0 0;
    font-size: .9em;
    color: rgb(42, 42, 42);
    display: inline-block;
    text-align: center;
    padding: 1em 2em;
    border-radius: 5px;
    background-color: rgb(246, 246, 246);
    box-shadow: 0 0 8px rgb(183, 185, 186);
    cursor: pointer;
  }
  article{
    margin-bottom: 3em;
  }
  article .nav{
    margin: 1em 0 0;
    color: rgb(42, 42, 42);
    padding: 1em 1.5em;
    border-radius: 5px;
    background-color: rgb(246, 246, 246);
    box-shadow: 0 0 8px rgb(183, 185, 186);
    cursor: pointer;
  }
  article :global(p){
    margin-top: 1.5em;
    line-height: 1.5;
  }
  article :global(img){
    max-width: 80%;
    border: 1px solid #ccc;
    margin: 1em auto;
  }
  article :global(strong){
    font-weight: bold;
    padding: 0 .3em;
  }
</style>
