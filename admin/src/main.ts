import Vue from 'vue'
import App from './App.vue'
import './plugins/element'
import './plugins/avue'
import router from './router'
import axios from 'axios'
import EleForm from 'vue-ele-form'

Vue.use(EleForm)

Vue.config.productionTip = false
Vue.config.devtools = true

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.prototype.$http = http
Vue.prototype.$httpajax = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
