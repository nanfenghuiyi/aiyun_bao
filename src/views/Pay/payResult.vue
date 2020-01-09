<template>
  <div
    class="container"
    v-loading="loading"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="pay-result-main">
      <div class="success none">
        <img src="@/assets/Pay/icon_pay_result_success.png" />
        <span>支付成功</span>
      </div>
      <div class="failure none">
        <img src="@/assets/Pay/icon_pay_result_failure.png" />
        <span>支付失败</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      loadText: "获取中",
    };
  },
  computed: {},
  methods: {
    /**
     * 获取支付结果信息
     */
    getPayResultInfo() {
      this.loadText = "正在获取";
      this.loading = true;
      let url = this.$global_msg.getPayResult;
      let params = this.param;
      this.axios.post(url, params).then(res => {
        this.loading = false;
        var res = res.data;
        console.log(res);
        if (res.status == 1) {
          $(".success").removeClass("none").addClass("pay-result-content");
          $(".success span").text(res.msg);
        } else {
          $(".failure").removeClass("none").addClass("pay-result-content");
          $(".failure span").text(res.msg);
        }
      })
      .catch(err => {
        console.log("err===", err);
        this.loading = false;
      });
    }
  },
  mounted() {
    this.getPayResultInfo();
  }
};
</script>

<style lang="scss" scoped>
.container{
  height: 100%;
}
.pay-result-main {
  width: 100%;
  height: 100%;
  background-color: white;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .pay-result-content {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .success span {
    color: #1f7403;
    font-size: 0.35rem;
    margin-top: 0.1rem;
  }
  .failure span {
    color: #b92722;
    font-size: 0.35rem;
    margin-top: 0.1rem;
  }
}
.none{
  display: none;
}
</style>
