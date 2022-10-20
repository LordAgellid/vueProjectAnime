import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import SignUpView from '@/views/SignUpView.vue';
import ProfileView from '@/views/ProfileView.vue';
import DetailsView from '@/views/DetailsView.vue';
import SeasonEpisodesView from '@/views/SeasonEpisodesView.vue';
import DetailsEpisodeView from '@/views/DetailsEpisodeView.vue';
import JouerEpisodeView from '@/views/JouerEpisodeView.vue';
import HistoryView from '@/views/HistoryView.vue';
import AboutView from '@/views/AboutView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUpView,
    },
    {
        path: '/details/:id',
        name: 'details',
        component: DetailsView,
    },
    {
        path: '/season/:id',
        name: 'season',
        component: SeasonEpisodesView,
    },
    {
        path: '/episodedetails/:id',
        name: 'episodedetails',
        component: DetailsEpisodeView,
    },
    {
        path: '/playepisode/:id',
        name: 'playepisode',
        component: JouerEpisodeView,
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView,
    },
    {
        path: '/history',
        name: 'history',
        component: HistoryView,
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
    },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
