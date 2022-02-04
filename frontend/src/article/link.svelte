<script>
  export let url
  export let prefix
  export let desc
</script>

<p>
  {prefix || ''}<a href="{url}" target="_blank">
    {desc || url}
  </a>
</p>

<style>
  a{
    color: #777;
    text-decoration: none;
    word-break: break-all;
  }
</style>
