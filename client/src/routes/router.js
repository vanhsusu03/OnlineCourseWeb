import { createWebHashHistory, createRouter } from "vue-router";

// import pages and components
import Home from './pages/Home.vue';




import store from '@/store/index';

const routes = [
    {  path: "/", name: "Home", component: Home }
    //addition in here
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});


export default router;