import Vue from 'vue'
import Vuex from 'vuex'

import {indexModule} from './indexStore/indexModule'
import {videosModule} from './videosStore/videosModule'
import {homeModule} from './homeStore/homeModule'
import {hotvModule} from './hotvStore/hotvModule'
import {detailsModule} from './detailsStore/detailsModule'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    indexModule,

    homeModule, videosModule,hotvModule,

    detailsModule
    
  },
 
})
