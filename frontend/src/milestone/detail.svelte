<script>
  import Time from './time.svelte'
  import Tag from './tag.svelte'

  export let item
  export let server
</script>

<div class="detail">
  {#if item.image}
    <div
      class="img"
      style="background-image: url({`/banner/${server}/${item.id}.${item.image}?${item.edit}`})">
      <img src={`/banner/${server}/${item.id}.${item.image}?${item.edit}`} alt={item.title} />
    </div>
  {/if}
  <div class="content">
    <Time time={new Date(item.time)} />
    <div class="name">
      {#if item.tag}<Tag tag={item.tag} />{/if}
      <p class="title">{item.title}</p>
    </div>
  </div>
</div>

<style>
  .detail{
    display: flex;
    padding: .5em;
  }
  .img, .content{
    flex: 1;
  }
  .img>img{ display: none; }
  @supports (object-fit: cover){
    .img>img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: inline;
    }
  }
  .img{
    background: #ccc;
    border: 1px solid #ccc;
    height: 230px;
    background-size: cover;
    background-position: center;
    margin-right: 1em;
  }
  .content p{
    margin-bottom: .5em;
  }
  .name{
    display: flex;
    flex: 1;
    align-items: baseline;
  }
  .title{ line-height: 1.5em; }

  @media (max-width: 768px){
    .detail{
      display: block;
      padding: 0;
      margin-bottom: 1em;
    }
    .img{
      margin-right: 0;
      margin-bottom: .5em;
    }
  }
</style>
