import Vue from 'vue'
import App from './App'
import store from "./store/index";
import './font/iconfont.css'

Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()