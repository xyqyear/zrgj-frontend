import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './assets/less/index.less'

import router from './router'
import store from './store'
import http from 'axios'
import '../api/mock.js'

<<<<<<< .mine
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


=======
//按需引入
import { Button, Select,Radio,Container,Aside,Header,Main,
Menu,Submenu,MenuItem,MenuItemGroup,Dropdown,DropdownMenu,DropdownItem,
Row,Col,Card,Table,TableColumn,Input,Popover,Tag,Dialog,
Collapse,Form,FormItem,Tabs,TabPane,InputNumber,CollapseItem,Drawer,Descriptions,DescriptionsItem,DatePicker,Alert,MessageBox, Message } from 'element-ui';
>>>>>>> .theirs

Vue.config.productionTip = false
Vue.use(CollapseItem);

Vue.prototype.$http = http
<<<<<<< .mine
Vue.prototype.$confirm = ElementUI.MessageBox.confirm
Vue.prototype.$message = ElementUI.Message
=======
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
>>>>>>> .theirs

router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  const token = store.state.user.token
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
