import Vue from 'vue'
import App from './App'
import store from "./store/index";
import Public from './common/public.js'


import fileters from './common/filter';

Vue.prototype.$store = store;
Vue.prototype.$public = Public;
Vue.prototype.$filter = fileters;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
