<template>
  <div class="videos">
    <van-nav-bar title="影视" />
    <div class="tank">
      <div class="tank-box" ref="videosbox" @scroll="lazyLoad">
        <div
          class="list fl"
          v-for="(item,index) in videosData.data.subjects"
          :key="index"
          @click="getto({name: 'details', params: {id: item.id}})"
          ref="videositem"
        >
          <div class="pho">
            <van-image class="auto-img" :src="item.images.small" alt>
              <template v-slot:error>
                <img class="auto-img" src="../../assets/image/404.jpg" alt />
              </template>
            </van-image>
          </div>
          <div class="list-t">
            <div class="info">
              <div class="time fl"></div>
              <div class="grade fr">{{item.rating.average}}</div>
            </div>
            <div>
              <h3 class="one-text">{{item.title}}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("videosModule");

export default {
  name: "videos",

  computed: {
    ...mapState([
      "isHas",
      "isInit",
      "isInitial",
      "params",
      "videosData",
      "vidosBoxData"
    ])
  },

  methods: {
    isInitData() {
      if (this.isInit) {
        let videosbox = this.$refs.videosbox;
        console.log("videosbox ==> ", videosbox);

        let videosboxH = videosbox.clientHeight;
        console.log("videosboxH ==> ", videosboxH);

        this.$store.commit("videosModule/changevidosBox", {
          videosbox,
          videosboxH
        });
      }
    },

    getVideosData() {
      let self = this;

      this.$toast.loading({
        duration: 0,
        message: "加载中..."
      });

      this.axios({
        methods: "GET",
        url: "https://douban.uieee.com/v2/movie/top250",
        params: this.params
      })
        .then(result => {
          console.log(" result ==>> ", result);
          this.isInitData();
          this.$store.commit("videosModule/videosData", result);
          this.$toast.clear();
        })
        .catch(err => {
          this.$toast.clear();
        });
    },
    lazyLoad() {
      let self = this;

      if (!self.isHas) {
        return;
      }

      let timer = setTimeout(function() {
        for (let i = 1; i < self.vidosBoxData.timers.length; i++) {
          clearTimeout(self.vidosBoxData.timers[i]);
        }

        let videositem =
          self.$refs.videositem[self.$refs.videositem.length - 1];
        console.log("videositem ==> ", videositem);
        // pingitem 的 全部样式
        let videositemStyle = videositem.getBoundingClientRect();
        console.log("videositemStyle ==> ", videositemStyle);
        // videositem 的 距离可视区域顶部的距离
        let top = videositemStyle.top;
        console.log("top ==> ", top);

        let videositemH = videositemStyle.height;
        console.log("videositemH ==> ", videositemH);

        if (innerHeight - videositemH + 200 >= top) {
          // console.log("发起数据请求");
          // 发起数据请求
          self.getVideosData();
        }

        self.$store.state.videosModule.vidosBoxData.timers = [];
      }, 500);
      self.$store.state.videosModule.vidosBoxData.timers.push(timer);
    },
    getto(o) {
      this.$router.push(o);
    }
  },

  created() {
    this.getVideosData();
  }
};
</script>

<style lang="less" scoped>
.videos .tank {
  overflow: hidden;
  padding: 3px 3px 0px 3px;
  margin-bottom: 5px;
}

.tank-box {
  position: fixed;
  top: 48px;
  bottom: 50px;
  right: 0;
  left: 0;
  overflow-y: auto;
}

.list {
  width: calc(~"(100% - 10px) / 3");
  background: whitesmoke;
  box-sizing: border-box;
  padding: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
}

.list:nth-child(3n) {
  margin-right: 0;
}

.list .pho {
  width: 100%;
  height: 120px;
}
.list .list-t .info {
  overflow: hidden;
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
  color: orangered;
}

.list .list-t h3 {
  font-size: 18px;
  color: #07c160;
  text-align: center;
  margin: 5px 0;
}
</style>