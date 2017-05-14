import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import store from "./store";
import VueResource from "vue-resource";
import Swiper from 'vue-awesome-swiper';

Vue.use(VueResource);
Vue.use(Swiper);
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
