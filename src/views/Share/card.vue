<template>
  <div
    class="container"
    v-loading="loading"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="card-main">
      <div class="card-example flex-row">
        <div class="example-item flex-column">
          <i class="card-face"></i>
          <span>正面示例</span>
        </div>
        <div class="example-item flex-column">
          <i class="card-back"></i>
          <span>背面示例</span>
        </div>
      </div>
      <h2>1.专属名片是什么</h2>
      <p>专属名片是包含您推广二维码的名片，新用户通过扫描您的推广二维码注销下载使用爱运宝后，您可永久获得该用户行程费用的一部分业务收入</p>
      <p id="ios-rules">
        <a class="rules" href="./rulesIos.html">共享业务收入规则 &gt;</a>
      </p>
      <p id="android-rules">
        <a class="rules" href="./rulesAndroid.html">共享收益规则 &gt;</a>
      </p>
      <h2>2.专属名片怎么使用</h2>
      <p>a）打印成一张宣传单（较大尺寸）粘贴在车内，乘客即时扫码注册</p>
      <p>b）打印多张名片（普通名片尺寸）分发给乘客，乘客稍后扫码注册</p>
      <h2>3.立即获得专属名片</h2>
      <p>将名片分享给打印店职员，按需打印即可</p>
      <ul>
        <li>
          <i class="share-wechat">
            <img src="@/assets/Share/ico_share_wechat.png" alt />
          </i>
          <span>微信分享名片</span>
        </li>
        <li>
          <i class="share-qq">
            <img src="@/assets/Share/ico_share_qq.png" alt />
          </i>
          <span>QQ分享名片</span>
        </li>
      </ul>
      <p>
        <a href="cardGuide.html" class="guide">名片使用指南 &gt;&gt;</a>
      </p>
    </div>
    <!-- 我的分享图片 -->
    <div class="share-img">
      <van-popup v-model="myImgShare" round :style="{width: '70%'}">
        <img @click="checkImg" src="@/assets/Share/img_share_hint_wx.png" alt="demo" />
      </van-popup>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Vue from "vue";
Vue.use(vant);

export default {
  data() {
    return {
      loading: false,
      loadText: "图片上传中",

      myShare: false, // 我的分享显示
      myImgShare: false, // 我的图片分享
      qrsrc: "", // 我的分享二维码
      qrcode: "",
      wxShareData: "", // 分享微信信息
      pyqShareData: "", // 分享朋友圈信息
      qqShareData: "", // 分享qq信息
      zoneShareData: "", // 分享空间信息
      shareIndex: "", // 分享实例的index
      shareData: "", // 分享实例的data
    };
  },
  methods: {
    // 点击图片, 传递参数给原生
    checkImg() {
      //data 传给原生
      this.myImgShare = false;
      let index = this.shareIndex;
      let data = this.shareData;
      console.log(index, data)
      shareTo.postMessage(JSON.stringify({ index,data}));
    },
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.container {
}
</style>
