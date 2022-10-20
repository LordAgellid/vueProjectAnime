<template>
  <div class="section" role="form">
      <h1 class="title is-1 has-text-centered">Login</h1>
      <div class="section error" v-if="emptyUsername || emptyPassword || error">
        <p class="is-size-5" v-if="emptyUsername">Veuillez saisir le nom d'utilisateur.</p>
        <p class="is-size-5" v-if="emptyPassword">Veuillez saisir le mot de passe.</p>
        <p class="is-size-5" v-if="error">Mauvais nom d'utilisateur ou mot de passe.</p>
      </div>
      <div class="field">
        <label class="label" for="username" aria-describedby="username">Username</label>
        <div class="control has-icons-left">
          <!-- eslint-disable-next-line -->
          <input id="username" autocomplete="username" class="input" placeholder="e1234567"  v-model="username" aria-required>
          <span class="icon is-small is-left"><i class="fas fa-user"></i></span>
        </div>
      </div>
      <div class="field">
        <label class="label" for="password" aria-describedby="password">Mot de passe</label>
        <div class="control has-icons-left">
          <!-- eslint-disable-next-line -->
          <input id="password" autocomplete="password" class="input" placeholder="*******" type="password" required v-model="password" aria-required>
          <span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-success"
          v-on:click="login">
            Connexion</button>
        </div>
        <div class="control">
          <button class="button is-danger" @click="cancel">Annuler</button>
        </div>
      </div>
  </div>
  <p style="margin-bottom: 50px;" role="contentinfo">&nbsp;</p>
</template>

<script>
/* eslint-disable no-unused-expressions */
// import component
import { svrURL } from '@/constants';

export default {
    name: 'LoginView',
    components: {
    },
    data() {
        return {
            username: '',
            password: '',
            emptyUsername: false,
            emptyPassword: false,
            error: false,
        };
    },
    methods: {
        async login() {
            this.username === '' ? this.emptyUsername = true : this.emptyUsername = false;
            this.password === '' ? this.emptyPassword = true : this.emptyPassword = false;

            if (!this.emptyUsername && !this.emptyPassword) {
                const formData = { username: this.username, password: this.password };
                const headers = { 'Content-Type': 'application/json' };
                const url = `${svrURL}/auth/token`;
                const options = { method: 'POST', headers, body: JSON.stringify(formData) };

                try {
                    const response = await fetch(url, options);

                    if (response.status === 200) {
                        const data = await response.json();

                        sessionStorage.setItem('authToken', data.token);
                        this.$store.commit('setAuthToken', data.token);
                        // console.log(this.$store.state.authToken);
                        // this.$router.push('/');

                        localStorage.setItem('token', data.token);
                        this.$router.push('/');
                    } else {
                        this.error = true;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        },
        cancel() {
            this.$router.push('/');
        },
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
