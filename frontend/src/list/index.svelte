<script>
  export let server
  import Main from './main.svelte'
</script>

<div class="list">
  <Main list={server.group[0]} flag={server.flag} title="已开始/结束" />
  <Main list={server.group[1]} flag={server.flag} title="24小时内" />
  <Main list={server.group[2]} flag={server.flag} title="7天内" />
  <Main list={server.group[3]} flag={server.flag} title="30天内" />
  <Main list={server.group[4]} flag={server.flag} title="更远" />
</div>

<style>
  .list{ margin: -.5em 0 1em; }
</style>
