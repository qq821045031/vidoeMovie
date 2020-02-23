<template>
  <div class="hotv">
    <van-nav-bar title="热映" />
    <div class="tank">
      <div class="tank-box" ref="hotbox" @scroll="lazyLoad">
        <div
          class="list"
          v-for="(item,index) in HotData.data.subjects"
          :key="index"
          ref="hotitem"
          @click="getto({name: 'details', params: {id: item.id}})"
        >
          <div class="pho fl">
            <van-image class="auto-img" :src="item.images.small" alt>
              <template v-slot:error>
                <img class="auto-img" src="../../assets/image/404.jpg" alt />
              </template>
            </van-image>
          </div>
          <div class="list-info fl">
            <div>
              <h1 class="one-text">{{item.title}}</h1>
            </div>
            <div class="info">
              <div class="num one-text">
                <div class="fl ls one-text">{{item.durationInfo}}</div>
                <div class="fr rs">
                  <span>{{item.rating.average}}</span>分
                </div>
              </div>
              <div class="clas one-text">{{item.genresInfo}}</div>
              <div class="name one-text">{{item.avatarsInfo}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("hotvModule");

export default {
  name: "hotv",

  computed: {
    ...mapState([
      "HotData",
      "params",
      "isHas",
      "isInit",
      "isInitial",
      "hotBoxData"
    ])
  },

  methods: {
    isInitData() {
      if (this.isInit) {
        let hotbox = this.$refs.hotbox;
        console.log("hotbox ==> ", hotbox);

        let hotboxH = hotbox.clientHeight;
        console.log("hotboxH ==> ", hotboxH);

        this.$store.commit("hotvModule/changeHotBox", {
          hotbox,
          hotboxH
        });
      }
    },

    getto(o) {
      this.$router.push(o);
    },
    getHotData() {
      let self = this;

      this.$toast.loading({
        duration: 0,
        message: "加载中..."
      });

      this.axios({
        methods: "GET",
        url: "https://douban.uieee.com/v2/movie/in_theaters",
        params: this.params
      })
        .then(result => {
          console.log(" result ==>> ", result);

          result.data.subjects.forEach(v => {
            v.genresInfo = v.genres.join(" / ");

            v.durationInfo = v.durations.join(" / ");

            v.avatarsInfo = "";

            v.casts.forEach(item => {
              v.avatarsInfo += item.name + " / ";
            });

            v.avatarsInfo = v.avatarsInfo.slice(0, -3);
          });

          this.isInitData();
          this.$store.commit("hotvModule/changeHotData", result);
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
        for (let i = 1; i < self.hotBoxData.timers.length; i++) {
          clearTimeout(self.hotBoxData.timers[i]);
        }

        let hotitem = self.$refs.hotitem[self.$refs.hotitem.length - 1];
        console.log("hotitem ==> ", hotitem);
        // pingitem 的 全部样式
        let hotitemStyle = hotitem.getBoundingClientRect();
        console.log("hotitemStyle ==> ", hotitemStyle);
        // videositem 的 距离可视区域顶部的距离
        let top = hotitemStyle.top;
        console.log("top ==> ", top);

        let hotitemH = hotitemStyle.height;
        console.log("hotitemH ==> ", hotitemH);

        if (innerHeight - hotitemH + 200 >= top) {
          // console.log("发起数据请求");
          // 发起数据请求
          self.getHotData();
        }

        self.$store.state.hotvModule.hotBoxData.timers = [];
      }, 500);
      self.$store.state.hotvModule.hotBoxData.timers.push(timer);
    }
  },
  created() {
    this.getHotData();
  }
};
</script>

<style lang="less" scoped>
.tank-box {
  position: fixed;
  top: 48px;
  bottom: 50px;
  right: 0;
  left: 0;
  overflow-y: auto;
}

.tank .list {
  width: 100%;
  background: white;
  overflow: hidden;
  margin-bottom: 3px;
}
.tank .pho {
  width: calc(~"(100% - 10px ) / 3 ");
  margin-right: 3px;
}
.tank .list-info {
  width: 66%;
  text-align: center;
}

.tank .list-info .info {
  font-size: 16px;
  font-weight: bold;
}

.tank .list-info .info .num {
  overflow: hidden;
}

.tank .list-info .info .num .ls {
  width: 70%;
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  line-height: 44px;
}

.tank .list-info .info .num .rs {
  width: 30%;
  font-size: 16px;
  overflow: hidden;
}

.tank .list-info .info .num span {
  font-size: 30px;
  font-weight: bold;
  color: orangered;
}

.tank .list-info .info .clas {
  padding: 5px 0;
}

.tank .list-info .info .name {
  padding: 5px 0;
}
</style>