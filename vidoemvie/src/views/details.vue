<template>
  <div class="details">
    <div
      class="m-bg"
      :style="{'background-image': 'linear-gradient(to bottom, rgba(208,208,208, 0), rgba(208,208,208, .25) 40%, rgba(208,208,208, 1) 80%), url( ' + detailsData.images.large + ')'}"
    ></div>
    <div>
      <van-nav-bar :title="detailsData.title" left-text="返回" left-arrow @click-left="back" />
    </div>
    <div class="details-box">
      <div class="hear clearfix">
        <div class="detailsH clearfix">
          <div class="pho fl">
            <img class="auto-img" :src="detailsData.images.small" alt />
          </div>
          <div class="text-box fl">
            <h1 class="one-text">{{detailsData.title}}</h1>
            <div class="num">
              <div class="fl">
                <p class="one-text">{{detailsData.durationInfo}}</p>
              </div>
              <div class="fr one-text">
                <span>{{detailsData.rating.average}}</span> 分
              </div>
            </div>
            <p class="one-text">演员: {{detailsData.genresInfo}}</p>
            <van-button round color="linear-gradient(to bottom, #6afab0, #006933)" block>播 放</van-button>
          </div>
        </div>
        <div class="details-text">
          <p>详情:{{detailsData.summary}}</p>
        </div>
      </div>
      <div class="tab-box">
        <van-tabs v-model="tagActive" animated color="#6afab0">
          <van-tab title="影人信息">
            <div class="yanyuan">
              <div
                class="yanyuan-box clearfix"
                :style="{width: detailsData.casts.length * detailsData.w + 5 + 'px'}"
              >
                <div
                  ref="yanyuan"
                  class="yanyuan-item fl"
                  v-for="(item, index) in detailsData.casts"
                  :key="index"
                >
                  <div class="name-img">
                    <img class="auto-img" :src="item.avatars.small" alt />
                  </div>
                  <div class="name one-text">{{item.name}}</div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="电影剧照">
            <div class="vpho fl" v-for="(item, index) in detailsData.bloopers" :key="index">
              <img class="auto-img" :src="item.small" alt />
            </div>
          </van-tab>
          <van-tab title="热门评论">
            <div>热门评论</div>
          </van-tab>
        </van-tabs>
      </div>
      <div class="video-box">
        <div class="video-name">影视短片</div>
        <div class="video-item fl" v-for="(item, index) in detailsData.trailerurls" :key="index">
          <video
          class="auto-img"
            controls="controls"
            :src="item"
          ></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapMutations } = createNamespacedHelpers("detailsModule");

export default {
  name: "detail",

  data() {
    return {
      tagActive: 0
    };
  },

  computed: {
    ...mapState(["detailsData", "display", "likeActive"])
  },

  methods: {
    ...mapMutations(["changeDisplay", "resetState", "getdetailData"]),

    back() {
      this.$router.push({ name: "hotv" });
    }
  },

  created() {
    this.$toast.loading({
      duration: 0,
      message: "加载中..."
    });

    //重置state
    this.resetState();

    let id = this.$route.params.id;
    console.log("id ==>>> ", id);

    this.axios({
      methods: "GET",
      url: "https://douban.uieee.com/v2/movie/subject/" + id
    }).then(result => {
      console.log("result ==>> ", result);

      //将电影类型合并
      result.data.genresInfo = result.data.genres.join(" / ");

      result.data.durationInfo = result.data.durations.join(" / ");

      result.data.trailerurls = result.data.trailer_urls;
      console.log(" result.data.trailerurls  ==>> ",  result.data.trailerurls );
      //超过1000, 不足10000，以k显示，超过10000以w显示，不足1000，直接显示
      let comments = result.data.comments_count;

      result.data.comments =
        comments >= 10000
          ? (comments / 10000).toFixed(1) + "w"
          : comments >= 1000
          ? (comments / 1000).toFixed(1) + "k"
          : comments;

      //获取演员的图片盒子宽度
      result.data.w = 0;
      this.$store
        .dispatch("detailsModule/getdetailData", result.data)
        .then(() => {
          this.$toast.clear();
          let yanyuanBoxWidth = this.$refs.yanyuan[0].clientWidth;
          console.log("yanyuanBoxWidth ==>> ", yanyuanBoxWidth);

          this.$store.commit("detailsModule/changeW", yanyuanBoxWidth);
        });
    });
  }
};
</script>

<style lang="less" scoped>
.m-bg {
  position: fixed;
  top: 46px;
  bottom: 0;
  left: 0;
  right: 0;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  filter: blur(5px);
  // opacity: .95;
}

.details-box {
  width: 100%;
  position: fixed;
  top: 46px;
  bottom: 0px;
  left: 0;
  right: 0;
  padding: 8px;
  box-sizing: border-box;
  z-index: 2;
  overflow-y: auto;

  .hear {
    width: 100%;
    // border-radius: 10px;
    background: rgba(255, 255, 255, 0.8);
    overflow: hidden;
    .detailsH {
      border-bottom: 1px solid #999;
      .pho {
        width: 38%;
        margin: 5px 5px 5px 0;
      }
      .text-box {
        width: 60%;
        color: #e4393c;
        text-align: center;
        .fl {
          width: 65%;
          margin: 0;
          text-align: center;
          line-height: 50px;
        }
        .fr {
          width: 35%;
          margin: 0;
          font-size: 20px;
        }
        .fr span {
          color: orangered;
          font-size: 35px;
          font-weight: bold;
        }
        p {
          width: 100%;
          font-size: 18px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        .van-button {
          font-size: 18px;
        }
      }
    }
    .details-text {
      font-size: 16px;
      padding: 10px;
      text-indent: 2em;
      line-height: 22px;
    }
  }

  .name-img {
    border-radius: 5px;
    overflow: hidden;
  }
  .name {
    margin: 10px 0;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    color: #222;
  }
  .yanyuan {
    overflow-x: auto;
    overflow-y: hidden;
    margin-top: 10px;
  }
  .yanyuan-box {
    width: 120px;
  }
  .yanyuan-item {
    width: 100px;
    padding: 10px;
  }

  .tab-box {
    margin-top: 15px;
    background-color: rgb(255, 255, 255, 0.8);
  }

  .vpho {
    width: calc(~"(100% - 12px ) / 2 ");
    margin: 3px;
  }

  .video-box {
    overflow-y: auto;
    margin-top: 10px;
    background: white ;
  }

  .video-name{
     color: #07c160;
     text-align: center ;
     font-size: 18px ;
     padding: 5px 0 ;
     border-bottom: 1px solid #999 ;
  }
  .video-item {
    width: 100% ;
    padding: 10px;
    box-sizing: border-box ;
  }
}
</style>