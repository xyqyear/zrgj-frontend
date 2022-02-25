import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './assets/less/index.less'

import router from './router'
import store from './store'
import http from 'axios'
import '../api/mock.js'
 //全引入element的包
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

//按需引入
import { Button, Select,Radio,Container,Aside,Header,Main,
Menu,Submenu,MenuItem,MenuItemGroup,Dropdown,DropdownMenu,DropdownItem,
Row,Col,Card,Table,TableColumn,Input,Popover,Tag,Dialog } from 'element-ui';

Vue.config.productionTip = false
//全引入element的包
//Vue.use(ElementUI);
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
// Vue.component(Radio.name, Radio);
Vue.use(Radio);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Input);
Vue.use(Popover);
Vue.use(Tag);
Vue.use(Dialog);


Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

