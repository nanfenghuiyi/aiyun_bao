<template>
  <div
    class="container"
    v-loading="loading"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="card-main">
      <ul class="card-example flex-row">
        <li class="example-item flex-column">
          <img src="@/assets/Share/card_face.jpg" alt />
          <span>正面示例</span>
        </li>
        <li class="example-item flex-column">
          <img src="@/assets/Share/card_back.jpg" alt />
          <span>背面示例</span>
        </li>
      </ul>
      <h2>1.专属名片是什么</h2>
      <p>专属名片是包含您推广二维码的名片，新用户通过扫描您的推广二维码注销下载使用爱运宝后，您可永久获得该用户行程费用的一部分业务收入</p>
      <p id="ios-rules" v-if="isIOS">
        <router-link class="rules" to="/rulesIos">共享业务收入规则 &gt;</router-link>
      </p>
      <p id="android-rules" v-else>
        <router-link class="rules" to="/rulesAndroid">共享收益规则 &gt;</router-link>
      </p>
      <h2>2.专属名片怎么使用</h2>
      <p>a）打印成一张宣传单（较大尺寸）粘贴在车内，乘客即时扫码注册</p>
      <p>b）打印多张名片（普通名片尺寸）分发给乘客，乘客稍后扫码注册</p>
      <h2>3.立即获得专属名片</h2>
      <p>将名片分享给打印店职员，按需打印即可</p>
      <ul>
        <li @click="getShare(0)">
          <i class="share-wechat">
            <img src="@/assets/Share/ico_share_wechat.png" alt />
          </i>
          <span>微信分享名片</span>
        </li>
        <li @click="getShare(2)">
          <i class="share-qq">
            <img src="@/assets/Share/ico_share_qq.png" alt />
          </i>
          <span>QQ分享名片</span>
        </li>
      </ul>
      <p>
        <router-link to="/cardGuide" class="guide">名片使用指南 &gt;&gt;</router-link>
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
      shareDemo: [
        require("@/assets/Share/img_share_hint_wx.png"),
        require("@/assets/Share/img_share_hint_qq.png"),
      ],

      imgIndex: 0,
      isIOS: false,
      myShare: false, // 我的分享显示
      myImgShare: false, // 我的图片分享
      qrsrc: "", // 我的分享二维码
      qrcode: "",
      wxShareData: "", // 分享微信信息
      qqShareData: "", // 分享qq信息
      shareIndex: "", // 分享实例的index
      shareData: "" // 分享实例的data
    };
  },
  methods: {
    // 获取终端
    getNavigator() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        this.isIOS = false;
        this.imgIndex = 0;
      } else {
        this.isIOS = true;
        this.imgIndex = 1;
      }
    },
    // 点击图片, 传递参数给原生
    checkImg() {
      //data 传给原生
      this.myImgShare = false;
      let index = this.shareIndex;
      let data = this.shareData;
      console.log(index, data);
      shareTo.postMessage(JSON.stringify({ index, data }));
    },
    // 点击事件
    getShare(index){
    if(index == 0){
        if(this.wxShareData){
          this.showShareDemo(0, this.wxShareData)
        } else {
          this.getShareContent();
        }
      } else if(index == 2){
        if (this.qqShareData){
          this.showShareDemo(1, this.qqShareData)
        } else {
          this.getShareContent();
        }
      }
    },
    /**
     * 获取我的分享信息
     * @param index 分享对应的type 1 微信， 2 朋友圈， 3 qq， 4 空间
     */
    getShareContent() {
      var param = this.param;
        let params = {
          user_id: param.user_id,
          city_code: param.city_code,
          identity: param.identity
        };
        this.loadText = "获取中...";
        this.loading = true;
        let url = this.$global_msg.getShareContent;
        this.axios.post(url, params).then(res => {
          console.log(res);
          this.loading = false;
          var res = res.data;
          if(res.status == 1){
            let data = res.data;
            for (let i = 0; i < data.length; i++) {
              if (data[i].type == "5") {
                this.wxShareData = data[i];
              } else if(data[i].type == "6") {
                this.qqShareData = data[i];
              }
            }
          } else {
            vant.Toast(res.msg);
          }
        }).catch(err => {
          console.log("err===", err);
          this.loading = false;
        })
    },

    /**
     * 显示分享示例
     * @type {[*]} 示意图
     */
    showShareDemo(index, data) {
      this.shareIndex = index;
      this.shareData = data;
      console.log(index, data);
        if (data == null) {
          vant.Toast("未获取到分享信息，请返回重试");
          return;
        }
        this.myImgShare = true;
        if(index <4) {
          $("#share-demo-model .content img").attr("src", this.shareDemo[index]);
        }
    },
  },
  mounted() {
    this.getNavigator();
    this.getShareContent();
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>

<style lang="scss" scoped>
.card-main {
  width: 100%;
  height: 100%;
  font-size: 16px;
  overflow: scroll;
  .card-example .example-item img {
    width: 100%;
    height: 110px;
    padding: 10px 0;
  }
  .card-example .example-item span {
    text-align: center;
    font-size: 14px;
    color: #7a7a7a;
  }
  ul {
    display: flex;
    flex-direction: row;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      i img {
        width: 35px;
        height: 35px;
        padding: 5px 0;
      }
      span {
        font-size: 14px;
        color: #333;
        text-align: center;
        padding: 5px 0;
      }
    }
  }
  h2 {
    font-size: 18px;
    color: #333333;
    padding: 5px 15px;
  }
  p {
    color: #666666;
    font-size: 13px;
    padding: 0 15px;
    a {
      display: block;
      padding: 8px 0;
    }
  }
}
.rules {
  color: #ffad18;
}
.guide {
  text-align: center;
  font-size: 18px;
  color: red;
}
.share-img {
  img {
    width: 100%;
  }
}
</style>
