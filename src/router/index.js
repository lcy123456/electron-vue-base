import Vue from "vue";
import Router from "vue-router";
const LandingPage = () => import("@/components/LandingPage.vue");

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "landing-page",
            component: LandingPage,
        },
    ],
});
