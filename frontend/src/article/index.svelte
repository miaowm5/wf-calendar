<script>
  export let server
  import List from '../list/index.svelte'
  import Page from './page.svelte'
  import Title from './title.svelte'
  import Footer from './footer.svelte'
</script>

<Page data={server.header} server={server.flag} />
<Title text="活动一览" />
<List server={server} />
<Page data={server.footer} server={server.flag} />
<Footer server={server} />
