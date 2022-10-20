import { createStore } from 'vuex';

export default createStore({
    state: {
        authToken: '',
        history: [],
    },
    getters: {
        getHistory(state) {
            return state.history;
        },
    },
    mutations: {
        setAuthToken(state, token) {
            state.authToken = token;
        },
        setHistory(state, history) {
            state.history = history;
        },
    },
    actions: {},
});
