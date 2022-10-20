<template>
    <nav class="navbar is-link">
        <div class="navbar-brand">
            <button class="navbar-burger" @click="burgerMenu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        <div id="navMenu" class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" href="/">TP2</a>
            </div>
            <div class="navbar-end" v-if="!this.$store.state.authToken == ''">
                <a class="navbar-item" href="/history">History</a>
                <a class="navbar-item" href="/profile">Profile</a>
                <a class="navbar-item" @click="this.$root.logout()" href="/">Logout</a>
                <a class="navbar-item" href="/about">About</a>
            </div>
            <div class="navbar-end" v-else>
                <a class="navbar-item" href="/signup">Sign Up</a>
                <a class="navbar-item" href="/login">Login</a>
                <a class="navbar-item" href="/about">About</a>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavbarComp',
};
</script>
