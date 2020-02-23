import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

import VueAxios from 'vue-axios'

import {
  Tabbar,
  TabbarItem,
  Button,
  NavBar,
  Lazyload,
  Search,
  Swipe,
  SwipeItem,
  Image,
  Toast,
  Cell,
  CellGroup,
  Icon,
  Tab,
  Tabs  
} from 'vant'

import 'lib-flexible/flexible'

Vue.use(VueAxios,axios)

Vue
  .use(Tabbar)
  .use(TabbarItem)
  .use(Button)
  .use(NavBar)
  .use(Lazyload)
  .use(Search)
  .use(Swipe)
  .use(SwipeItem)
  .use(Image)
  .use(Toast )
  .use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
  
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
