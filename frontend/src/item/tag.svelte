<script>
  export let tag
  const colorList = {
    活动: '#dbeddb',
    卡池: '#d3e5ef',
    限定卡池: '#d3e5ef',
    兑换: '#d3e5ef',
    定期重置: '#fadec9',
    体力药过期: '#fadec9',
    停服维护: '#fadec9',
    运营活动: '#fadec9',
    贩售: '#e3e2e0',
  }

  let color = colorList['活动']
  $: color = colorList[tag] || colorList['活动']

</script>

<p style="background-color: {color}">{tag}</p>

<style>
  p{
    border: 1px solid #a292d9;
    padding: .3em .5em;
    border-radius: .2em;
    font-size: .9em;
    margin-right: .5em;
  }
</style>
