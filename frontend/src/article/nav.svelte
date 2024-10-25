<script>
  export let list
  export let current
  export let change
</script>

<nav>
  {#each list as server, index}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="{index === current ? 'active' : ''}"
      onclick={()=>change(index)}
    >
      {server.server}日历
    </div>
  {/each}
</nav>

<style>
  nav{
    font-size: .9em;
    color: rgb(42, 42, 42);
    margin: 1em 0 1.5em;
  }
  div{
    display: inline-block;
    text-align: center;
    padding: 1em 2em;
    border-radius: 5px;
    background-color: rgb(246, 246, 246);
    margin-right: .5em;
    box-shadow: 0 0 8px rgb(183, 185, 186);
    cursor: pointer;
  }
  div.active{
    color: rgb(161, 119, 63);
    background-color: rgb(255, 205, 142);
  }
</style>
