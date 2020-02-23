<template>
  <div class="home">
    <van-nav-bar title="首页" />
    <van-search placeholder="请输入搜索关键词" show-action shape="round" @focus="getto({name: 'search'})">
      <div slot="action">搜索</div>
    </van-search>
    <div class="tank">
      <div class="banner-box">
        <div class="banner">
          <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item>
              <img
                class="auto-img"
                src="http://uploads.5068.com/allimg/141209/39-1412091K411.jpg"
                alt
              />
            </van-swipe-item>
            <van-swipe-item>
              <img
                class="auto-img"
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576145049762&di=3044bff134c3f74f41861cbc0a2feaf5&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F4%2F543c9a8d7cdfe.jpg"
                alt
              />
            </van-swipe-item>
            <van-swipe-item>
              <img
                class="auto-img"
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576145459619&di=24f1e900198e853f13780e981bf2d733&imgtype=0&src=http%3A%2F%2Fpic.3h3.com%2Fup%2F2016-11%2F20161125163120986080.jpg"
                alt
              />
            </van-swipe-item>
            <van-swipe-item>
              <img
                class="auto-img"
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576146542283&di=78e85f0c37210009a971c13017436721&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3231604888%2C2439860271%26fm%3D214%26gp%3D0.jpg"
                alt
              />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="overall">
        <div class="tank-box">
          <div class="tank-text">
            <h3>正在热映</h3>
          </div>
          <div class="tank-list">
            <div class="list fl" v-for="(item,index) in homeHotData.data.subjects" :key="index"
             @click="getto({name: 'details', params: {id: item.id}})">
              <div class="pho">
                <van-image class="auto-img" :src="item.images.small" alt>
                  <template v-slot:error>
                    <img class="auto-img" src="../../assets/image/404.jpg" alt />
                  </template>
                </van-image>
              </div>
              <div class="list-t">
                <div class="info">
                  <div></div>
                  <div class="grade fr">
                    <span>{{item.rating.average}}</span> 分
                  </div>
                </div>
                <div>
                  <h3 class="one-text">{{item.title}}</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="mone" @click="getto({name:'hotv'})">
            <h3>查看更多</h3>
          </div>
        </div>
        <div class="tank-box">
          <div class="tank-text">
            <h3>影视</h3>
          </div>
          <div class="tank-list">
            <div class="list fl" v-for="(item,index) in homevData.data.subjects" :key="index"
             @click="getto({name: 'details', params: {id: item.id}})">
              <div class="pho">
                <van-image class="auto-img" :src="item.images.small" alt>
                  <template v-slot:error>
                    <img class="auto-img" src="../../assets/image/404.jpg" alt />
                  </template>
                </van-image>
              </div>
              <div class="list-t">
                <div class="info">
                  <div></div>
                  <div class="grade fr">
                    <span>{{item.rating.average}}</span> 分
                  </div>
                </div>
                <div>
                  <h3 class="one-text">{{item.title}}</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="mone" @click="getto({name:'videos'})">
            <h3>查看更多</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("homeModule");

export default {
  name: "home",

  computed: {
    ...mapState(["homeHotData", "homevData"])
  },

  created() {
    this.$toast.loading({
      duration: 0,
      message: "加载中..."
    });

    this.axios({
      methods: "GET",
      url: "https://douban.uieee.com/v2/movie/in_theaters"
    })
      .then(result => {
        console.log("result =>> ", result);
        this.$store.commit("homeModule/getHomeHot", result);
      })
      .catch(err => {
        this.$toast.clear();
      });

    this.axios({
      methods: "GET",
      url: "https://douban.uieee.com/v2/movie/top250",
      params: this.params
    })
      .then(results => {
        console.log(" results ==>> ", results);
        this.$store.commit("homeModule/getHomeV", results);
        this.$toast.clear();
      })
      .catch(err => {
        this.$toast.clear();
      });
  },

  methods:{
    getto(o){
      this.$router.push(o);
    }
  }
};
</script>

<style lang="less" scoped>
.home .tank {
  position: fixed;
  top: 100px;
  bottom: 50px;
  right: 0;
  left: 0;
  overflow-y: auto;
}

.banner-box {
  background-color: #fff;
  padding: 10px;
}

.banner {
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
}

.overall {
  padding: 3px;
}

.tank-box {
  background: white;
  padding: 5px 3px;
  border-radius: 10px;
  margin-top: 8px;
  overflow: hidden;
}

.tank-box .tank-list {
  overflow: hidden;
}

.tank-box .tank-text h3 {
  text-align: center;
  color: #07c160;
  font-size: 18px;
  margin: 5px 3px;
  padding-bottom: 8px;
  border-bottom: 1px solid #474747;
}

.tank-box .list {
  width: calc(~"(100% -10px) / 3");
  padding: 3px;
  box-sizing: border-box;
}

.tank-box .list .pho {
  height: 175px;
}

.tank-box .mone {
  text-align: center;
  color: #07c160;
  font-size: 16px;
  font-weight: bold;
  border-top: 1px solid #474747;
}

.tank-box .mone h3 {
  margin: 8px;
}

.tank-box .list-t .info {
  overflow: hidden;
}

.tank-box .list-t .info .grade {
  color: orangered;
  font-size: 18px;
  font-weight: bold;
  margin-right: 8px;
}

.tank-box .list-t h3 {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
}
</style>
