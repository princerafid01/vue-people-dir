import Vue from 'vue'
import App from './App.vue'
// import Test from './components/test'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '', component: App },
    { path: '/:number', component: App },
    // { path: '/test/:number', component: Test }
   ]
})

new Vue({
  vuetify,
  router,
  ...App,
  el: '#app'
})
