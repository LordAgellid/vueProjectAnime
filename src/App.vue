<template>
    <div>
        <NavbarComp role="navigation"/>
        <router-view/>
    </div>
</template>

<script>

import { svrURL } from '@/constants';
import NavbarComp from './components/NavbarComp.vue';

export default {
    name: 'App',
    components: {
        NavbarComp,
    },
    methods: {
        logout() {
            sessionStorage.removeItem('authToken');
            this.$store.commit('setAuthToken', '');
            this.$store.state.history = [];
            this.$router.push('/');
        },
        getUserHistory() {
            const url = `${svrURL}/user/history`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.authToken}`,
                },
            };

            fetch(url, options)
                .then((response) => response.json())
                .then((data) => {
                    this.$store.state.history = data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.$store.commit('setAuthToken', sessionStorage.getItem('authToken'));
        if (this.$store.state.authToken) {
            this.getUserHistory();
        }
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
