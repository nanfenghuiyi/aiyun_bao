<template>
  <div
    class="container"
    v-loading="loading"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="share-main flex-column">
      <img id="share-img" class="share-img" :src="shareImg[imgIndex]" alt />
      <div id="android-rules" class="share-rules" v-if="isIOS">
        <router-link class="router_link" to="/rulesAndroid" target="_self">共享收益规则</router-link>
        <span>&gt;</span>
      </div>
      <div id="ios-rules" class="share-rules" v-else>
        <router-link class="router_link" to="/rulesIos" target="_self">共享业务收入规则</router-link>
        <span>&gt;</span>
      </div>
      <div class="share-recommend">
        <i></i>
        <span>马上邀请好友得奖励</span>
        <i></i>
      </div>
      <ul>
        <li>
          <i class="share-wechat">
            <img src="@/assets/Share/ico_share_wechat.png" alt />
          </i>
          <span>微信</span>
        </li>
        <li>
          <i class="share-friend">
            <img src="@/assets/Share/ico_share_friends.png" alt />
          </i>
          <span>朋友圈</span>
        </li>
        <li>
          <i class="share-qq">
            <img src="@/assets/Share/ico_share_qq.png" alt />
          </i>
          <span>QQ好友</span>
        </li>
        <li>
          <i class="share-zone">
            <img src="@/assets/Share/ico_share_qzone.png" alt />
          </i>
          <span>QQ空间</span>
        </li>
        <li>
          <i class="share-qr">
            <img src="@/assets/Share/ico_share_erweima.png" alt />
          </i>
          <span>二维码</span>
        </li>
        <li>
          <i class="share-card">
            <img src="@/assets/Share/ico_share_mingpian.png" alt />
          </i>
          <span>专属名片</span>
        </li>
      </ul>
      <router-link class="share-footer" to="/newRecommendedList">
        <span>查看已推荐的好友</span>
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </div>
    <!-- 我的分享 -->
    <!-- <div id="demo-model" class="none">
      <div class="model"></div>
      <div class="content">
        <div class="title">我的分享二维码</div>
        <span class="text-red">[爱运宝]</span>
        <span class="text-red">人人都会用到的全国性出行平台</span>
        <span>出行两公里以上</span>
        <span>全国同城快车、出租车、顺风车</span>
        <span>全国跨城顺风车、客运大巴车</span>
        <span>总有一种您可以用到</span>
        <span class="text-red">用[爱运宝]打车每单8.5折</span>
        <span class="text-red">单单都是最低价</span>
        <span>下载注册登录后，推荐亲友注册登录</span>
        <span class="text-red">您还可以获得即时现金奖励</span>
        <div id="qr_code" class="qr"></div>
        <span class="text-gray">打印二维码名片置于车内</span>
        <span class="text-gray">更方便您的推广</span>
        <span class="text-gray">
          详情可点击下方
          <span class="text-red">"专属名片"</span>
          了解
        </span>
        <img class="close" src="@/assets/Share/icon-close-gray.png" alt="qr" />
      </div>
    </div>
    <div id="share-demo-model" class="none">
      <div class="model"></div>
      <div class="content">
        <img src alt="demo" />
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      loadText: "图片上传中",
      param: [],

      shareImg: [
        require("@/assets/Share/share_ios_img.jpg"),
        require("@/assets/Share/share_android_img.jpg")
      ],
      imgIndex: 0,
      isIOS: false
    };
  },
  components: {},
  props: {},
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    var u = navigator.userAgent;
    console.log(u);
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
      this.isIOS = false;
      this.imgIndex = 0;
    } else {
      this.isIOS = true;
      this.imgIndex = 1;
    }
  }
};
</script>

<style lang="scss" scoped>
html,
body {
  overflow-y: hidden;
}
.share-main {
  width: 100%;
  height: 100%;
  background-color: #f1f2f3;
  .share-img {
    width: 100%;
  }
  .share-rules {
    width: 100%;
    text-align: center;
    font-size: 18px;
    padding: 4% 0;
    color: #333;
    .router_link {
      color: #333;
      padding: 0 8px;
    }
  }
  .share-recommend {
    width: 90%;
    text-align: center;
    font-size: 16px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .share-recommend i {
    flex: 1;
    height: 1px;
    background-color: #a6a3a3;
  }
  .share-recommend span {
    color: #666666;
    padding: 0 5px;
  }
  ul {
    flex: 1;
    display: flex;
    flex-direction: row;
    padding: 3% 3% 1% 3%;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      i {
        width: 50%;
        height: 30px;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        margin-bottom: 10px;
        img {
          width: 100%;
        }
      }
      span {
        font-size: 14px;
        color: #333;
        text-align: center;
        padding: 3% 0;
      }
    }
  }
  .share-footer {
    color: #7a7a7a;
    display: flex;
    flex-direction: row;
    background-color: #f5f5f5;
    align-items: center;
    font-size: 20px;
    padding: 4%;
  }
  .share-footer span {
    flex: 1;
    font-size: 18px;
  }
}
.demo-model {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  font-size: 0.28rem;
  top: 100%;
  /*top: 0;*/
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .model {
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .content {
    display: flex;
    flex-direction: column;
    width: 90%;
    background-color: #ffffff;
    border-radius: 0.2rem;
    align-items: center;
    justify-content: center;
    .title {
      width: 100%;
      text-align: center;
      color: #ffffff;
      background-color: #1fb1ff;
      font-size: 0.35rem;
      border-top-left-radius: 0.2rem;
      border-top-right-radius: 0.2rem;
      padding: 0.2rem 0;
    }
    span {
      text-align: center;
      font-size: 0.28rem;
      color: #000000;
      padding-top: 0.05rem;
    }
    .text-red {
      font-size: 0.3rem;
      color: #f20006;
    }
    .text-gray {
      font-size: 0.26rem;
      color: #666666;
    }
    .qr {
      width: 4rem;
      padding: 0.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .close {
      width: 0.4rem;
      margin: 0.2rem;
    }
  }
}
.share-demo-model {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  top: 100%;
  /*top: 0;*/
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .model {
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .content {
    display: flex;
    flex-direction: column;
    width: 75%;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
    }
  }
}
</style>
