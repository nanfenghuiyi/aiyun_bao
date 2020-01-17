<template>
  <div id="container" class="container">
    <div id="container-card">
      <div id="qrcodeCanvas" ref="qrcodeCanvas" class="hide"></div>
      <div class="card-main">
        <div class="text-center">专属名片</div>
        <div class="type-wrapper">
          <span class="type active" @click="setCommon" id="common">乘客/快车司机</span>
          <span class="type" @click="setTaxi" id="taxi">出租车司机</span>
          <span class="type" @click="setBus" id="bus">大巴车司机</span>
        </div>
        <div id="face" class="zoom4" align="center" v-html="face"></div>
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
  </div>
</template>

<script>
import common from "../../assets/AppShare/common.jpg";
import taxi from "../../assets/AppShare/taxi.jpg";
import bus from "../../assets/AppShare/bus.jpg";
import logo from "../../assets/AppShare/logo_no_border.png";

import QRCode from "qrcodejs2";
import $ from "jquery";
import { number } from "../../utils/util";
import Vue from "vue";
Vue.use(vant);

export default {
  data() {
    return {
      show: true,
      face: "",

      type: "common", // 默认乘客和司机快车
      linkData: {}, // 链接参数
      qrsrc: "", // 二维码地址
      user_phone: "", // 名片电话
      vip_code: "", // 名片编码
      base64: [],
    };
  },
  methods: {
    // 关闭提示框
    closeShow() {
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
      var url = window.location.host;
      switch (this.type) {
        case "common":
          qrUrl= url+ "/#/recommend_passenger?rnd=" + new Date().getTime() + "&type=1";
          break;
        case "taxi":
          qrUrl= url+ "/#/recommend_driver?rnd=" + new Date().getTime() + "&type=2";
          break;
        case "bus":
          qrUrl= url+ "/#/recommend_contractor?rnd=" + new Date().getTime() + "&type=4";
          break;
        default:
          qrUrl= url+ "/#/recommendLink?rnd=" + new Date().getTime() + "&type=1";
          break;
      }
      this.qrcode(this.setUrl(this.linkData, qrUrl));
    },
    /**
     * 显示名片信息
     */
    showCardInfo() {
      this.show = true;
      this.user_phone = "已生成用户" + number(this.linkData.phone) + "专属名片"
      this.vip_code = "VIP编码 : " + this.linkData.tjtel
    },
    /**
     * 判断是否是pc端
     * @returns {boolean}
     * @constructor
     */
    IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    /**
     * 生成二维码
     * @param url
     * @returns {string}
     */
    qrcode(url) {
        //生成二维码工具
        this.qrcodeCanvas = new QRCode("qrcodeCanvas", {
          width: 128,
          height: 128,
          colorDark: "#000000", // 前景色
          colorLight: "#ffffff", // 背景色
          correctLevel: QRCode.CorrectLevel.H // 容错级别
        });
        //设置要生成二维码的链接
        this.qrcodeCanvas.clear(); // 清除代码
        this.qrcodeCanvas.makeCode(url);
        var demo = document.getElementById('qrcodeCanvas');
        this.qrsrc = demo.childNodes[0].toDataURL("image/jpg", 1);
        this.hecheng();
    },
    /**
     * 合成名片
     */
    hecheng() {
        console.log("qrsrc=", this.qrsrc);
        var that = this;
        var data = [
          that.type=="common"?common:this.type=="bus"?bus:taxi,
          that.qrsrc,
          logo
        ];
        var base64 = [];
        that.draw(data, function () {
            that.face = '<img src="' + base64[0] + '">';
            that.showCardInfo();
        }, base64)
    },
    /**
     * 画名片
     * @param data
     * @param fn
     * @param base64
     */
    draw(data, fn, base64) {
      var that = this;
      var c = document.createElement('canvas'),
      ctx = c.getContext('2d'),
      len = data.length;
      c.width = 1480;
      c.height = 913;
      ctx.rect(0, 0, c.width, c.height);
      ctx.fillStyle = '#fff';
      ctx.fill();
      function drawing(n) {
          if (n < len) {
              var img = new Image;
              img.setAttribute("crossOrigin",'Anonymous'); //解决跨域
              img.src = data[n];
              
              img.onload = function() {
                switch (n) {
                  case 0:
                      ctx.drawImage(img, 0, 0, 1480, 913);
                      break;
                  case 1:
                      ctx.drawImage(img, 890, 500, 300, 300);
                      break;
                  case 2:
                      ctx.drawImage(img, 990, 595, 100, 100);
                      break;
                }
                drawing(n + 1);//递归
              }
          } else { 
              //添加文字
              ctx.font = "300 42px 苹方";
              ctx.fillStyle = '#445963';
              ctx.fillText("VIP编码：" + that.linkData.tjtel, 100, 35);
              //保存生成作品图片
              base64.push(c.toDataURL("image/jpg", 1));
              fn();
          }
      }
      drawing(0);
    },
    /**
     * 设置跳转链接参数
     * @param url
     */
    setUrl(data, url) {
        if (data != null) {
            if (data.tjtel) {
                url += ("&tjtel=" + data.tjtel);
                if (data.city) {
                    url += ("&city=" + data.city);
                    if (data.identity) {
                        url += ("&identity=" + data.identity);
                        if (data.award_code) {
                            url += ("&award_code=" + data.award_code);
                        }
                    } else if (data.award_code) {
                        url += ("&award_code=" + data.award_code);
                    }
                } else if (data.identity) {
                    url += ("&identity=" + data.identity);
                    if (data.award_code) {
                        url += ("&award_code=" + data.award_code);
                    }
                } else if (data.award_code) {
                    url += ("&award_code=" + data.award_code);s
                }
            } else if (data.city) {
                url += ("&city=" + data.city);
                if (data.identity) {
                    url += ("&identity=" + data.identity);
                    if (data.award_code) {
                        url += ("&award_code=" + data.award_code);
                    }
                } else if (data.award_code) {
                    url += ("&award_code=" + data.award_code);
                }
            } else if (data.identity) {
                url += ("&identity=" + data.identity);
                if (data.award_code) {
                    url += ("&award_code=" + data.award_code);
                }
            } else if (data.award_code) {
                url += ("&award_code=" + data.award_code);
            }
        }
        return url;
    }
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight   
    document.getElementById('container-card').style.height = winHeight +'px'  //调整上拉加载框高度
    this.getData();
    this.getQrUrl();
  }
};
</script>

<style lang="scss" scoped>
#qrcodeCanvas {
  display: none;
}
.card-main {
  width: 100%;
  height: 100%;
  background-color: #f1f2f3;
  font-size: 14px;
  overflow: scroll;
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
    span {
      flex: 1;
      background: #3eaa32;
      color: #fff;
      font-size: 12px;
      text-align: center;
      padding: 10px 0;
      margin: 0 5px;
    }
    span:hover,
    .active {
      flex: 1;
      background: #26821c;
      color: #fff;
    }
  }
  /* #face {
    height: 913px;
  */
  .zoom4 {
    zoom: 0.2;
  }
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
}


.modal-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #cccccc;
  padding: 15px 10px;
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
}

ul {
  list-style: circle;
  border-bottom: 1px solid #cccccc;
  padding: 15px 0;
  li {
    list-style: disc !important;
    margin: 10px 40px;
  }
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
