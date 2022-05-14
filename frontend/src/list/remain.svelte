<script>
  export let remain
  export let status

  let timeStr = '已经结束'

  $: {
    if (status === 'end'){
      timeStr = '已经结束'
    }else if (status === 'open'){
      timeStr = '已经开始'
    }else if (remain < 300){
      timeStr = status === 'before' ? '即将开始' : '即将结束'
    }else{
      if (remain < 3600){
        timeStr = `${parseInt(remain / 60)}分钟`
      }else if (remain >= 3600 && remain < 86400){
        timeStr = `${parseInt(remain / 3600)}小时`
      }else{
        timeStr = `${parseInt(remain / 86400)}天`
      }
      timeStr = status === 'before' ? `${timeStr}后开始` : `剩余${timeStr}`
    }
  }
</script>

<p>{timeStr}</p>
