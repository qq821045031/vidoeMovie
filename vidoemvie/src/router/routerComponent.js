class RouterComponent {

    indexComponent(){
      return import('../views/Index.vue')
    }

    homeComponent(){
      return import('../views/indexConponent/Home.vue')
    }

    hotvComponent(){
      return import('../views/indexConponent/Hotv.vue')
    }

    videosComponent(){
      return import('../views/indexConponent/Videos.vue')
    }

    mineComponent(){
      return import('../views/indexConponent/Mine.vue')
    }

    dateilsComponent(){
      return import('../views/details.vue')
    }

    searchComponent(){
      return import('../views/search.vue')
    }

    contentComponent(){
      return import('../views/content.vue')
    }
}

export const routerComponent = new RouterComponent()