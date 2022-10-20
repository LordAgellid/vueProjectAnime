<template>
    <div class="column is-3-desktop is-4-tablet is-full-mobile">
      <router-link :to="{ name: 'season', params:{ id:season.seasonId } }">
        <div class="card has-text-black">
          <div class="card-image">
            <figure class="image is-3by4">
              <img v-bind:src="season.imgURL" v-bind:alt="season.seasonId">
            </figure>
          </div>
          <div class="card-content">
            <div class="content has-text-centered">
              <p class="title is-4"><strong>Season {{season.number}}</strong></p>
              <p>{{season.episodeCount}} episodes</p>
            </div>
          </div>
        </div>
      </router-link>
    </div>
</template>

<script>
export default {
    name: 'SeasonComp',
    props: {
        season: Object,
    },
};
</script>
