<template>
    <div class="column is-3-desktop is-4-tablet is-full-mobile">
      <router-link :to="{ name: 'details', params:{ id:tvshow.tvshowId } }">
            <div class="card has-text-black">
              <div class="card-image">
                <figure class="image is-2by3">
                  <img v-bind:src="tvshow.imgURL" v-bind:alt="tvshow.name">
                </figure>
              </div>
              <div class="card-content">
                <div class="content has-text-centered">
                  <p class="title is-3">{{tvshow.title}}</p>
                  <p><strong>Studio: </strong>{{tvshow.studio.name}}</p>
                  <p><strong>Genres: </strong>{{tvshow.genres
                                                .map((genre) => genre.name)
                                                .join(', ')}}</p>
                </div>
              </div>
            </div>
      </router-link>
    </div>
</template>

<script>
export default {
    name: 'CardComp',
    props: {
        tvshow: Object,
    },
};
</script>
