<template>
    <div class="section error has-text-centered" v-if="this.$store.state.authToken === null">
        <p class="is-size-5">Vous devez être connecté pour accéder à cette page.</p>
        <a href="/login">Se connecter</a>
    </div>
    <div v-else role="main">
        <section class="hero video">
            <video controls v-bind:src="videoURL" type="video/mp4">
            </video>
        </section>
        <!-- <div class="section has-text-centered video">
        </div> -->
    </div>
</template>

<script>
// import component
import { svrURL } from '@/constants';

export default {
    name: 'JouerEpisodeView',
    components: {
    },
    data() {
        return {
            videoURL: null,
        };
    },
    computed: {
    },
    methods: {
        async viewEpisode() {
            const url = `${svrURL}/viewepisode?episodeId=${this.$route.params.id}`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.authToken}`,
                },
            };

            await fetch(url, options)
                .then((response) => response.json())
                .then((data) => {
                    this.videoURL = data.videoURL;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.viewEpisode();
    },
};
</script>

<style scoped>
  .error {
    background-color: #fdd;
    border: 1px solid #f00;
    padding: 1rem;
  }
</style>
