<template>
    <div v-if="this.season !== null" role="main">
      <h1 class="title is-1 has-text-centered">{{season.tvshowTitle}}</h1>
      <h1 class="title is-1 has-text-centered">{{season.seasonNumber}}</h1>
      <div class="columns is-mobile is-multiline scrolling-wrapper-flexbox">
        <SeasonEpisodeComp
        v-for="episode in filtrerEpisodesParPage"
        v-bind:key="episode.episodeId"
        v-bind:episode="episode"/>
      </div>
      <nav class="pagination" role="navigation" aria-label="pagination">
            <button
            v-if="currentPage != 1"
            v-on:click="pagePrecedente"
            v-on:keydown="pagePrecedente"
            class="pagination-previous">Précédent</button>
            <button
            v-if="currentPage != nbPages"
            v-on:click="pageSuivant"
            v-on:keydown="pageSuivant"
            class="pagination-next">Suivant</button>
          <ul class="pagination-list">
              <li v-for="page in nbPages" v-bind:key="page">
                <button
                class="pagination-link"
                v-on:click ="toCurrentPage(page)"
                v-bind:class="{'is-current': page == currentPage }"
                v-on:keydown="toCurrentPage(page)">{{page}}</button>
              </li>
          </ul>
      </nav>
    </div>
    <p style="margin-bottom: 50px;" role="contentinfo">&nbsp;</p>
</template>

<script>
// import component
import { svrURL } from '@/constants';
import SeasonEpisodeComp from '@/components/SeasonEpisodeComp.vue';

export default {
    name: 'SeasonEpisodesView',
    components: {
        SeasonEpisodeComp,
    },
    data() {
        return {
            season: null,
            currentPage: 1,
            nombreEpisodesParPage: 8,
        };
    },
    computed: {
        filtrerEpisodesParPage() {
            this.viewedOrNot();
            const x = (this.currentPage - 1) * this.nombreEpisodesParPage;
            const y = (this.currentPage) * this.nombreEpisodesParPage;
            // console.log(x, y);
            return this.season.episodes.slice(x, y);
        },
        nbPages() {
            // eslint-disable-next-line
            return Math.ceil(this.season.episodes.length / this.nombreEpisodesParPage);
        },

    },
    methods: {
        async getSeasonEpisodes() {
            try {
                const response = await fetch(`${svrURL}/episodes?seasonId=${this.$route.params.id}`);
                const json = await response.json();
                this.season = json;
            } catch (error) {
                console.log(error);
            }
        },
        pageSuivant() {
            if (this.currentPage < this.nbPages) {
                this.currentPage += 1;
            }
        },
        pagePrecedente() {
            if (this.currentPage > 1) {
                this.currentPage -= 1;
            }
        },
        toCurrentPage(page) {
            // console.log(page);
            this.currentPage = page;
        },
        viewedOrNot() {
            /* eslint-disable */
            for (const elements1 of this.season.episodes) {
                elements1.state = 'notViewed';
                for (const elements2 of this.$store.state.history) {
                    if (elements1.episodeId === elements2.episodeId) {
                        elements1.state = 'viewed';
                        // console.log(elements1.episodeId, true);
                    }
                }
            }
        },

    },
    mounted() {
        this.getSeasonEpisodes();
    },
};
</script>

<style scoped></style>
