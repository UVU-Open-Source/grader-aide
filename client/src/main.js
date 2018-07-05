// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

import 'vuetify/dist/vuetify.min.css';
import {
  Vuetify,
  VApp,
  VBtn,
  VIcon,
  VGrid,
  transitions,
  VCard
} from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// @ts-ignore
import App from './App'
import router from './router'
import store from './store'

// middleware
Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VIcon,
    VGrid,
    transitions,
    VCard
  }
})
Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
