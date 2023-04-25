import { createWebHashHistory, createRouter } from "vue-router";

// import pages and components
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import store from '@/store/index';

const routes = [
    {  path: "/login", name: "Login", component: Login,},
    {  path: "/signup", name: "SignUp", component: Register ,},
    {  path: "/", name: "Home", component: Home, },
    //addition in here
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});


export default router;
