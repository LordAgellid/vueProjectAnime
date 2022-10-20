<template>
  <div class="column is-3-desktop is-4-tablet is-full-mobile">
    <router-link :to="{ name: 'episodedetails', params:{ id:episode.episodeId } }">
      <div  :class="episode.state" class="card has-text-black">
        <div class="card-image">
          <figure class="image is-16by9">
            <img v-bind:src="episode.imgURL" v-bind:alt="episode.episodeId">
          </figure>
        </div>
        <div class="card-content">
          <div class="content has-text-centered">
            <p class="title is-4 mb-0"><strong>{{episode.title}}</strong></p>
            <p>{{episode.number}}</p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
    name: 'SeasonEpisodeComp',
    props: {
        episode: Object,
    },
};
</script>

<style>
  .viewed {
    opacity: .5;
  }
</style>
