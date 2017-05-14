import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Recommend from "./components/recommend/recommend.vue";
import Rank from "./components/rank/rank.vue";
import Sheet from "./components/sheet/sheet.vue";

const routes = [
    {path:"/recommend", component: Recommend},
    {path:"/rank", component: Rank},
    {path:"/sheet", component: Sheet},
    {path:"/", redirect: "/recommend"},
    {path:"*", redirect: "/recommend"}
]

export default new VueRouter({
    routes
});