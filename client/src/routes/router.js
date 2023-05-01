import { createWebHistory, createRouter } from "vue-router";

// import pages and components
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Deposit from '../pages/Deposit.vue';
import Cart from '../pages/Cart.vue';
import StudentInfo from '../pages/StudentInfo.vue';
// import EditInfo from '../components/EditInfo.vue';
// import PurchaseHistory from '../pages/PurchaseHistory.vue';
//create a page called MyCourses
import store from '@/store/index';

const routes = [
    {  path: "/", name: "Home", component: Home},
    {  path: "/login", name: "Login", component: Login},
    {  path: "/signup", name: "SignUp", component: Register},
    {  path: "/deposit", name: "Deposit", component: Deposit},
    {  path: "/student/info", name: "StudentInfo", component: StudentInfo},
    {  path: "/cart", name: "Cart", component: Cart},
    // {  path: "/editinfo", name: "EditInfo", component: EditInfo},
    // {  path: "/purchase/history", name: "PurchaseHistory", component: PurchaseHistory},
    // {  path: "/signup", name: "SignUp", component: Register},
    //addition in here
]

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;
