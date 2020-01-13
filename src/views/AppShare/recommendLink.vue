<template>
  <div class="container">
    <van-swipe style="height: 667px;" :show-indicators="false" :loop="false" vertical>
      <van-swipe-item>
        <div class="page page1" id="page1">
          <div class="pagebox">
            <div class="pageboxInner">
              <div class="bannerBox">
                <img src="@/assets/AppShare/banner0.png?time=20171008" alt="banner" />
                <div class="slideBoxAbsolute">
                  <div class="slideBox">
                    <ul>
                      <li>
                        <div class="imgBox">
                          <img src="@/assets/AppShare/banner1.png?t=20171008" alt="banner1" />
                        </div>
                      </li>
                      <li>
                        <div class="imgBox">
                          <img src="@/assets/AppShare/banner3.png?t=20171008" alt="banner3" />
                        </div>
                      </li>
                      <li>
                        <div class="imgBox">
                          <img src="@/assets/AppShare/banner2.png?t=20171008" alt="banner2" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="phoneBox">
                <div class="space">
                  <div id="download_btn" class="download">
                    <img
                      src="@/assets/AppShare/logo_no_border.png"
                      alt="download"
                      class="downloadLinkImg"
                    />
                    <div class="text">点击免费注册</div>
                    <a class="downloadLink"></a>
                  </div>
                </div>
                <div class="phone">
                  <img src="@/assets/AppShare/phone.png" alt="phone" />
                </div>
              </div>
              <div class="up">
                <span class="icon-up"></span>
              </div>
            </div>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="page page2">
          <div class="pagebox">
            <div class="pageboxInner">
              <div class="header">
                <div class="title">
                  <span>真正意义上的顺风车</span>
                </div>
              </div>
              <div class="tablebox">
                <div class="tableInnerBox">
                  <div class="tableTitle">
                    <span>同样的乘车路线</span>
                  </div>
                  <table border="1">
                    <tr>
                      <th>某出行平台顺风车</th>
                      <th class="right">爱运宝顺风车</th>
                    </tr>
                    <tr class="trImg">
                      <td>
                        <img src="@/assets/AppShare/didi1.png" alt="滴滴顺风车" />
                      </td>
                      <td>
                        <img src="@/assets/AppShare/aiyun1.png" alt="爱运顺风车" />
                      </td>
                    </tr>
                    <tr>
                      <td>平台显示计价约136.1元</td>
                      <td class="right">平台显示计价约50元</td>
                    </tr>
                    <tr>
                      <td>乘客实付136.1元</td>
                      <td class="right">乘客实付约50元</td>
                    </tr>
                    <tr>
                      <td>
                        直达快巴车费是75元
                        <br />比直达快巴
                        <br />多花136-75=61元
                        <br />多花61/75=81%的钱
                      </td>
                      <td class="right">
                        直达快巴车费是75元
                        <br />比直达快巴
                        <br />少花75-50=25元
                        <br />少花25/75=33%的钱
                      </td>
                    </tr>
                    <tr>
                      <td>
                        收费极高&nbsp;客源少
                        <br />匹配成功率低
                      </td>
                      <td class="right">
                        收费更低&nbsp;车源多
                        <br />匹配成功率高
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="up">
                <span class="icon-up"></span>
              </div>
            </div>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="page page3">
          <div class="pagebox">
            <div class="pageboxInner">
              <div class="header">
                <div class="title">
                  乘客
                  <span>少</span>花钱，司机
                  <span>多</span>赚钱
                </div>
              </div>
              <div class="tablebox">
                <div class="tableInnerBox">
                  <div class="tableTitle">
                    <span>同样的乘车路线</span>
                  </div>
                  <table border="1">
                    <tr>
                      <th>某出行平台快车</th>
                      <th class="right">爱运宝快车</th>
                    </tr>
                    <tr class="trImg">
                      <td>
                        <img src="@/assets/AppShare/didi.png" alt />
                      </td>
                      <td>
                        <img src="@/assets/AppShare/aiyun.png" alt />
                      </td>
                    </tr>
                    <tr>
                      <td>平台显示计价约36.59元</td>
                      <td class="right">平台显示计价约29.74元</td>
                    </tr>
                    <tr>
                      <td>乘客实付36.59元</td>
                      <td class="right">乘客实付约29.74元</td>
                    </tr>
                    <tr>
                      <td>司机实收约26.95元</td>
                      <td class="right">司机实收约28.26元</td>
                    </tr>
                    <tr>
                      <td>服务费约9.14元</td>
                      <td class="right">奖励推荐用户约1.48元</td>
                    </tr>
                    <tr>
                      <td>平台收取单费0.5元</td>
                      <td class="right">无单费</td>
                    </tr>
                    <tr>
                      <td>平台手续费费率20%+</td>
                      <td class="right">平台手续费费率5%</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="up">
                <span class="icon-up"></span>
              </div>
            </div>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="page page4">
          <div class="pagebox">
            <div class="pageboxInner">
              <div class="reward clearfix">
                <div class="rewardTitle">
                  <p>推动共享出行，全民共享收益</p>
                </div>
                <div class="rewardContent clearfix">
                  <div class="rewardList">
                    <img src="@/assets/AppShare/largeMount.png" alt="reward1" />
                  </div>
                  <div class="rewardList">
                    <img src="@/assets/AppShare/highRward.png" alt="reward2" />
                  </div>
                  <div class="rewardList">
                    <img src="@/assets/AppShare/long.png" alt="reward3" />
                  </div>
                  <div class="rewardList">
                    <img src="@/assets/AppShare/real.png" alt="reward4" />
                  </div>
                </div>
              </div>
              <div class="ruleBox">
                <div id="rule_btn" class="rule">
                  <a>查看共享收益规则</a>
                  <span class="icon-circle-right"></span>
                </div>
              </div>
              <div class="up">
                <span class="icon-up"></span>
              </div>
            </div>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="page page5">
          <div class="pagebox">
            <div class="pageboxInner">
              <img src="@/assets/AppShare/focus.png" alt="关注公众号" class="focus" />
              <div class="codeBox">
                <p class="text1 text">长按识别二维码</p>
                <img src="@/assets/AppShare/code.png" alt="二维码" class="code" />
                <p class="text2 text">
                  或微信搜索公众号“爱运科技”
                  <br />获取爱运最新资讯
                  <br />及更多分享链接便于您的推广
                </p>
              </div>
              <div class="slogon">
                <p class="text">“爱运为您提供更好的出行选择”</p>
                <img
                  id="slogonImg"
                  class="slogonImg"
                  src="@/assets/AppShare/register.png"
                  alt="registerSlogon"
                />
              </div>
              <img class="logoImg" src="@/assets/AppShare/logo.png" alt="logo" />
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <!-- 弹出提示框 -->
    <div class="puBox">
      <div class="overLay"></div>
      <div class="pu">
        <div class="title">关于奖励活动及爱运</div>
        <div class="content">
          <section>
            <div class="name">即时现金奖励活动</div>
            <p>新用户注册下载并成功登录“爱运宝”APP，即时可获得现金奖励！</p>
            <p>自己注册下载并成功登录“爱运宝”APP后，点击APP左上角的人形图标进入“推荐与分享”中，发送出自己推荐链接给亲友，亲友免费注册成功并下载登录“爱运宝”APP后，您和亲友都同时获得即时现金奖励。</p>
            <p>现金奖励可在“爱运宝”APP的“钱包”中查看并提现！</p>
            <p>快与亲友分享5000万即时现金奖励吧！</p>
            <p>本次活动仅限被推荐人是广西省和山西省的手机号去注册登录爱运宝时，才对推荐人进行奖励，而推荐人的注册手机号没有地区限制。</p>
            <p>本次活动的最终解释权归成都爱运科技有限公司所有。</p>
          </section>
          <section>
            <div class="name">四级推荐奖励</div>
            <p>在“爱运宝”APP中，分享邀请链接给您的亲友，无论他们注册成为乘客还是司机，您都将成为他们的上级推荐人。同时，若您的亲友邀请新的用户，您也将成为他们的上上级推荐人，以此类推，您最多可拥有四级的推荐用户。</p>
            <p>被推荐用户每次完成出行业务，无论是作为乘客支付乘车业务费用，或是作为司机收取载客业务费用，平台都会将一定比例的业务费用共享给推荐人，最多可达行程费用的5%。推荐人在“爱运宝”上永久享有共享业务收入的权利，该业务收入不受上述5000万元奖励总额的限制，业务收入无上限！推荐他人免费注册成功，坐享永久共享业务收入，就在爱运宝！</p>
            <p>共享业务收入可在“钱包”中查看并提现。</p>
          </section>
          <section>
            <div class="name">关于爱运平台</div>
            <p>全国具有强大竞争力的快车平台，更高效的出租车平台，更专业的顺风车平台！出行就用“爱运宝”，乘客花钱更少，司机赚钱更多！</p>
          </section>
        </div>
        <div id="close-pu" class="close">明白了，去注册</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe).use(SwipeItem);

export default {
  data() {
    return {};
  },
  methods: {
    // 整屏滑动
    get() {
      var container = document.getElementById("container");
      var pages = document.querySelectorAll(".page");
      var slip = Slip(container, "y").webapp(pages);
      var index, $activePage;
      $("#container .page")
        .eq(0)
        .addClass("active")
        .siblings()
        .addClass("notactive");
      // 轮播渐隐渐出
      var size = $(".slideBox ul li").size();
      var i = 0;
      $(".slideBox ul li")
        .eq(0)
        .show()
        .siblings()
        .hide();
      function slide() {
        i++;
        if (i == size) {
          i = 0;
        }
        $(".slideBox ul li")
          .eq(i)
          .fadeIn()
          .siblings()
          .fadeOut();
      }
      setInterval(slide, 4000);

      // 滑屏时为新页面添加active类，从而触发动画；为上一屏增加notactive类，实现渐隐效果也避免了画面跳动
      slip.end(function() {
        index = slip.page;
        $activePage = $("#container .page").eq(index);
        $activePage
          .removeClass("notactive")
          .addClass("active")
          .siblings()
          .removeClass("active")
          .addClass("notactive");
      });

      $(".page1 .bannerBox .slideBox").click(function() {
        $(".puBox").fadeIn();
      });

      $(".puBox .close").click(function() {
        $(".puBox").fadeOut();
        showForm();
      });
    }
  },
  mounted() {
    // this.get();
  }
};
</script>

<style scoped>
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
  background: #00081f !important;
}

body {
  width: 100%;
  height: 100%;
  min-width: 4.266667rem;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  position: relative;
  margin: 0 auto !important;
}

@media screen and (min-width: 768px) {
  body {
    width: 10.24rem;
    overflow: auto;
  }
}

@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5) {
  .border-1px::before {
    -ms-transform: scaleY(0.7);
    transform: scaleY(0.7);
    -webkit-transform: scaleY(0.7);
  }

  .border-1px::after {
    -ms-transform: scaleY(0.7);
    transform: scaleY(0.7);
    -webkit-transform: scaleY(0.7);
  }
}

@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
  .border-1px::before {
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
  }

  .border-1px::after {
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
  }
}

@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .border-1px::before {
    -ms-transform: scaleY(0.3);
    transform: scaleY(0.3);
    -webkit-transform: scaleY(0.3);
  }

  .border-1px::after {
    -ms-transform: scaleY(0.3);
    transform: scaleY(0.3);
    -webkit-transform: scaleY(0.3);
  }
}

.space2em {
  display: inline-block;
  width: 2em;
  margin: 0;
  padding: 0;
}

.active .pageboxInner {
  opacity: 1;
  transition: opacity 1s;
}

.notactive .pageboxInner {
  opacity: 0;
  transition: opacity 1s;
}

.page1 .pagebox .phoneBox .space .download {
  position: relative;
  width: 38%;
  background: rgba(14, 74, 130, 0.5);
  height: 0;
  padding-bottom: 38%;
  margin: 0 auto;
  border: 1px solid #ffd200;
}

.page1 .pagebox .phoneBox .space .download img {
  width: 50%;
  margin-top: 10px;
}

.page1 .pagebox .phoneBox .space .download .text {
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 16px;
  line-height: 3em;
  color: #fed33c;
  font-weight: 600;
}

.active .download .text {
  animation: big 1s infinite;
}

.active.page2 .tablebox,
.active.page3 .tablebox {
  animation: slide_from_bottom2 1s;
}

.active .rewardList:nth-child(1) {
  animation: fadeIn 1s;
}

.active .rewardList:nth-child(2) {
  animation: hide 1s, fadeIn 0.5s 1s;
}

.active .rewardList:nth-child(3) {
  animation: hide 1.6s, fadeIn 0.5s 1.6s;
}

.active .rewardList:nth-child(4) {
  animation: hide 2.2s, fadeIn 0.5s 2.2s;
}

.active.page5 .code {
  animation: fadeIn 1s;
}

.active.page5 .codeBox .text {
  animation: hide 1s, fadeIn 1s 1s;
}

.active.page5 .focus {
  animation: hide 2.2s, slide_from_top2 1s 2.2s;
}

.active.page5 .slogon {
  animation: hide 2.2s, slide_from_bottom2 1s 2.2s;
}
@keyframes big {
  to {
    transform: scale(1.2);
  }
}

@keyframes slide_from_bottom {
  from {
    margin-top: 110%;
  }

  to {
    margin-top: -1.333333rem;
  }
}

@keyframes slide_from_bottom2 {
  from {
    opacity: 0;
    top: 100%;
  }

  to {
    opacity: 1;
    top: 2rem;
  }
}

@keyframes slide_from_top {
  from {
    margin-top: -100%;
  }

  to {
    margin-top: 0.666667rem;
  }
}

@keyframes slide_from_top2 {
  from {
    top: -100%;
  }

  to {
    top: 0;
  }
}

@keyframes slide_from_left {
  from {
    left: -100%;
  }

  to {
    left: 0;
  }
}

@keyframes hide {
  from,
  to {
    opacity: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    -ms-transform: scale(0);
    transform: scale(0);
  }

  to {
    opacity: 1;
    -ms-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes up {
  0% {
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.853333rem;
  }

  100% {
    color: rgba(255, 255, 255, 0);
    font-size: 0.4rem;
  }
}

.up {
  position: absolute;
  width: 100%;
  bottom: 0.066667rem;
  left: 0;
}
.up .icon-up {
  background: url("../../assets/AppShare/icon_white_up_arrow.png") no-repeat;
  background-position: center;
  background-size: 0.533333rem 0.333333rem;
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  font-weight: 200;
  animation: up 1s ease-out infinite;
  -webkit-animation: up 1s ease-out infinite;
  -moz-animation: up 1s ease-out infinite;
  -o-animation: up 1s ease-out infinite;
}
.page {
  width: 100%;
  height: 100%;
}
.pagebox {
  display: table;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 0.266667rem 0;
  box-sizing: border-box;
  position: relative;
  background: url("../../assets/AppShare/background.jpg") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.pagebox .pageboxInner {
  display: table-cell;
  vertical-align: middle;
  overflow: hidden;
}
.page1 .pagebox {
  position: relative;
}
.page1 .pagebox .bannerBox {
  position: relative;
  width: 70%;
  margin: 0 auto;
}

.page1 .pagebox .bannerBox img {
  width: 100%;
}

.page1 .pagebox .bannerBox .slideBoxAbsolute {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

.page1 .pagebox .bannerBox .slideBoxAbsolute::after {
  content: "";
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}

.page1 .pagebox .bannerBox .slideBox {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 96%;
  height: 0;
  padding-bottom: 38%;
  overflow: hidden;
}

.page1 .pagebox .bannerBox .slideBox ul {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.page1 .pagebox .bannerBox .slideBox ul li {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
}

.page1 .pagebox .bannerBox .slideBox ul li::after {
  content: "";
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}

.page1 .pagebox .bannerBox .slideBox ul li .imgBox {
  display: inline-block;
  vertical-align: middle;
  width: 90%;
}

.page1 .pagebox .bannerBox .slideBox ul li .imgBox img {
  width: 100%;
}

.page1 .pagebox .bannerBox .slideBox ul li:last-child {
  display: none;
}

.page1 .pagebox .phoneBox {
  width: 100%;
  margin-top: 0.8rem;
  overflow: hidden;
}

.page1 .pagebox .phoneBox .phone {
  text-align: center;
  margin-top: -1.333333rem;
}

.page1 .pagebox .phoneBox .phone img {
  width: 75%;
}

.page1 .pagebox .phoneBox .space {
  z-index: 99;
}

.page1 .pagebox .phoneBox .space .download .downloadLink {
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.page3 .pagebox,
.page2 .pagebox {
  width: 100%;
  padding: 0;
  display: block;
}

.page3 .pagebox .pageboxInner,
.page2 .pagebox .pageboxInner {
  display: block;
  height: 100%;
}

.page3 .pagebox .header,
.page2 .pagebox .header {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
  margin-top: 0.666667rem;
  text-align: center;
}

.page3 .pagebox .header::after,
.page2 .pagebox .header::after {
  content: "";
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}

.page3 .pagebox .header .title,
.page2 .pagebox .header .title {
  display: inline-block;
  vertical-align: middle;
  margin: 0 auto;
  color: #fff;
  font-size: 0.506667rem;
  line-height: 1.066667rem;
  padding: 0 1em;
  border: 0.053333rem solid #00d3b3;
  border-radius: 0.6rem;
  letter-spacing: 0.1em;
  font-weight: 500;
}

.page3 .pagebox .header .title span,
.page2 .pagebox .header .title span {
  color: #ffd700;
}

.page3 .pagebox .tablebox,
.page2 .pagebox .tablebox {
  position: absolute;
  left: 0;
  right: 0;
  top: 2rem;
  width: 89%;
  height: 80%;
  margin: 0 auto;
  padding: 0.2rem;
  border: 0.04rem solid #00d3b3;
}

.page3 .pagebox .tablebox .tableInnerBox,
.page2 .pagebox .tablebox .tableInnerBox {
  background: #00d3b3;
  width: 100%;
  height: 100%;
}

.page3 .pagebox .tablebox .tableInnerBox .tableTitle,
.page2 .pagebox .tablebox .tableInnerBox .tableTitle {
  height: 10%;
  position: relative;
  text-align: center;
}

.page3 .pagebox .tablebox .tableInnerBox .tableTitle::after,
.page2 .pagebox .tablebox .tableInnerBox .tableTitle::after {
  content: "";
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}

.page3 .pagebox .tablebox .tableInnerBox .tableTitle span,
.page2 .pagebox .tablebox .tableInnerBox .tableTitle span {
  display: inline-block;
  vertical-align: middle;
  letter-spacing: 0.1em;
  font-size: 0.506667rem;
  font-weight: 600;
}

.page3 .pagebox .tablebox .tableInnerBox table,
.page2 .pagebox .tablebox .tableInnerBox table {
  width: 100%;
  height: 90%;
}

.page3 .pagebox .tablebox .tableInnerBox table tr,
.page2 .pagebox .tablebox .tableInnerBox table tr {
  width: 100%;
  padding: 0.133333rem;
  border-top: 0.053333rem solid black;
  border-bottom: 0.053333rem solid black;
}

.page3 .pagebox .tablebox .tableInnerBox table tr img,
.page2 .pagebox .tablebox .tableInnerBox table tr img {
  width: 85%;
}

.page3 .pagebox .tablebox .tableInnerBox table tr td,
.page3 .pagebox .tablebox .tableInnerBox table tr th,
.page2 .pagebox .tablebox .tableInnerBox table tr td,
.page2 .pagebox .tablebox .tableInnerBox table tr th {
  position: relative;
  width: 50%;
  border-right: 0.053333rem solid black;
  text-align: center;
  font-size: 0.32rem;
  vertical-align: middle;
  opacity: 0.9;
}

.page3 .pagebox .tablebox .tableInnerBox table tr th,
.page2 .pagebox .tablebox .tableInnerBox table tr th {
  font-size: 0.4rem;
}

.page3 .pagebox .tablebox .tableInnerBox table tr .right,
.page2 .pagebox .tablebox .tableInnerBox table tr .right {
  color: #fff;
  border-right: none;
}

.page4 {
  position: relative;
}

.page4 .pagebox .pageboxInner .reward {
  width: 78%;
  margin: 0 auto;
  padding: 1.2rem 0 0;
  background: url("../../assets/AppShare/recommend.png") no-repeat;
  background-size: 100% 100%;
}

.page4 .pagebox .pageboxInner .reward .rewardTitle {
  width: 100%;
  margin-bottom: 0.8rem;
}

.page4 .pagebox .pageboxInner .reward .rewardTitle p {
  display: inline;
  color: #fff;
  border-bottom: 0.026667rem solid #00cdb3;
  text-align: center;
  font-size: 0.453333rem;
  padding: 0.2em 1em;
}

.page4 .pagebox .pageboxInner .reward .rewardContent {
  width: 100%;
}

.page4 .pagebox .pageboxInner .reward .rewardContent .rewardList {
  float: left;
  width: 50%;
  margin-bottom: 0.4rem;
  opacity: 1;
}

.page4 .pagebox .pageboxInner .reward .rewardContent .rewardList img {
  width: 75%;
}

.page4 .pagebox .pageboxInner .ruleBox {
  width: 100%;
}

.page4 .pagebox .pageboxInner .ruleBox .rule {
  width: 100%;
  text-align: center;
}

.page4 .pagebox .pageboxInner .ruleBox a,
.page4 .pagebox .pageboxInner .ruleBox span {
  display: inline-block;
  vertical-align: top;
  font-size: 0.4rem;
  line-height: 3em;
  color: #fff;
  margin-right: 0.2rem;
  letter-spacing: 0.013333rem;
}

.page5 .pageboxInner .focus {
  width: 72%;
}

.page5 .pageboxInner .codeBox {
  position: relative;
  width: 100%;
  padding-bottom: 0.8rem;
  margin-top: -0.666667rem;
  margin-bottom: 0.4rem;
}

.page5 .pageboxInner .codeBox .code {
  width: 95%;
}

.page5 .pageboxInner .codeBox .text {
  font-size: 0.4rem;
  line-height: 0.4rem;
  color: #ffde00;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.page5 .pageboxInner .codeBox .text1 {
  top: 20%;
}

.page5 .pageboxInner .codeBox .text2 {
  top: 77%;
  line-height: 1.4em;
}

.page5 .pageboxInner .slogon .text {
  font-size: 0.506667rem;
  color: #00d2b1;
  text-align: center;
  margin-bottom: 0.2rem;
}

.page5 .pageboxInner .slogon .slogonImg {
  width: 80%;
}

.page5 .pageboxInner .logoImg {
  position: absolute;
  bottom: 0.266667rem;
  width: 2.133333rem;
  left: 50%;
  margin-left: -1.066667rem;
}
.space2em {
  display: inline-block;
  width: 2em;
}
.puBox {
  display: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
}

.puBox .overLay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.puBox .pu {
  position: absolute;
  left: 10%;
  top: 10%;
  background: white;
  border-radius: 0.2rem;
  width: 80%;
  height: 80%;
}
.puBox .pu .title {
  height: 1.066667rem;
  line-height: 1.066667rem;
  color: #00c7ac;
  font-size: 0.56rem;
  position: relative;
  text-align: center;
}
.puBox .pu .title:after {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-bottom: 0.013333rem solid rgba(7, 17, 27, 0.1);
  content: "";
}
.puBox .pu .content {
  padding: 0.2rem 0.4rem;
  overflow-y: scroll;
  height: 80%;
}
.puBox .pu .content section {
  margin-bottom: 0.333333rem;
  text-align: left;
}
.puBox .pu .content section .name {
  font-size: 0.453333rem;
  color: #00c7ac;
  line-height: 1.5em;
}
.puBox .pu .content section p {
  font-size: 0.373333rem;
  line-height: 1.4em;
  opacity: 0.8;
}
.puBox .pu .close {
  width: 70%;
  margin: 4% auto;
  text-align: center;
  padding: 0.2rem 0.5rem;
  border-radius: 0.533333rem;
  border: 0.013333rem solid #00c7ac;
  color: #00c7ac;
  font-size: 0.506667rem;
}
</style>
