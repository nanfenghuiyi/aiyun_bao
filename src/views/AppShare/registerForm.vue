<template>
  <div class="container" v-loading="loading" :element-loading-text="loadText" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="registerFormBox">
      <a class="close" href="javascript:;" @click="getBack()"></a>
      <div class="registerFormBoxInner">
        <div class="registerForm">
          <div class="formHeader">
            <img src="@/assets/AppShare/logo_no_border.png" alt="aiyun'logo" />
            <span>共享出行，共享收益</span>
          </div>
          <div class="content">
            <form action>
              <div class="inputBox">
                <input id="phoneCheck" type="text" maxlength="11" placeholder="请输入注册手机号" v-model.trim="phone" @input="phoneCheck" required autocomplete="off" />
                <span class="tip"></span>
                <span class="status"></span>
              </div>
              <div class="inputBox pws_code none">
                <input id="passwordCheck" @input="passwordCheck" :type="check.type" placeholder="请输入登录密码(6~16位)" v-model.trim="pwd" minlength="6" maxlength="16" required />
                <span class="tip"></span>
                <span class="status"></span>
                <span class="icon-eye" @click="iconEye">
                  <img :src="check.src" alt="">
                </span>
              </div>
              <!--<input type="hidden" value="{$tjtel}" id="recommend_phone">-->
              <!--<div class="inputBox">-->
              <!--<input id="passwordConfirm" type="password" placeholder="请确认登录密码" minlength="6" maxlength="16" required><span class="tip"></span><span class="status"></span>-->
              <!--</div>-->
              <div class="inputBox inputImgBox clearfix img_code none">
                <div class="imgCodeBox">
                  <input id="imgCode" @input="imgCode" type="text" maxlength="4" placeholder="请输入图片验证码" v-model.trim="img_code" required autocomplete="off" />
                </div>
                <div class="imgBox" id="captcha-container" @click="getCode">
                  <img id="img-code" src alt="code" />
                  <!-- <span class="refresh">点击刷新</span> -->
                </div>
              </div>
              <div class="inputBox inputCodeBox clearfix sms_code none">
                <div class="messageCodeBox">
                  <input v-model.trim="sms_code" @input="messageCode()" id="messageCode" type="text" maxlength="4" placeholder="请输入短信验证码" />
                </div>
                <div class="codeBtnBox">
                  <button type="button" class="codeBtn able" v-text="codeBtnBox" @click="getSmsCode(this,60)"></button>
                </div>
              </div>
              <div href="javascript:;" @click="submitBtn" class="submitBtn">免费注册</div>
            </form>
            <div class="protocol">
              <span class="check" @click="toggleCheck">
                <img src="@/assets/AppShare/check.png" alt="check" />
              </span>
              <a
                href="http://aiyunbaoapp.a56999.com/Home/Userprotocol/passSpeciService.html"
                class="text"
                style="text-decoration: none;color: rgb(0,0,0)"
              >《会员注册协议条款》</a>
            </div>
          </div>
          <div class="registered">
            <div class="registered_phone" v-text="registered_phone"></div>
            <span class="registered_text" v-text="registered_text"></span>
            <div class="download_link" @click="isPhone">点击去下载</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 温馨提示 -->
    <van-popup v-model="show" round :style="{ width: '80%' }">
      <div class="point_header">爱运温馨提示</div>
      <div class="point_title">新用户免费注册成功后，如若不能及时下载安装APP，可在下次进入此推荐链接中，输入您已注册的手机号码，即可为您提供下载地址，轻松下载APP。</div>
      <div @click="closeShow" class="point_footer">知道了,现在去注册</div>
    </van-popup>
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
      show: false,
      isRegister: false,//是否可以点击注册
      check:{
        type: "password",
        src: require("../../assets/AppShare/eyes1.png")
      },

      data: {}, // 传递的参数
      token: "", // 检测短信验证码返回
      phone: "",
      pwd: "",
      img_code: "", // 图形验证码
      sms_code: "", // 短信验证码
      registered_phone: "",
      registered_text: "",
      codeBtnBox: "获取验证码"
    };
  },
  methods: {
    // 返回上一级
    getBack() {
      this.$router.go(-1)
    },
    // 关闭提示框
    closeShow() {
      this.show = false;
    },
    // 点击刷新
    getCode() {
      this.getShareLinkImgCode();
    },
    // 获取验证码
    getSmsCode(obj, t) {},
    // 确定选择条款
    toggleCheck() {},

    /**
     * 检测手机号输入
     */
    phoneCheck() {
      if (this.phone.length == 11) {
        //获取图形验证码
        this.checkPhone();
      }
    },
    /**
     * 检测短信验证码
     */
    messageCode() {
      console.log("获取图形验证码1")
      if (this.sms_code.length == 4) {
        //获取图形验证码
        console.log("获取图形验证码2")
        this.checkSmsCode();
      }
    },
    /**
     * 检测图片验证码
     */
    imgCode() {
      if (this.img_code.length == 4) {
        //获取图形验证码
        this.checkImgCode();
      }
    },
    /**
     * 检查手机号是否注册
     */
    checkPhone() {
      this.loadText = "正在检测...";
      this.loading = true;
      let params = {
        phone: this.phone
      };
      let url = this.$global_msg.getShareLinkCheckPhone;
      this.axios.post(url, params).then(res => {
        console.log(res);
        this.loading = false;
        var res = res.data;
        if (res) {
          if (res.status == 1) {
            if (res.ext == 1) {
              //已注册，前往下载
              this.registered_phone = this.phone;
              this.registered_text =  "该手机号已注册过“爱运宝”，可直接下载安装登录“爱运宝”APP，如忘记密码或修改密码可在APP登录页面通过【忘记密码】操作找回密码或修改密码";
              $(".content")
                .hide()
                .siblings(".registered")
                .show();
              vant.Toast(res.msg);
            } else if (res.ext == 2) {
              // 输入短信验证码
              $(".sms_code").removeClass("none");
              $(".img_code").addClass("none");
              this.time($(".codeBtn"), 60);
            } else if (res.ext == 3) {
              //输入图片验证码
              $(".img_code").removeClass("none");
              $(".sms_code").addClass("none");
              $("#img-code").attr("src", res.data);
            }
          } else {
            this.phone = "";
            vant.Toast(res.msg);
          }
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    },

    /**
     * 检测短信验证码
     */
    checkSmsCode() {
      this.loadText = "正在检测...";
      this.loading = true;
      let params = {
        phone: this.phone,
        sms_code: this.sms_code,
        event: "register"
      };
      let url = this.$global_msg.getShareLinkCheckSmsCode;
      this.axios.post(url, params).then(res => {
        console.log(res);
        this.loading = false;
        var res = res.data;
        if (res) {
          if (res.status == 1) {
            if (res.ext == 1) {
              this.token = res.data;
              $(".sms_code").addClass("none");
              $(".img_code").addClass("none");
              $(".pws_code").removeClass("none");
            } else {
              vant.Toast(res.msg);
            }
          } else {
            vant.Toast(res.msg);
          }
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    },

    /**
     * 检测图形验证码
     */
    checkImgCode() {
      this.loadText = "正在检测...";
      this.loading = true;
      let params = {
        phone: this.phone,
        img_code: this.img_code,
        event: "register"
      };
      let url = this.$global_msg.getShareLinkCheckImgCode;
      this.axios.post(url, params).then(res => {
        console.log(res);
        console.log("params=", params);
        this.loading = false;
        var res = res.data;
        if (res) {
          if (res.status == 1) {
            if (res.ext == 2) {
              $(".sms_code").removeClass("none");
              $(".img_code").addClass("none");
              this.time($(".codeBtn"), 60);
            } else {
              vant.Toast(res.msg);
            }
          } else {
            this.getShareLinkImgCode();
            vant.Toast(res.msg);
          }
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    },

    /**
     * 获取短信验证码
     * @param obj
     * @param t
     * @returns {boolean}
     */
    getSmsCode(obj, t) {
      this.loadText = "正在获取...";
      this.loading = true;
      let params = {
        event: "register"
      };
      let url = this.$global_msg.getShareLinkSmsCode;
      this.axios.post(url, params).then(res => {
        console.log(res);
        this.loading = false;
        var res = res.data;
        if (res) {
          if (res.status == 1) {
            if (res.ext == 1) {
              this.time(obj, 60);
            } else {
              vant.Toast(res.msg);
            }
          } else {
            vant.Toast(res.msg);
          }
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    },

    /**
     * 检测密码输入
     */
    passwordCheck() {
      var pwd = this.pwd;
      if (pwd.length >= 6) {
          this.isRegister = true;
          $(".submitBtn").addClass("submitBtnActive");
      } else {
          this.isRegister = false;
          $(".submitBtn").removeClass("submitBtnActive");
      }
    },

    /**
     * 注册协议
     */
    toggleCheck() {
      if($(".registerFormBox .protocol .check").hasClass("checkNo")){
        $(".registerFormBox .protocol .check").removeClass("checkNo");
      } else {
        $(".registerFormBox .protocol .check").addClass("checkNo");
      }
    },

    /**
     * 定时器
     * @param obj
     * @param t
     */
    time(obj, t) {
      var that = this;
      if (t === 0) {
        $(obj).removeAttr("disabled");
        $(obj).removeClass("disable").addClass("able");
        this.codeBtnBox = "获取验证码";
      } else {
        $(obj).attr("disabled", "true");
        this.codeBtnBox = t + "秒后重试";
        $(obj).removeClass("able").addClass("disable");
        t--;
        setTimeout(function() {
          that.time($(".codeBtn"), t);
        }, 1000);
      }
    },

    /**
     * 提交注册
     */
    submitBtn() {
      if (!this.isRegister) {
        return;
      }
      var pwd = this.pwd;
      var data = this.data;
      var tjtel = data != null && data.tjtel != null ? data.tjtel : ""; // 推荐人电话
      var city = data != null && data.city != null ? data.city : "";
      var identity = data != null && data.identity != null ? data.identity : ""; // 推荐身份: 1 乘客， 2 司机
      var type = data != null && data.type != null ? data.type : ""; // 推荐类型： 1 快车， 2 出租车，4 大巴车

      if (pwd == "") {
        vant.Toast("请输入密码");
        return;
      }
      this.loadText = "正在提交...";
      this.loading = true;
      let params = {
        pwd: pwd,
        __token__: this.token,
        event: "register",
        city: city,
        identity: identity,
        type: type
      };
      if (tjtel != "") {
        params.recommend_tel = tjtel;
      }
      let url = this.$global_msg.getShareLinkRegister;
      this.axios.post(url, params).then(res => {
        console.log("params=", params);
        console.log("res=", res);
        this.loading = false;
        var res = res.data;
        if (res) {
          if (res.status == 1) {
            if (res.ext == 1) {
              this.registered_phone = this.phone;
              this.registered_text = "恭喜您，已成功注册“爱运宝”";
              $(".content").hide().siblings(".registered").show();
              vant.Toast(res.msg);
            } else {
              vant.Toast(res.msg);
            }
          } else {
            vant.Toast(res.msg);
          }
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    },

    /**
     * 显示隐藏密码
     */
    iconEye() {
      console.log(111)
      this.check.type=this.check.type==='password'?'text':'password';
      this.check.src=this.check.src===require("../../assets/AppShare/eyes1.png")?require("../../assets/AppShare/eyes2.png"):require("../../assets/AppShare/eyes1.png");
    },

    /**
     * 获取图片验证码
     */
    getShareLinkImgCode() {
      this.loadText = "正在获取...";
      this.loading = true;
      let params = {
        // phone: this.phone,
        phone: 17358593407,
        event: "register"
      };
      let url = this.$global_msg.getShareLinkImgCode;
      this.axios.post(url, params).then(res => {
        this.loading = false;
        console.log(res);
        var res = res.data;
        if (res) {
          if (res.status == 1) {
            if (res.ext) {
              $("#img-code").attr("src", res.data);
            } else {
              vant.Toast(res.msg);
            }
          } else {
            vant.Toast(res.msg);
          }
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    },

    /**
     * 判断手机型号跳转下载
     * @type {string}
     */
    isPhone() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      console.log("isiOS=", isiOS);
      if (this.isWeiXin()) {
        if (isiOS) {
          window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.a56999.aiyun"; //苹果下载地址
        } else {
          window.location.href = "https://sj.qq.com/myapp/detail.htm?apkName=com.a56999.aiyun"; //应用宝下载地址
          // window.location.href = "./warmPrompt.html";
        }
      } else {
        if (isiOS) {
          window.location.href ="http://a.app.qq.com/o/simple.jsp?pkgname=com.a56999.aiyun"; //苹果下载地址
        } else {
          window.location.href ="https://sj.qq.com/myapp/detail.htm?apkName=com.a56999.aiyun"; //应用宝下载地址
          // window.location.href = "./warmPrompt.html";
        }
      }
    },

    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (
        ua.match(/MicroMessenger/i) == "micromessenger" ||
        ua.match(/QQ/i) == "qq"
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.data = this.$route.query;
    console.log(this.data);
    this.getShareLinkImgCode();
  }
};
</script>

<style scoped>
.point_header {
  text-align: center;
  font-size: 18px;
  color: rgb(31, 177, 255);
  padding: 10px 20px;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(204, 204, 204);
}
.point_title {
  padding: 10px 15px;
  font-size: 12px;
  color: rgb(102, 103, 111);
  line-height: 0.35rem;
}
.point_footer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px 0px;
  color: white;
  font-size: 18px;
  background-color: rgb(31, 177, 255);
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
  height: 0;
}

html {
  width: 100% !important;
  height: 100%;
  overflow: hidden;
  background: #fff !important;
}

body {
  width: 100%;
  height: 100%;
  min-width: 600px;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  position: relative;
  margin: 0 auto !important;
}

@media screen and (min-width: 768px) {
  body {
    width: 1000px;
    overflow: auto;
  }
}
.none {
  display: none;
}
.registerFormBox {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  text-align: center;
}

.registerFormBox::after {
  content: "";
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}

.registerFormBox .close {
  display: inline-block;
  position: absolute;
  top: 30px;
  right: 10px;
  width: 40px;
  height: 40px;
  background: url("../../assets/AppShare/close.png") no-repeat;
  background-size: 80%;
  background-position: center;
}

.registerFormBox .registerFormBoxInner {
  display: inline-block;
  vertical-align: middle;
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
}

.registerFormBox .registerForm {
  width: 100%;
  display: inline-block;
  vertical-align: middle;
  margin: 0 auto;
}
/*.content{*/
/*display: none;*/
/*}*/
.registered {
  display: none;
  margin-bottom: 120px;
}
.registered_phone {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
  line-height: 60px;
}
.registered_text {
  display: block;
  margin: 10px 0 5px;
  color: rgba(0, 0, 0, 0.6);
  line-height: 20px;
  font-size: 13px;
}
.download_link {
  display: inline-block;
  font-size: 16px;
  color: red;
  text-decoration: underline !important;
}
.registerFormBox .registerForm .formHeader {
  text-align: center;
  margin-bottom: 40px;
}

.registerFormBox .registerForm .formHeader img {
  display: inline-block;
  width: 55px;
  height: 55px;
}

.registerFormBox .registerForm .formHeader span {
  display: block;
  margin-top: 15px;
  font-size: 20px;
  opacity: 0.8;
  font-weight: 300;
  letter-spacing: 1px;
}

.registerFormBox .registerForm form .inputBox {
  width: 100%;
  height: 30px;
  margin: 20px auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 4px;
  position: relative;
  text-align: center;
}

.registerFormBox .registerForm form .inputBox input {
  border: none;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.7);
  font-weight: 300;
  text-align: center;
  background: none;
}

.registerFormBox .registerForm form .inputBox input::-webkit-input-placeholder {
  font-size: 18px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.3);
}

.registerFormBox .registerForm form .inputBox .tip {
  display: none;
  width: 100%;
  text-align: center;
  position: absolute;
  top: -20px;
  color: red;
  font-size: 14px;
}

.registerFormBox .registerForm form .inputBox .status {
  display: block;
  float: right;
  width: 20px;
  height: 20px;
}

.registerFormBox .registerForm form .inputBox .icon-eye img {
  /* float: right; */
  opacity: 0.6;
  display: inline-block;
  width: 30px;
  height: 15px;
}
.registerFormBox .registerForm form .inputBox .tick {
  background: url("../../assets/AppShare/right.png") no-repeat;
  background-position: center;
  background-size: 20px 20px;
}

.registerFormBox .registerForm form .inputBox .wrong {
  background: url("../../assets/AppShare/wrong.png") no-repeat;
  background-position: center;
  background-size: 20px 20px;
}

.registerFormBox .registerForm form .inputImgBox {
  padding-bottom: 8px;
  margin: 8px 0;
  width: 100%;
  height: auto;
}

.registerFormBox .registerForm form .inputImgBox .imgCodeBox {
  float: left;
  width: 60%;
}

.registerFormBox .registerForm form .inputImgBox .imgCodeBox #imgCode {
  width: 100%;
  height: 1.333333rem;
}

.registerFormBox .registerForm form .inputImgBox .imgBox {
  position: relative;
  float: right;
  width: 40%;
  height: 1.333333rem;
  overflow: hidden;
}
.refresh {
  position: absolute;
  right: 10px;
  bottom: 4px;
}

.registerFormBox .registerForm form .inputImgBox .imgBox img {
  width: 110px;
  height: 100%;
}

.registerFormBox .registerForm form .inputCodeBox {
  width: 100%;
  height: auto;
  padding-bottom: 8px;
  margin: 0 0 0.133333rem 0;
}

.registerFormBox .registerForm form .inputCodeBox .messageCodeBox {
  width: 60%;
  float: left;
}

.registerFormBox .registerForm form .inputCodeBox .messageCodeBox #messageCode {
  width: 100%;
  height: 45px;
}

.registerFormBox .registerForm form .inputCodeBox .codeBtnBox {
  width: 40%;
  float: right;
}

.registerFormBox .registerForm form .inputCodeBox .codeBtnBox .codeBtn {
  width: 110px;
  height: 45px;
  border: 2px solid #00d3b4;
  font-size: 16px;
  font-weight: 300;
  white-space: nowrap;
  background: none;
  -webkit-tap-highlight-color: transparent;
  text-decoration: none;
}

.registerFormBox .registerForm form .inputCodeBox .codeBtnBox .able {
  color: #00d3b4;
}

.registerFormBox .registerForm form .inputCodeBox .codeBtnBox .disable {
  color: #ccc;
}

.registerFormBox .registerForm form .submitBtn {
  display: block;
  width: 100%;
  background: #8c8c8c;
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  margin: 0 auto;
  padding: 15px 0;
  text-decoration: none;
  letter-spacing: 5px;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
}

.registerFormBox .registerForm form .submitBtnActive {
  background: #00d3b4;
}
.registerFormBox .registerForm .protocol {
  display: table;
  text-align: center;
  padding: 3px 0;
  margin: 5px auto 0;
}

.registerFormBox .registerForm .protocol .check {
  display: table-cell;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  background: #00d3b4;
  text-align: center;
}

.registerFormBox .registerForm .protocol .check img {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  height: 100%;
}

.registerFormBox .registerForm .protocol .checkNo img {
  display: none;
}

.registerFormBox .registerForm .protocol .text {
  display: table-cell;
  vertical-align: middle;
  font-size: 16px;
  font-weight: 300;
  opacity: 0.7;
  letter-spacing: 1px;
}

.protocolBox {
  position: absolute;
  display: none;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

/* .protocolDetailWrapper {
  font-family: "PingFang SC";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background: #fff;
}

.protocolDetailWrapper .protocolDetail {
  min-height: 100%;
  width: 100%;
}

.protocolDetailWrapper .protocolDetail .main {
  width: 85%;
  color: #3a3a3a;
  margin: 0 auto;
  padding: 0.853333rem 0 1.706667rem;
}

.protocolDetailWrapper .protocolDetail .main .protocolTitle {
  font-size: 0.56rem;
  text-align: center;
  margin-bottom: 16px;
}

.protocolDetailWrapper .protocolDetail .main section {
  margin: 20px 0;
}

.protocolDetailWrapper .protocolDetail .main section .sectionTitle {
  font-size: 0.453333rem;
}

.protocolDetailWrapper .protocolDetail .main section p,
.protocolDetailWrapper .protocolDetail .main section dt,
.protocolDetailWrapper .protocolDetail .main section dd {
  opacity: 0.9;
  font-size: 20px;
  line-height: 0.6rem;
  margin: 0.133333rem 0;
}

.protocolDetailWrapper .protocolDetail .main section dd {
  margin-left: 2em;
} */

.back {
  position: relative;
  text-align: center;
  width: 0.853333rem;
  height: 0.853333rem;
  margin: -1.306667rem auto 0 auto;
  clear: both;
  border-radius: 50%;
  background: url("../../assets/AppShare/close.png") no-repeat center;
  background-size: contain;
}

.back .backBtn {
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 0.133333rem;
}

.toTop {
  position: absolute;
  bottom: 0.133333rem;
  right: 0.133333rem;
  display: inline-block;
  width: 1.333333rem;
  height: 1.333333rem;
  border-radius: 50%;
  background: url("../../assets/AppShare/top.png") no-repeat;
  background-size: 1.333333rem 1.333333rem;
}
</style>
