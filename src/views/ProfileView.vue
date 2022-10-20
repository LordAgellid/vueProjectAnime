<template>
  <!-- eslint-disable -->
  <div class="section" role="form">
    <h1 class="title is-1 has-text-centered">Profile</h1>
      <div class="section error" v-if="this.afficherErrors">
        <p class="title" v-if="listErrors.errorUsernameLength">
          Username doit conteniir au moins 5 caractères et au maximum 20 
        </p>
        <p class="title" v-if="listErrors.errorUsername">
          les caractères permis pour le username sont A-Z, a-z, 0-9, - et _ 
        </p>
        <p class="title" v-if="listErrors.errorEmail">
          courriel doit contenir un @ et un . 
        </p>
        <p class="title" v-if="listErrors.errorEmailLength">
          Email doit contenir au moins 4 caractères
        </p>
        <p class="title" v-if="listErrors.errorPassword">
          le mot de passe doit contenir au moins 6 caractères 
        </p>
        <p class="title" v-if="listErrors.errorPasswordConfirm">
          Le mot de passe de confirmation doit être identique au mot de passe 
        </p>
        <p class="title" v-if="this.listErrors.error">
          Erreur
        </p>
      </div>
    <div class="field">
      <label class="label" for="email" aria-describedby="email">Email</label>
      <div class="control has-icons-left has-icons-right">
        <input id="email" class="input" type="email" placeholder="e1234567@site.com" v-model="email" aria-required>
        <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>
      </div>
    </div>
    <div class="field">
      <label class="label" for="username" aria-describedby="username">Username</label>
      <div class="control has-icons-left">
        <input id="username" autocomplete="username" class="input" placeholder="e1234567" v-model="username" aria-required>
        <span class="icon is-small is-left"><i class="fas fa-user"></i></span>
      </div>
      <p class="help is-success">Le username doit contenir au moins 5 caractères et au maximum 20. Les caractères permis pour le username sont A-Z, a-z, 0-9, et le charactère souligné.</p>
    </div>
    <div class="field">
      <label class="label" for="password" aria-describedby="password">Mot de passe</label>
      <div class="control has-icons-left">
        <input id="password" autocomplete="password" class="input" placeholder="*******" type="password" v-model="password" aria-required>
        <span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
      </div>
      <p class="help is-success">Le mot de passe doit contenir au moins 6 caractères.</p>
    </div>
    <div class="field">
        <label class="label" for="password" aria-describedby="password">Confirmation mot de passe</label>
        <div class="control has-icons-left">
        <input id="passwordConfirm" autocomplete="password" class="input" placeholder="*******" type="password" v-model="passwordConfirm" aria-required>
        <span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
        </div>
        <p class="help is-success">Le mot de passe de confirmation doit être identique au précédent.</p>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-success" @click="validateInputs">Mettre à jour</button>
      </div>
      <div class="control">
        <button class="button is-danger" @click="cancel">Annuler</button>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-danger" @click="supprimer">Supprimer le profil</button>
      </div>
    </div>
  </div>
  <p style="margin-bottom: 50px;" role="contentinfo">&nbsp;</p>
</template>

<script>
// import component
import { svrURL } from '@/constants';

export default {
    name: 'ProfileView',
    components: {
    },
    data() {
        return {
            email: '',
            username: '',
            password: '',
            passwordConfirm: '',
            listErrors: {
                errorEmail: false,
                errorEmailLength: false,
                errorUsername: false,
                errorUsernameLength: false,
                errorPassword: false,
                errorPasswordConfirm: false,
                error: false,
            },
            afficherErrors: false,

        };
    },
    mounted() {
        if (this.$store.state.authToken === '' || this.$store.state.authToken === null) {
            this.$router.push('/');
        }

        this.getInfo();
    },
    methods: {
        validateEmail() {
            const re = /[\w\d._]+@[\w\d._]+\.[\w]{2,}$/;
            const reLength = /[\w\d\S]{6,30}/g;
            if (!re.test(this.email)) {
                this.listErrors.errorEmail = true;
            } else {
                this.listErrors.errorEmail = false;
            }

            if (!reLength.test(this.email)) {
                this.listErrors.errorEmailLength = true;
            } else {
                this.listErrors.errorEmailLength = false;
            }
        },
        validateUsername() {
            const regex = /^[a-zA-Z0-9_]+$/;
            const regexLength = /[\w\d\S]{6,30}/;
            if (!regex.test(this.username)) {
                this.listErrors.errorUsername = true;
            } else {
                this.listErrors.errorUsername = false;
            }

            if (!regexLength.test(this.username)) {
                this.listErrors.errorUsernameLength = true;
            } else {
                this.listErrors.errorUsernameLength = false;
            }
        },
        validatePassword() {
            const regex = /[\w\d\S]{6,30}/g;
            this.listErrors.errorPassword = !regex.test(this.password);
        },
        validatePasswordConfirm() {
            if (this.passwordConfirm === this.password) {
                this.listErrors.errorPasswordConfirm = false;
            } else {
                this.listErrors.errorPasswordConfirm = true;
            }
        },
        getInfo() {
            const url = `${svrURL}/user`;
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
                    this.email = data.email;
                    this.username = data.username;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        updateInfo() {
            const formData = {
                email: this.email,
                username: this.username,
                password: this.password,
            };
            const url = `${svrURL}/user`;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.$store.state.authToken}`,
                },
                body: JSON.stringify(formData),
            };
            fetch(url, options)
                .then((response) => {
                    if (response.status === 200) {
                        this.$router.push('/');
                        this.afficherErrors = false;
                        this.listErrors.error = false;
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.afficherErrors = true;
                    this.listErrors.error = true;
                });
        },
        supprimer() {
            // confirm this action with an alert
            /* eslint-disable */
            if (confirm('Voulez-vous supprimer votre compte ?')) {
                const url = `${svrURL}/user`;
                const options = {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${this.$store.state.authToken}`,
                    },
                };
                // console.log(options);
                fetch(url, options)
                    .then((response) => {
                        // eslint-disable-next-line
                  if (response.status === 200) {
                            this.$store.commit('setAuthToken', '');
                            this.$router.push('/');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        this.afficherErrors = true;
                        this.listErrors.error = true;
                    });
            }
        },
        validateInputs() {
            this.validateEmail();
            this.validateUsername();
            this.validatePassword();
            this.validatePasswordConfirm();
            // eslint-disable-next-line max-len
            if (this.listErrors.errorUsername || this.listErrors.errorUsernameLength || this.listErrors.errorEmail || this.listErrors.errorEmailLength || this.listErrors.errorPassword || this.listErrors.errorPasswordConfirm) {
                this.afficherErrors = true;
            } else {
                this.updateInfo();
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
