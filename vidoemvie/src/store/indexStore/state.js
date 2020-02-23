export const state = {
    tabbarData: [{
        name: 'home',
        title: '首页',
        icon: {
          active: require('../../assets/image/dian1.png'),
          inactive: require('../../assets/image/dian2.png'),
        },
      },
      {
        name: 'hotv',
        title: '热映',
        icon: {
          active: require('../../assets/image/hot1.png'),
          inactive: require('../../assets/image/hot0.png'),
        },
      },
      {
        name: 'videos',
        title: '影视',
        icon: {
          active: require('../../assets/image/s1.png'),
          inactive: require('../../assets/image/s0.png'),
        },
      },
      {
        name: 'mine',
        title: '我的',
        icon: {
          active: require('../../assets/image/w1.png'),
          inactive: require('../../assets/image/w0.png'),
        },
      },
    ]
  
  }