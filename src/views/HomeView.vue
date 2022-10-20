<template>
    <div class="section">
        <div class="columns is-centered" style="padding-left: 20px" role="navigation">
            <div class="field is-horizontal" style="padding-left: 20px">
                <div class="field-label is-normal">
                    <div for="seriesTitle" class="label" aria-describedby="seriesTitle">Title:</div>
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control">
                            <input id="seriesTitle"
                            aria-label="series title"
                            class="input" type="text" placeholder="Name"
                            v-model="titleFilter"/>
                        </p>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal" style="padding-left: 20px">
                <div class="field-label is-normal">
                    <label for="test" class="label" aria-describedby="studio">Studio:</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control select">
                            <select id="studio" aria-label="studio"
                            v-model="selectedStudio">
                                <option></option>
                                <option v-for="studio in studios"
                                v-bind:key="studio.studioId"
                                v-bind:value="studio.studioId">{{studio.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel" role="navigation">
            <p class="panel-heading">Genres</p>
            <div class="panel-block">
            <div class="columns is-mobile is-multiline">
                <div class="column is-2"
                v-for="g in genres" :key="g.genreId" :value="g.genreId">
                <label class="checkbox label">
                    <input type="checkbox" :value="g.genreId" v-model="this.selectedGenres"/>
                    {{g.name}}</label>
                </div>
            </div>
            </div>
        </div>
        <div class="row columns is-multiline is-mobile" role="region">
            <CardComp
            v-for="tvshow in filtrerTvShowsParPage"
            v-bind:key="tvshow.tvshowId"
            v-bind:tvshow="tvshow"/>
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
</template>

<script>
// import component
import { svrURL } from '@/constants';
import CardComp from '@/components/CardComp.vue';

export default {
    name: 'HomeView',
    components: {
        CardComp,
    },
    data() {
        return {
            tvshows: [],
            studios: [],
            genres: '',
            titleFilter: '',
            selectedStudio: '',
            selectedGenres: [],
            currentPage: 1,
            nombreDeTvShowsParPage: 8,
        };
    },
    computed: {
        tvshowsFiltre() {
            let tvshowsFiltre = this.tvshows;

            if (this.titleFilter.trim().length > 0) {
                // eslint-disable-next-line arrow-body-style
                tvshowsFiltre = tvshowsFiltre.filter((tvshow) => {
                    return tvshow.title.toLowerCase().includes(this.titleFilter.toLowerCase());
                });
            }
            if (this.selectedStudio !== '') {
                // eslint-disable-next-line arrow-body-style
                tvshowsFiltre = tvshowsFiltre.filter((tvshow) => {
                    return tvshow.studio.studioId === this.selectedStudio;
                });
            }

            if (this.selectedGenres.length !== 0) {
                // eslint-disable-next-line max-len
                tvshowsFiltre = tvshowsFiltre.filter((tvshow) => this.selectedGenres.every((genre) => tvshow.genres.some((g) => g.genreId === genre)));
            }

            return tvshowsFiltre;
        },
        filtrerTvShowsParPage() {
            const x = (this.currentPage - 1) * this.nombreDeTvShowsParPage;
            const y = (this.currentPage) * this.nombreDeTvShowsParPage;
            // console.log(x, y);
            return this.tvshowsFiltre.slice(x, y);
        },
        nbPages() {
            // eslint-disable-next-line
            return Math.ceil(this.tvshowsFiltre.length / this.nombreDeTvShowsParPage);
        },
    },
    methods: {
        async getTvShows() {
            try {
                const response = await fetch(`${svrURL}/tvshows`);
                const json = await response.json();
                this.tvshows = json;
            } catch (error) {
                console.log(error);
            }
        },
        async getStudios() {
            try {
                const response = await fetch(`${svrURL}/studios`);
                const json = await response.json();
                this.studios = json;
            } catch (error) {
                console.log(error);
            }
        },
        async getGenres() {
            try {
                const response = await fetch(`${svrURL}/genres`);
                const json = await response.json();
                this.genres = json;
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
    },
    mounted() {
        this.getTvShows();
        this.getStudios();
        this.getGenres();
    },
};
</script>

<style scoped></style>
