<template>
  <!-- eslint-disable -->
  <div class="column is-4-tablet is-full-mobile">
    <router-link :to="{ name: 'episodedetails', params:{ id:episode.episodeId } }">
      <div class="card has-text-black">
        <div class="card-image">
          <figure class="image is-16by9">
            <img v-bind:src="episode.imgURL" v-bind:alt="episode.episodeId">
          </figure>
        </div>
        <div class="card-content">
          <div class="content has-text-centered">
            <p class="title is-4 has-text-link mb-0">
              <router-link :to="{ name: 'details', params:{ id:episode.tvshowId } }">
                <strong>{{episode.tvshowTitle}}</strong>
              </router-link>
            </p>
            <p class="title is-4 has-text-link mb-0">
              <router-link :to="{ name: 'season', params:{ id:episode.seasonId } }">
                <strong>Season {{episode.seasonNumber}}</strong>
              </router-link>
            </p>
            <p class="title is-4 has-text-link mb-0">
              <router-link :to="{ name: 'episodedetails', params:{ id:episode.episodeId } }">
                <strong>{{episode.episodeTitle}}</strong>
              </router-link>
            </p>
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

<style scoped>
</style>
