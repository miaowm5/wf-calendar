<script>
  import { getColor } from "../tagInfo"
  export let tag
  export let tag2
</script>

<p style="background-color: {getColor(tag)}">{tag2 || ''}{tag}</p>

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
