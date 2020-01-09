<template>
  <div class="container" v-loading="loading" :element-loading-text="loadText" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="authen-main">
      <p>选择认证的身份类型</p>
      <router-link to="/expressAuthen" class="authen-select-title m-t-25">
        <span>快车/顺风车</span>
        <i class="el-icon-arrow-right"></i>
      </router-link>
      <router-link to="/taxiAuthen" class="authen-select-title m-t-25">
        <span>出租车</span>
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </div> 
  </div>
</template>

<script>
import $ from "jquery";
import { canvasDataURL } from "../../utils/util";
import Vue from "vue";
Vue.use(vant);

export default {
  data() {
    return {
      loading: false,
      loadText: "图片上传中",

    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/Authen/authen.scss";

.m-t-25{
  margin-top: 25px;
}
</style>
