<template>
  <!-- eslint-disable -->
  <div class="section" role="form">
    <h1 class="title is-1 has-text-centered">SignUp</h1>
      <div class="section error" v-if="this.afficherErrors">
        <p class="is-size-5" v-if="listErrors.errorEmail">Le courriel doit contenir le symbole @.</p>
        <p class="is-size-5" v-if="listErrors.errorEmailLength">Le courriel doit contenir plus de 4 caractères.</p>
        <p class="is-size-5" v-if="listErrors.errorUsernameLength">Le username doit contenir au moins 5 caractères et au maximum 20.</p>
        <p class="is-size-5" v-if="listErrors.errorUsername">Les caractères permis pour le username sont A-Z, a-z, 0-9, et le charactère souligné.</p>
        <p class="is-size-5" v-if="listErrors.errorPassword">Le mot de passe doit contenir au moins 6 caractères.</p>
        <p class="is-size-5" v-if="listErrors.errorPasswordConfirm">Le mot de passe de confirmation doit être identique au précédent.</p>
      </div>
    <div class="field">
      <label class="label" for="email">Email</label>
      <div class="control has-icons-left has-icons-right">
        <input id="email" class="input" type="email" placeholder="e1234567@site.com" v-model="email">
        <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>
      </div>
    </div>
    <div class="field">
      <label class="label" for="username">Username</label>
      <div class="control has-icons-left">
        <input id="username" autocomplete="username" class="input" placeholder="e1234567" v-model="username">
        <span class="icon is-small is-left"><i class="fas fa-user"></i></span>
      </div>
      <p class="help is-success">Le username doit contenir au moins 5 caractères et au maximum 20. Les caractères permis pour le username sont A-Z, a-z, 0-9, et le charactère souligné.</p>
    </div>
    <div class="field">
      <label class="label" for="password">Mot de passe</label>
      <div class="control has-icons-left">
        <input id="password" autocomplete="password" class="input" placeholder="*******" type="password" v-model="password">
        <span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
      </div>
      <p class="help is-success">Le mot de passe doit contenir au moins 6 caractères.</p>
    </div>
    <div class="field">
      <label class="label" for="password">Confirmation mot de passe</label>
      <div class="control has-icons-left">
        <input id="passwordConfirm" autocomplete="password" class="input" placeholder="*******" type="password" v-model="passwordConfirm">
        <span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-success" @click="register">S'inscrire</button>
      </div>
      <div class="control">
        <button class="button is-danger" @click="cancel">Annuler</button>
      </div>
    </div>
  </div>
  <p style="margin-bottom: 50px;">&nbsp;</p>
</template>

<script>
// import component
import { svrURL } from '@/constants';

export default {
    name: 'SignUpView',
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
        submit() {
            const data = {
                email: this.email,
                username: this.username,
                password: this.password,
            };
            const url = `${svrURL}/auth/register`;
            const options = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            fetch(url, options)
                .then((response) => {
                    if (response.status === 201) {
                        this.$router.push('/login');
                        this.afficherErrors = false;
                        this.$router.push('/');
                    } else if (response.status === 400) {
                        this.listErrors.error = true;
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.listErrors.error = true;
                });
        },
        register() {
            this.validateUsername();
            this.validateEmail();
            this.validatePassword();
            this.validatePasswordConfirm();
            // eslint-disable-next-line
            if (this.listErrors.errorUsername || this.listErrors.errorUsernameLength || this.listErrors.errorEmail || this.listErrors.errorEmailLength || this.listErrors.errorPassword || this.listErrors.errorPasswordConfirm) {
                this.afficherErrors = true;
            } else {
                this.submit();
            }
        },

    },
    cancel() {
        this.$router.push('/');
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
