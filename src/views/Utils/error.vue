<template>
  <div class="container">
    <div class="error-main">
      <img src="@/assets/Utils/error.jpg" />
      <div class="btn">
        <div class="refresh" @click="refresh">
          <i>
            <img src="@/assets/Utils/refresh.png" alt />
          </i>
          <span>刷新页面</span>
        </div>
        <div class="network" @click="network">
          <i>
            <img src="@/assets/Utils/checkNetWork.png" alt />
          </i>
          <span>检测网络</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
Vue.use(vant);

export default {
  data() {
    return {};
  },
  methods: {
    // 刷新页面
    refresh() {
      window.history.back();
    },
    // 检测网络
    network() {
      if(window.navigator.onLine){
        vant.Toast("网络正常，请稍后再次刷新页面");
        console.log('网络正常！');
      }else{
        vant.Toast("网络中断，请检查网络后再次刷新页面");
        console.log('网络中断！');
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/Error/erroe.scss";

.error-main>img{
  padding-top: 50px;
}
</style>
