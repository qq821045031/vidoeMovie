<template>
  <div class="search">
    <van-nav-bar title="搜索" left-text="返回" left-arrow @click-left="back" />
    <div class="search-box">
      <van-search placeholder="请输入搜索关键词" show-action shape="round">
        <div slot="action">搜索</div>
      </van-search>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",

  methods: {
    back() {
      this.$router.push({ name: "home" });
    },

    getSearch(value) {
      // console.log("value  ==> ", value);
      this.axios({
        methods: "GET",
        url: " https://douban.uieee.com/v2/movie/search?q=欧美&apikey=0b2bdeda43b5688921839c8ecb20399b"
      }).then(result => {
        console.log("result ==>> ", result);
      });
    }
  },

  created() {
    this.getSearch();
  }
};
</script>

<style lang="scss" scoped>

</style>