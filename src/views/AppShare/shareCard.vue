<template>
  <div class="container">
    <div id="qrcodeCanvas" class="hide"></div>
    <div class="card-main">
      <div class="text-center">专属名片</div>
      <div class="type-wrapper">
        <span class="type active" @click="setCommon" id="common">乘客/快车司机</span>
        <span class="type" @click="setTaxi" id="taxi">出租车司机</span>
        <span class="type" @click="setBus" id="bus">大巴车司机</span>
      </div>
      <div id="face" class="zoom4" align="center"></div>
      <p>正面</p>

      <div id="back" class="zoom4" align="center">
        <img src="@/assets/AppShare/back.jpg" />
      </div>
      <p>背面</p>
      <div class="text">
        <!--<button type="button" onclick="download()" class="btn btn-warning">点击下载</button>-->
        <span id="sub">长按</span>图片下载，随后打印，轻松推广
      </div>
      <!-- 专属名片弹窗 -->
      <van-popup v-model="show" :close-on-click-overlay="false" round :style="{ width: '80%' }">
        <div class="modal-header">
            <span class="title">爱运宝VIP专属名片</span>
            <span class="close" @click="closeShow">&times;</span>
          </div>
          <ul>
            <li id="user-phone" v-text="user_phone"></li>
            <li id="vip-code" v-text="vip_code"></li>
            <li>名片二维码已绑定爱运宝账号</li>
            <li>永享扫码注册用户行程收益</li>
          </ul>
          <div class="modal-footer" @click="closeShow">好的</div>
      </van-popup>
      <!-- <div class="pu" id="myModal">
        <div class="model"></div>
        <div class="content">
          <div class="modal-header">
            <span class="title">爱运宝VIP专属名片</span>
            <span class="close">&times;</span>
          </div>
          <ul>
            <li id="user-phone"></li>
            <li id="vip-code"></li>
            <li>名片二维码已绑定爱运宝账号</li>
            <li>永享扫码注册用户行程收益</li>
          </ul>
          <div class="modal-footer">好的</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { number } from "../../utils/util";
import Vue from "vue";
Vue.use(vant);

export default {
  data() {
    return {
      show: true,

      type: "common", // 默认乘客和司机快车
      linkData: {}, // 链接参数
      qrsrc: "", // 二维码地址
      user_phone: "", // 名片电话
      vip_code: "", // 名片编码
    };
  },
  methods: {
    // 关闭提示框
    closeShow() {
      console.log(111)
      this.show = false;
    },
    // 获取参数
    getData() {
      this.url = window.location.href;
      var url = this.url;
      if (url.indexOf('?') !== -1) {
        var search = url.substring(url.indexOf('?') + 1);
        var queryArray = search.split('&');
        queryArray.forEach(function (item) {
          var itemArray = item.split('=');
          var key = itemArray[0];
          var value = decodeURIComponent(itemArray[1]) ? decodeURIComponent(itemArray[1]) : '';
          this.linkData[key] = value;
        })
      }
      console.log(this.data)
    },
    // 切换乘客快车司机
    setCommon() {
      $("#common").addClass("active").siblings().removeClass("active");
      this.type = "common";
      this.hecheng();
    },
    // 切换出租车司机
    setTaxi() {
      $("#taxi").addClass("active").siblings().removeClass("active");
      this.type = "taxi";
      this.hecheng();
    },
    // 切换大巴车司机
    setBus() {
      $("#bus").addClass("active").siblings().removeClass("active");
      this.type = "bus";
      this.hecheng();
    },
    // 生成二维码
    getQrUrl() {
      var qrUrl  = "";
      switch (this.type) {
        case "common":
          qrUrl= "http://a56999.com/static/Event/appShare/html/recommend_passenger.html?rnd=" + new Date().getTime() + "&type=1";
          break;
        case "taxi":
          qrUrl= "http://a56999.com/static/Event/appShare/html/recommend_driver.html?rnd=" + new Date().getTime() + "&type=2";
          break;
        case "bus":
          qrUrl= "http://a56999.com/static/Event/appShare/html/recommend_contractor.html?rnd=" + new Date().getTime() + "&type=4";
          break;
        default:
          qrUrl= "http://a56999.com/static/Event/appShare/html/recommendLink.html?rnd=" + new Date().getTime() + "&type=1";
          break;
      }
      this.qrcode(setUrl(linkData, qrUrl));
    },
    /**
     * 显示名片信息
     */
    showCardInfo() {
      this.show = true;
      this.user_phone = "已生成用户" + number(this.linkData.phone) + "专属名片"
      this.vip_code = "VIP编码 : " + linkData.tjtel
    }
  },
  mounted() {
    this.getData()
  }
};
</script>

<style scoped>
.card-main {
    width: 100%;
    height: 100%;
    background-color: #f1f2f3;
    font-size: 14px;
    overflow: scroll;
}
.text-center {
    font-size: 14px;
    color: #333333;
    text-align: center;
    padding: 13px 0;
}
.type-wrapper {
    display: flex;
    flex-direction: row;
    padding: 10px;
}
.type-wrapper span {
    flex: 1;
    background: #3eaa32;
    color: #fff;
    font-size: 12px;
    text-align: center;
    padding: 10px 0;
    margin: 0 5px;
}
.type-wrapper span:hover,
.type-wrapper .active {
    flex: 1;
    background: #26821c;
    color: #fff;
}
.zoom4 {
    zoom: 0.2;
}
#qrcodeCanvas {
    display: none;
}
/* #face {
    height: 913px;
} */
.text {
    color: #666666;
    padding: 15px;
    font-size: 13px;
    text-align: center;
}
p {
    color: #999999;
    font-size: 13px;
    padding: 10px;
    text-align: center;
}
.modal-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #cccccc;
    padding: 15px 10px;
}
.title {
    font-size: 18px;
    font-weight: 500;
    color: #000000;
    flex: 1;
}
.close {
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #666666;
    text-align: center;
}
ul {
    list-style: circle;
    border-bottom: 1px solid #cccccc;
    padding: 15px 0;
}
ul li {
    list-style: disc !important;
    margin: 10px 40px;
}
.modal-footer {
    font-size: 12px;
    color: #ffffff;
    background-color: #fd9c46;
    padding: 8px 0; 
    text-align: center;
    margin: 10px 15px;
    width: 40px;
    border-radius: 5px;
    float: right;
}
</style>
