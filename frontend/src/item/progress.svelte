<script>
  export let remain
  export let timeStart
  export let timeEnd

  let width = 100

  $:{
    if (!remain || (!timeStart && !timeEnd)){
      width = 100
    }else{
      let distance = 0
      if (timeStart && timeEnd){
        distance = (new Date(timeEnd) - new Date(timeStart)) / 1000
      }else{
        distance = 86400 * 30
      }
      width = distance < remain ? 0 : (distance - remain) / distance * 100
    }
  }
</script>

<div style="right: {100 - width}%"></div>

<style>
  div{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background: #d2f3ff;
    z-index: -100;
  }
</style>
