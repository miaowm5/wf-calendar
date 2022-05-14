<script>
  export let time
  export let status
  export let remain
  import { fade } from 'svelte/transition'
  import Remain from './remain.svelte'
</script>

<div class="main" transition:fade|local>
  <p class="time">{`${time.getMonth() + 1}月${time.getDate()}日${time.getHours()}:00`}</p>
  <p class="remain"><Remain status={status} remain={remain} /></p>
</div>


<style>
  .main{ display: flex; }
  .time{
    font-size: .9em;
    color: #777;
    margin-right: .5em;
  }
  .remain{ font-size: .9em; }
  @media (max-width: 460px){
    .main{ margin-top: .5em; }
  }
</style>
