<template>
  <div class="container">
    <img src="@/assets/AppShare/bg_bus.jpg" class="pct100">
    <header class="contractor-header-wrapper">
        <img src="@/assets/AppShare/title.png" class="pct75">
    </header>
    <section>
        <img src="@/assets/AppShare/contractor_title0.png" class="title">
        <img src="@/assets/AppShare/contractor_content0.jpg" class="content">
        <p class="description  tc">注册并为班车排班后，推荐每位大巴车乘客注册都即获现金奖，每月增收过万</p>
    </section>
    <section>
        <img src="@/assets/AppShare/contractor_title1.png" class="title">
        <img src="@/assets/AppShare/contractor_content1.jpg" class="content">
        <p class="description  tc">更多乘客能联系乘坐您的大巴车</p>
    </section>
    <section>
        <img src="@/assets/AppShare/contractor_title2.png" class="title">
        <img src="@/assets/AppShare/contractor_content2.jpg" class="content">
        <p class="description  tc">大巴车车主/司机/售票员能主动联系到精准乘客，提高上座率</p>
    </section>
    <section>
        <img src="@/assets/AppShare/contractor_title3.png" class="title">
        <img src="@/assets/AppShare/contractor_content3.jpg" class="content">
        <p class="description  tc">车辆首次排班即获现金大奖，即时提现</p>
    </section>
    <section>
        <img src="@/assets/AppShare/contractor_title4.png" class="title">
        <img src="@/assets/AppShare/contractor_content4.jpg" class="content">
        <p class="description  tc">管理司机、售票员、行驶线路，实时定位车辆</p>
    </section>
    <section>
        <img src="@/assets/AppShare/contractor_title5.png" class="title">
        <img src="@/assets/AppShare/contractor_content5.jpg?t=20180410" class="content">
        <p class="description  tc">平台可代快速注册认证，您只需提供您或亲友的大巴车相关信息，剩下的就是获即时现金大奖及永久性提成</p>
    </section>
    <section>
        <img src="@/assets/AppShare/contractor_title6.png" class="title">
        <img src="@/assets/AppShare/contractor_content6.jpg" class="content">
        <p class="description  tc">无任何使用费用</p>
    </section>
    <!-- <div class="btn_wrapper_inner">
    <div id="linkto_passenger" class="linkto_driver btn red">
        <a>了解乘客特别优惠
            <span class="arrow red"></span>
        </a>
    </div>
    <div id="linkto_driver" class="linkto_driver btn blue">
        <a>了解司机特别优惠
            <span class="arrow blue"></span>
        </a>
    </div>
</div> -->
    <footer>
        <div class="logoBox">
            <img src="@/assets/AppShare/logo_no_border.png" class="logo">
            <span class="txt">爱运宝</span>
        </div>
        <div class="name">成都爱运科技有限公司</div>
    </footer>

    <div @click="download" id="download_btn" class="btn_wrapper_outer">
        <div class="download_btn btn orange">
          <!-- <router-link :to="{path: 'registerForm', query: data}">点击免费注册/下载</router-link> -->
          <div>点击免费注册/下载</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: "",
      data: {},
    }
  },
  methods: {
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
          this.data[key] = value;
        })
      }
      console.log(this.data)
    },
    download() {
      this.$router.push({path: 'registerForm', query: this.data})
    }
  },
  mounted () {
    this.getData();
  }
}
</script>

<style scoped>
@import "../../styles/AppShare/newRecommend2.css";
</style>
