<template>
  <div
    class="main"
    v-loading="loading"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="content bottom-border">
      <input
        id="phone"
        maxlength="11"
        @input="getParams()"
        type="tel"
        v-model="phone"
        placeholder="请输入要添加的雇员的手机号"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      loadText: "正在保存...",
      param: [],
      phone: "",
      user_id: ""
    };
  },
  components: {},
  props: {},
  watch: {},
  computed: {},
  methods: {
    getParams() {
      if (this.phone.length == 11) {
        var params = {
          phone: this.phone,
          user_id: this.param.user_id
        };
        this.loading = true;
        var url = this.$global_msg.checkUserExist;
        this.axios
          .post(url, params)
          .then(res => {
            console.log(res);
            var res = res.data;
            if (res.status == 1) {
              vant.Toast(res.msg);
              console.log(res.data);
              this.$router.push({path:'/busEmployeesAuthen',query: {token:res.data}})
              // window.location.href = "./newBusEmployeesAuthen.html?token=" + res.data;
            } else {
              vant.Toast(res.msg);
              this.phone = "";
            }
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      }
    }
  },
  created() {},
  mounted() {
    this.param.user_id = this.$global_msg.user_id;
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  font-size: 14px;
  .content {
    width: 90%;
    margin: 0 auto;
    margin-top: 10px;
    input {
      border: none;
      font-size: 16px;
      text-align: center;
      max-lines: 1;
      padding: 10px 8px;
      width: 100%;
    }
  }
}
</style>
