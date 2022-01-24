<script>
  export let tag
  const colorList = {
    活动: '#ec0004',
    卡池: '#00a1fd',
    限定卡池: '#00a1fd',
    兑换: '#00a1fd',
    定期重置: '#7e03ba',
    体力药过期: '#7e03ba',
    停服维护: '#7e03ba',
    运营活动: '#7e03ba',
    贩售: '#f9c800',
  }

  let color = colorList['活动']
  $: color = colorList[tag] || colorList['活动']

</script>

<p style="background-color: {color}">{tag}</p>

<style>
  p{
    font-weight: bold;
    padding: .3em .5em;
    border-radius: .2em;
    font-size: .9em;
    margin-right: .5em;
    color: white;
  }
</style>
