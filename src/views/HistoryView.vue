<template>
    <div v-if="this.history !== null" role="main">
      <h1 class="title is-1 has-text-centered">History</h1>
      <div class="columns is-mobile is-multiline scrolling-wrapper-flexbox">
        <HistoryEpisodeComp
        v-for="episode in filtrerEpisodesParPage"
        v-bind:key="episode.episodeId"
        v-bind:episode="episode"/>
      </div>
      <nav class="pagination" role="navigation" aria-label="pagination">
          <button
          v-on:click="pagePrecedente"
          v-on:keydown="pagePrecedente"
          class="pagination-previous">Précédent</button>
          <button
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
// import { svrURL } from '@/constants';
import HistoryEpisodeComp from '@/components/HistoryEpisodeComp.vue';

export default {
    name: 'HistoryView',
    components: {
        HistoryEpisodeComp,
    },
    data() {
        return {
            season: null,
            currentPage: 1,
            nombreEpisodesParPage: 6,
        };
    },
    computed: {
        filtrerEpisodesParPage() {
            const x = (this.currentPage - 1) * this.nombreEpisodesParPage;
            const y = (this.currentPage) * this.nombreEpisodesParPage;
            // console.log(x, y);
            return this.$store.state.history.slice(x, y);
        },
        nbPages() {
            // eslint-disable-next-line
            return Math.ceil(this.$store.state.history.length / this.nombreEpisodesParPage);
        },
    },
    methods: {
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

    },
};
</script>

<style scoped></style>
