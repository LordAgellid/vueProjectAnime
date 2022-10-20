<template>
    <div class="section">
        <h1 class="title is-1 has-text-centered">ABOUT</h1>

        <p class="subtitle">
            <strong>
            token :
            </strong>
            {{$store.state.authToken}}
            </p>
    </div>
</template>

<script>
export default {
    name: 'AboutView',
    data() {
        return {
        };
    },
    methods: {
    },
};
</script>
