<template>
  <div class="index">
    <!-- 二级路由 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <van-tabbar v-model="active" active-color="#07c160">
      <van-tabbar-item
        v-for="(item, index) in tabbarData"
        :key="index"
        :name="item.name"
        @click="togglePage({name: item.name}) "
      >
        <span>{{item.title}}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? tabbarData[index].icon.active : tabbarData[index].icon.inactive"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("indexModule");

export default {
  name: "index",
  data() {
    return {
      active: "home"
    };
  },

  computed: {
    ...mapState(["tabbarData"])
  },

  methods: {
    togglePage(o) {
      this.$router.push(o);
    }
  },

  created() {
    this.active = this.$route.name;
  }
};
</script>

<style lang="less" >
.van-nav-bar {
  box-shadow: 0px 0px 5px 1px #999;
}

.van-nav-bar__title {
  color: #07c160;
  font-weight: bold;
}

.van-nav-bar .van-icon{
   color: #07c160;
}

.van-nav-bar__text{
   color: #07c160;
}
</style>
