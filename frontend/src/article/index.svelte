<script>
  export let data
  export let server
</script>

{#each data as item}
  {#if item.type === 'image'}
    <div class="image">
      <img src="/banner/{server}/{item.id}.{item.format}" alt="banner">
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
