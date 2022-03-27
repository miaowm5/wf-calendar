<script>
  export let tag
  const colorList = {
    活动: 'rgba(236, 0, 4, .7)',
    卡池: 'rgba(0, 161, 253, .7)',
    限定卡池: 'rgba(0, 161, 253, .7)',
    兑换: 'rgba(0, 161, 253, .7)',
    定期重置: 'rgba(126, 3, 186, .7)',
    体力药过期: 'rgba(126, 3, 186, .7)',
    停服维护: 'rgba(126, 3, 186, .7)',
    运营活动: 'rgba(126, 3, 186, .7)',
    贩售: 'rgba(249, 200, 0, .7)',
    千里眼: 'rgba(249, 200, 0, .7)',
  }

  let color = colorList['活动']
  $: color = colorList[tag] || colorList['活动']

</script>

<p style="background-color: {color}">{tag}</p>

<style>
  p{
    background-color: grey;
    font-weight: bold;
    padding: .3em .5em;
    border-radius: .2em;
    font-size: .9em;
    margin-right: .5em;
    color: white;
  }
</style>
