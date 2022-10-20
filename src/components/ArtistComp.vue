<template>
    <div class="column is-2-desktop is-4-tablet is-full-mobile">
      <div class="card has-text-black">
        <div class="card-image">
          <figure class="image is-2by3">
            <img v-bind:src="artist.imgURL" v-bind:alt="artist.name">
          </figure>
        </div>
        <div class="card-content">
          <div class="content has-text-centered">
            <p><strong>{{artist.name}}</strong></p>
            <p>{{artist.character}}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'ArtistComp',
    props: {
        artist: Object,
    },
};
</script>
