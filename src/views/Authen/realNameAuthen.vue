<template>
  <div
    class="container"
    v-loading="loading"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="authen-main">
      <p>信息仅用于审核，绝对保密</p>
      <div class="input input_style">
        <span>真实姓名</span>
        <input v-model.trim="name" id="name" type="text" />
      </div>
      <div class="input input_style">
        <span>身份证号</span>
        <input v-model.trim="ID" id="id" type="text" />
      </div>
      <!--<ul>-->
      <!--<li>-->
      <!--<span>身份证正面照</span>-->
      <!--<img id="img1" src="../img/id-card-front-add.jpg" alt=""/>-->
      <!--&lt;!&ndash;<input class="file1" type="file" accept="image/jpeg,image/gif,image/png,image/jpg">&ndash;&gt;-->
      <!--</li>-->
      <!--<li>-->
      <!--<span>身份证反面照</span>-->
      <!--<img id="img2" src="../img/id-card-back-add.jpg" alt=""/>-->
      <!--&lt;!&ndash;<input class="file2" type="file" accept="image/jpeg,image/gif,image/png,image/jpg" >&ndash;&gt;-->
      <!--</li>-->
      <!--<li>-->
      <!--<span>手持身份证半身照</span>-->
      <!--<img id="img3" src="../img/id-card-hand-add.jpg" alt=""/>-->
      <!--&lt;!&ndash;<input class="file3" type="file" accept="image/jpeg,image/gif,image/png,image/jpg" >&ndash;&gt;-->
      <!--</li>-->
      <!--</ul>-->
      <div @click="submitPassengerRealNameInfo" id="submit" class="submit-btn">确认提交</div>
    </div>
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
      param: [],

      passengerInfo: [], // 获取的实名认证信息
      name: "",
      ID: "",

    };
  },
  methods: {
    //获取实名认证审核信息
    getPassengerRealNameInfo() {
      let params = {
        user_id: this.param.user_id
      };
      this.loadText = "获取中...";
      this.loading = true;
      let url = this.$global_msg.getPassengerRealNameInfo;
      this.axios.post(url, params).then(res => {
        console.log(res);
        this.loading = false;
        var res = res.data;
        if (res && res.status == 1) {
          this.passengerInfo = res.data;
          this.showPassengerRealNameInfo();
        } else {
          vant.Toast(res.msg);
        }
      }).catch(err => {
        console.log("err===", err);
        this.loading = false;
      })
    },

    //显示乘客认证信息
    showPassengerRealNameInfo() {
      var passengerInfo = this.passengerInfo;
      if (passengerInfo) {
        this.name = passengerInfo.name;
        this.ID = passengerInfo.ID;
        if (passengerInfo.authentication_status == 0 || passengerInfo.authentication_status == -1) { //未提交认证 数据无效
          $("input").attr("readonly", false);
          $("#submit").removeClass("none").addClass("submit-btn");
        } else if (passengerInfo.authentication_status == 1 || passengerInfo.authentication_status == 2 || passengerInfo.authentication_status == 3) { //审核中 成功
          
          $("input").attr("readonly", true);
          $("#submit").removeClass("submit-btn").addClass("none");

        } else if (passengerInfo.authentication_status == -2) { //失败
          $("input").attr("readonly", false);
          $("#submit").removeClass("none").addClass("submit-btn");
        }
      }
    },

    //提交实名信息
    submitPassengerRealNameInfo() {
      let name =this.name;
      let ID = this.ID;
      if (name == "") {
        vant.Toast("请输入姓名");
        return;
      }
      if (ID == "") {
        vant.Toast("请输入身份证号");
        return;
      }
      let params = {
        user_id: this.param.user_id,
        name: name,
        ID: ID
      };
      this.loadText = "提交中...";
      this.loading = true;
      let url = this.$global_msg.submitPassengerRealNameInfo;
      this.axios.post(url, params).then(res => {
        console.log(res);
        this.loading = false;
        var res = res.data;
        if (res && res.status == 1) {
          $("input").attr("readonly", true);
          $("#submit").removeClass("submit-btn").addClass("none");
          vant.Toast(res.msg);
        } else {
          vant.Toast(res.msg);
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    },
  },
  created() {},
  mounted() {
    this.param = {
      bus_no: 308,
      user_id: "3e4414e6-f287-4d6b-b194-4cb1624e8627"
    };
    this.getPassengerRealNameInfo();
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>

<style lang="scss" scoped>
@import "../../styles/Authen/authen.scss";

.input_style {
  margin-right: 20px !important;
  margin-left: 20px !important;
}
</style>
