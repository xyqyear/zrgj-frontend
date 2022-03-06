import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './assets/less/index.less'

import router from './router'
import store from './store'
import http from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)



Vue.config.productionTip = false
// Vue.use(CollapseItem);

Vue.prototype.$http = http
Vue.prototype.$confirm = ElementUI.MessageBox.confirm
Vue.prototype.$message = ElementUI.Message

router.beforeEach((to,from,next)=>{
  const token = localStorage.getItem("token")
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
