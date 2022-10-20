<template>
    <div v-if="this.tvshow !== null" role="main">
        <div class="columns">
            <div class="column is-5">
                <img v-bind:src="tvshow.imgURL" v-bind:alt="tvshow.name">
            </div>
            <div class="column is-7">
                <div class="columns is-multiline">
                    <div class="column is-8">
                        <h2 class="title is-2">{{tvshow.title}}</h2>
                    </div>
                    <div class="column is-4 has-text-right">
                        <!---->
                    </div>
                    <h5 class="column is-12">{{tvshow.year}}</h5>
                    <div class="column is-2">
                        <p>{{tvshow.episodeCount}} episodes</p>
                    </div>
                    <div class="column is-2">
                        <p>{{tvshow.tvParentalGuideline}}</p>
                    </div>
                    <div class="column is-8">
                        <!-- eslint-disable-next-line -->
                        <p class="has-text-right">{{ tvshow.genres.map((genre) => genre.name).join(", ") }}</p>
                    </div>
                    <div class="column is-2">
                        <p>Studio</p>
                    </div>
                    <div class="column is-10">
                        <p>{{tvshow.studio.name}}</p>
                    </div>
                    <div class="column is-12 has-text-justified">
                        <p>{{tvshow.plot}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns is-mobile is-multiline scrolling-wrapper-flexbox">
            <ArtistComp
            v-for="artist in tvshow.roles"
            v-bind:key="artist.artistId"
            v-bind:artist="artist"/>
        </div>
        <div class="columns is-mobile is-multiline scrolling-wrapper-flexbox">
            <SeasonComp
            v-for="season in tvshow.seasons"
            v-bind:key="season.seasonId"
            v-bind:season="season"/>
        </div>
    </div>
    <p style="margin-bottom: 50px;" role="contentinfo">&nbsp;</p>
</template>

<script>
// import component
import { svrURL } from '@/constants';
import ArtistComp from '@/components/ArtistComp.vue';
import SeasonComp from '@/components/SeasonComp.vue';

export default {
    name: 'DetailsView',
    components: {
        ArtistComp,
        SeasonComp,
    },
    data() {
        return {
            tvshow: null,
        };
    },
    computed: {
    },
    methods: {
        async getTvShow() {
            try {
                const response = await fetch(`${svrURL}/tvshow?tvshowId=${this.$route.params.id}`);
                const json = await response.json();
                this.tvshow = json;
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.getTvShow();
    },
};
</script>

<style scoped>
.scrolling-wrapper-flexbox {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
}
.columns:last-child {
    margin-bottom: -0.75rem;
}
</style>
