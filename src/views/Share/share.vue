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
        <li @click="getShare(0)">
          <i class="share-wechat">
            <img src="@/assets/Share/ico_share_wechat.png" alt />
          </i>
          <span>微信</span>
        </li>
        <li @click="getShare(1)">
          <i class="share-friend">
            <img src="@/assets/Share/ico_share_friends.png" alt />
          </i>
          <span>朋友圈</span>
        </li>
        <li @click="getShare(2)">
          <i class="share-qq">
            <img src="@/assets/Share/ico_share_qq.png" alt />
          </i>
          <span>QQ好友</span>
        </li>
        <li @click="getShare(3)">
          <i class="share-zone">
            <img src="@/assets/Share/ico_share_qzone.png" alt />
          </i>
          <span>QQ空间</span>
        </li>
        <li @click="getShare(4)">
          <i class="share-qr">
            <img src="@/assets/Share/ico_share_erweima.png" alt />
          </i>
          <span>二维码</span>
        </li>
        <li @click="getShare(5)">
          <i class="share-card">
            <img src="@/assets/Share/ico_share_mingpian.png" alt />
          </i>
          <span>专属名片</span>
        </li>
      </ul>
      <div class="share-footer">
        <router-link class="share-footer-link" to="/recommendedList">
          <div>查看已推荐的好友</div>
          <i class="el-icon-arrow-right"></i>
        </router-link>
      </div>
    </div>
    <!-- 我的分享二维码 -->
    <div>
      <van-popup v-model="myShare" round :style="{width: '90%', height: '70%'}">
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
          <div id="qrcode" ref="qrcode" class="qr"></div>
          <span class="text-gray">打印二维码名片置于车内</span>
          <span class="text-gray">更方便您的推广</span>
          <span class="text-gray">
            详情可点击下方
            <span class="text-red">"专属名片"</span>
            了解
          </span>
          <img
            @click="closeMyShare"
            class="close"
            src="@/assets/Share/icon-close-gray.png"
            alt="qr"
          />
        </div>
      </van-popup>
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
import QRCode from "qrcodejs2";
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
        require("@/assets/Share/img_share_hint_wxpyq.png"),
        require("@/assets/Share/img_share_hint_qq.png"),
        require("@/assets/Share/img_share_hint_qqzone.png")
      ],
      shareImg: [
        require("@/assets/Share/share_ios_img.jpg"),
        require("@/assets/Share/share_android_img.jpg")
      ],
      imgIndex: 0,
      isIOS: false,
      myShare: false, // 我的分享显示
      myImgShare: false, // 我的图片分享
      qrsrc: "", // 我的分享二维码
      qrcode: "",
      wxShareData: "", // 分享微信信息
      pyqShareData: "", // 分享朋友圈信息
      qqShareData: "", // 分享qq信息
      zoneShareData: "", // 分享空间信息
      shareIndex: "", // 分享实例的index
      shareData: "" // 分享实例的data
    };
  },
  components: { QRCode },
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
    // 点击事件
    getShare(index) {
      switch (index) {
        case 0:
          if (this.wxShareData) {
            this.showShareDemo(0, this.wxShareData);
          } else {
            this.getShareContent();
          }
          break;
        case 1:
          if (this.pyqShareData) {
            this.showShareDemo(1, this.pyqShareData);
          } else {
            this.getShareContent();
          }
          break;
        case 2:
          if (this.qqShareData) {
            this.showShareDemo(2, this.qqShareData);
          } else {
            this.getShareContent();
          }
          break;
        case 3:
          if (this.zoneShareData) {
            this.showShareDemo(3, this.zoneShareData);
          } else {
            this.getShareContent();
          }
          break;
        case 4:
          if (this.qrsrc == "") {
            this.getShareContent();
          } else {
            this.myShare = true;
            if (this.qrcode == "") {
              this.$nextTick(function() {
                this.showShareQR();
              });
            }
          }
          break;
        case 5:
          this.$router.push({ path: "card" });
          break;
        default:
          break;
      }
    },
    /**
     * 获取我的分享信息
     */
    getShareContent() {
      var param = this.param;
      let params = {
        city_code: param.city_code,
        user_id: param.user_id,
        identity: param.identity
      };
      let url = this.$global_msg.getShareContent;
      console.log(params);
      this.loadText = "获取中...";
      this.loading = true;
      this.axios
        .post(url, params)
        .then(res => {
          console.log(res);
          this.loading = false;
          var res = res.data;
          if (res.status == 1) {
            let data = res.data;
            for (let i = 0; i < data.length; i++) {
              if (data[i].type == "1") {
                this.wxShareData = data[i];
              } else if (data[i].type == "2") {
                this.pyqShareData = data[i];
              } else if (data[i].type == "3") {
                this.qqShareData = data[i];
              } else if (data[i].type == "4") {
                this.zoneShareData = data[i];
              } else if (data[i].type == "7") {
                this.qrsrc = data[i].url;
              }
            }
            this.loading = false;
          } else {
            vant.Toast(res.msg);
          }
        })
        .catch(err => {
          console.log("err===", err);
          this.loading = false;
        });
    },

    /**
     * 显示我的分享二维码
     */
    showShareQR() {
      this.$nextTick(() => {
        console.log("显示我的分享二维码");
        //生成二维码工具
        this.qrcode = new QRCode("qrcode", {
          width: 128,
          height: 128,
          colorDark: "#000000", // 前景色
          colorLight: "#ffffff", // 背景色
          correctLevel: QRCode.CorrectLevel.H // 容错级别
        });
        //设置要生成二维码的链接
        this.qrcode.clear(); // 清除代码
        this.qrcode.makeCode(this.qrsrc);
        console.log(this.qrcode);
      });
    },

    // 关闭我的分享二维码
    closeMyShare() {
      this.myShare = false;
    },
    /**
     * 显示分享示例
     * @type {[*]}
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
      if (index < 4) {
        $(".share-img img").attr("src", this.shareDemo[index]);
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
    }
  },
  mounted() {
    this.getNavigator();
    this.getShareContent();
  }
};
</script>

<style lang="scss" scoped>
html,
body {
  overflow-y: hidden;
}
.share-main,
.container {
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
    width: 92%;
    position: absolute;
    bottom: 0;
    background-color: #f5f5f5;
    padding: 4%;
    .share-footer-link {
      width: 100%;
      color: #7a7a7a;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;
    }
    span {
      flex: 1;
      font-size: 18px;
    }
  }
}
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  .title {
    width: 100%;
    text-align: center;
    color: #ffffff;
    background-color: #1fb1ff;
    font-size: 16px;
    // border-top-left-radius: 0.2rem;
    // border-top-right-radius: 0.2rem;
    padding: 10px 0;
  }
  span {
    text-align: center;
    font-size: 14px;
    color: #000000;
    padding-top: 0.05rem;
  }
  .text-red {
    font-size: 14px;
    color: #f20006;
  }
  .text-gray {
    font-size: 14px;
    color: #666666;
  }
  .qr {
    width: 100px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .close {
    width: 20px;
    margin: 10px;
  }
}

.share-img {
  img {
    width: 100%;
  }
}
</style>
