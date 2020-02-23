import {
  routerComponent
} from './routerComponent'
export const routes = [
  {
    path: '/index',
    name: 'index',
    component: routerComponent.indexComponent,
    children: [{
      path: '/home',
      name: 'home',
      component: routerComponent.homeComponent
    },
    {
      path: '/hotv',
      name: 'hotv',
      component: routerComponent.hotvComponent
    },
    {
      path: '/videos',
      name: 'videos',
      component: routerComponent.videosComponent
    },
    {
      path: '/mine',
      name: 'mine',
      component: routerComponent.mineComponent
    }]
  },
  {
    path: '/details',
    name: 'details',
    component: routerComponent.dateilsComponent
  },
  {
    path: '/search',
    name: 'search',
    component: routerComponent.searchComponent
  },
  {
    path: '/content',
    name: 'content',
    component: routerComponent.contentComponent
  },
  {
    path: '*',
    redirect: {
      name: 'home'
    }
  }
]
