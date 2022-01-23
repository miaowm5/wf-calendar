<script>
  export let time
</script>

<p>{
  `${time.getMonth() + 1}月${time.getDate()}日${time.getHours()}:00`
}</p>

<style>
  p{
    font-size: .9em;
    color: #777;
    margin-right: .5em;
  }
  @media (max-width: 460px) {
    p{ display: none; }
  }
</style>
