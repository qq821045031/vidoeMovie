<template>
    <div class="mine">
        <div class="mines">
      <div class="mine-c">
        <div class="mine-pho">
          <img src alt />
        </div>
      </div>
      <div class="mine-s">
        <div class="username">
          阿斯蒂芬
        </div>
      </div>
    </div>
    <div class="mine-box">
      <div class="mining">
        <div class="user">
          <div class="user-box">
            <van-cell title="个人信息" icon="contact">
              <van-icon slot="right-icon" name="arrow" style="line-height: inherit;" />
            </van-cell>
            <van-cell title="设置" icon="setting-o">
              <van-icon slot="right-icon" name="arrow" style="line-height: inherit;" />
            </van-cell>
          </div>
        </div>
      </div>
    </div>
    <van-button round color="linear-gradient(to bottom, #6afab0, #006933)" block >退 出</van-button>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
.mine-c {
  position: relative;
  height: 150px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 2;
  background-image: linear-gradient(
    to right,
    #6afab0 8%,
    #07c160 70%,
    #006933 100%
  );
  .mine-pho {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: whitesmoke;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    box-shadow: 1px 1px 10px 5px #046131 ; 
    overflow: hidden;
  }
}
.mine-s {
  width: 100%;
  height: 150px;
  border-radius: 50%;
  background-image: linear-gradient(
    to right,
    #6afab0 8%,
    #07c160 70%,
    #006933 100%
  );
  position: absolute;
  top: 75px;
  left: 0;
  z-index: 1;
  .username {
    line-height: 200px ;
    text-align: center ;
    font-size: 20px ; 
  }
}

.mine-box {
  background: whitesmoke;
  .mining {
    position: relative;
  }
  .user {
    position: absolute;
    left: 0px;
    top: 90px;
    width: 100%;
    border-radius: 10px;
    background: whitesmoke;
    overflow: hidden;
  }
  .user-box {
    overflow: hidden;
    .van-cell {
      font-size: 18px;
    }
    .van-cell__left-icon {
      margin-right: 0.3333rem;
      font-size: 23px;
    }
  }
}
.van-button--hairline.van-button--round::after,
.van-button--round {
  position: absolute;
  bottom: 70px;
  left: 0;
  margin-top: 180px;
  font-size: 18px;
}
</style>