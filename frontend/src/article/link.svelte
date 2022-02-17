<script>
  export let url
  export let prefix = ''
  export let desc = ''
  export let media = 'text/html'
</script>

<p>
  {prefix || ''}<a href="{url}" target="_blank" type={media}>
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
