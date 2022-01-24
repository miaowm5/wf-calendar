<script>
  export let date
  let time = new Date(date).toLocaleString()
</script>

<p>日历更新时间：{time}</p>

<style>
  p{
    margin: 2em 0;
    text-align: center;
    color: #999;
    font-size: .9em;
  }
</style>
