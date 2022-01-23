<script>
  export let date
  let time = new Date(date).toLocaleString()
</script>

<p>订阅日历更新时间：{time}</p>

<style>
  p{
    margin: 1em 0 2em;
    text-align: center;
    color: #999;
    font-size: .9em;
  }
</style>
