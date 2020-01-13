<template>
  <div class="container">
    <header class="header flex_row-between pct100">
      <div class="flex2 tl">
        <img src="@/assets/AppShare/d_header_img2@2x.png" class="img" />
      </div>
      <div class="flex3">
        <img src="@/assets/AppShare/d_header_img1@2x.png" class="img header_text" />
      </div>
    </header>
    <section class="first_section">
      <img src="@/assets/AppShare/d_title1@2x.png?t=20180122" alt class="title" />
      <img src="@/assets/AppShare/d_content1@2x.jpg?t=20180122" alt class="content" />
    </section>
    <section>
      <img src="@/assets/AppShare/d_title2@2x.png?t=20180122" alt class="title" />
      <img src="@/assets/AppShare/d_content2@2x.jpg?t=20180122" alt class="content" />
    </section>
    <section>
      <img src="@/assets/AppShare/d_title3@2x.png" alt class="title" />
      <img src="@/assets/AppShare/d_content3@2x.jpg" alt class="content" />
    </section>
    <section>
      <img src="@/assets/AppShare/d_title4@2x.png" alt class="title" />
      <img src="@/assets/AppShare/d_content4@2x.jpg" alt class="content" />
    </section>
    <section>
      <img src="@/assets/AppShare/d_title5@2x.png" alt class="title" />
      <img src="@/assets/AppShare/d_content5@2x.jpg" alt class="content" />
    </section>
    <p class="explain">*当前活动仅针对广安、玉林地区有效</p>
    <div class="btn_wrapper_inner">
      <div @click="linkto_passenger" id="linkto_passenger" class="linkto_driver btn red">
        <a>
          了解乘客特别优惠
          <i>
            <img src="@/assets/AppShare/red_arrow@2x.png" alt="">
          </i>
        </a>
      </div>
      <div @click="linkto_contractor" id="linkto_contractor" class="linkto_driver btn orange">
        <a>
          了解大巴承包者奖励
          <i>
            <img src="@/assets/AppShare/red_arrow@2x.png" alt="">
          </i>
        </a>
      </div>
    </div>
    <footer>
      <div class="logoBox">
        <img src="@/assets/AppShare/logo_no_border.png" class="logo" />
        <span class="txt">爱运宝</span>
      </div>
      <div class="name">成都爱运科技有限公司</div>
    </footer>

    <div @click="download" id="download_btn" class="btn_wrapper_outer">
      <div class="download_btn btn blue">
        <div>点击免费注册/下载</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      data: {}
    };
  },
  methods: {
    // 获取参数
    getData() {
      this.url = window.location.href;
      var url = this.url;
      if (url.indexOf("?") !== -1) {
        var search = url.substring(url.indexOf("?") + 1);
        var queryArray = search.split("&");
        queryArray.forEach(function(item) {
          var itemArray = item.split("=");
          var key = itemArray[0];
          var value = decodeURIComponent(itemArray[1])
            ? decodeURIComponent(itemArray[1])
            : "";
          this.data[key] = value;
        });
      }
      console.log(this.data);
    },
    // 了解乘客详情
    linkto_passenger() {
      this.$router.push({ path: "recommend_passenger", query: this.data });
    },
    // 了解大巴车经营者详情
    linkto_contractor() {
      this.$router.push({ path: "recommend_contractor", query: this.data });
    },
    // 去注册下载
    download() {
      this.$router.push({ path: "registerForm", query: this.data });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
@import "../../styles/AppShare/newRecommend2.css";
</style>
