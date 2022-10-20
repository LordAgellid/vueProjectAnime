<template>
    <div v-if="this.tvshow !== null" role="main">
      <h1 class="title is-3 has-text-centered" role="main">{{episode.title}}</h1>
      <!-- eslint-disable-next-line -->
      <h1 class="title is-3 has-text-centered">{{episode.seasonNumber}} - {{episode.number}} - {{episode.title}}</h1>
      <p>{{episode.runtime}} min</p>
      <p>{{episode.tvParentalGuideline}}</p>
      <p class="has-text-justified">{{episode.plot}}</p>
        <div class="has-text-centered" data-v-822c46ee="" style="padding-top: 50px;">
        <router-link :to="{ name: 'playepisode', params:{ id:this.$route.params.id }}">
                <img v-bind:src="episode.imgURL" v-bind:alt="episode.name">
                <img id="somelement" src="../images/playBtn.png" alt="Play Button">
        </router-link>
        </div>
    </div>
    <p style="margin-bottom: 50px;" role="contentinfo">&nbsp;</p>
</template>

<script>
// import component
import { svrURL } from '@/constants';

export default {
    name: 'DetailsEpisodeView',
    components: {
    },
    data() {
        return {
            episode: [],
        };
    },
    computed: {
    },
    methods: {
        async getEpisode() {
            try {
                const response = await fetch(`${svrURL}/episode?episodeId=${this.$route.params.id}`);
                const json = await response.json();
                this.episode = json;
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.getEpisode();
    },
};
</script>

<style scoped>
    #somelement {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
</style>
