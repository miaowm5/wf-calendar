<script>
  export let server
  import Header from './header.svelte'
  import Title from './title.svelte'
  import Footer from './footer.svelte'
</script>

<Header data={server.header} server={server.flag} />
<Title text="活动一览" />
<div class="list"><slot></slot></div>
<Header data={server.footer} server={server.flag} />
<Footer server={server} />

<style>
  .list{ margin: -.5em 0 1em; }
</style>
