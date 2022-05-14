<script>
  export let data
  export let server
</script>

{#each data.content as item}
  {#if item.type === 'image'}
    <div class="image">
      <img src="/banner/{server}/{item.id}.{item.format}?{data.edit}" alt="banner">
    </div>
  {/if}
{/each}

<style>
  .image{
    text-align: center;
  }
  .image>img{
    width: 100%;
  }
</style>
