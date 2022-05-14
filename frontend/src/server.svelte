<script>
  export let server
  import List from './list/index.svelte'
  import Article from './article/index.svelte'
</script>

<Article server={server}>
  <List list={server.group[0]} flag={server.flag} type="0" />
  <List list={server.group[1]} flag={server.flag} type="1" />
  <List list={server.group[2]} flag={server.flag} type="2" />
  <List list={server.group[3]} flag={server.flag} type="3" />
  <List list={server.group[4]} flag={server.flag} type="4" />
</Article>
