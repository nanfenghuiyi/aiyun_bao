<template>
    <div class="upload-main" v-loading="loading" :element-loading-text="loadText" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
      <p>极速认证及求助指南</p>
      <p class="text">
        如果您是客运汽车站管理者/车队长/车主，并且能提供
        <span>客运大巴的车辆信息，线路信息，承包人信息，驾驶员/随车售票员信息</span>
        等，请留下您的联系方式。
      </p>
      <p class="text">
        您提交的每辆大巴车信息核实后，您都将
        <span>得即时现金大奖及永久性提成</span>
      </p>
      <p class="text">
        如果您在资料上传过程中
        <span>遇到任何问题或麻烦</span>
        ，您也可以留下联系方式，我们将主动帮助您解决问题
        <span>(包括代您或您的亲友完成大巴车注册认证)</span>
        ，让您省心、省时、更方便。
      </p>
      <p>联系信息：</p>
      <input type="tel" placeholder="电话" v-model.trim="phone" class="input_tel" maxlength="11" />
      <input type="text" placeholder="姓名" v-model.trim="user_name" class="input_name" maxlength="10" />
      <div class="submit" @click="leaveWords">提交联系信息</div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      loadText: "正在提交...",
      phone: "",
      user_name: "",
    };
  },
  methods: {
    // 提交信息
    leaveWords() {
      this.focus = true;
      var tel_reg = /^1(3|4|5|7|8)[0-9]\d{8}$/;
      var name_reg = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/; // 只允许有中文字符或.
      if (!this.phone) {
        vant.Toast("请输入电话号码");
        return;
      } else if (!tel_reg.test(this.phone)) {
        vant.Toast("请输入正确的电话号码");
        return;
      }
      if (!this.user_name) {
        vant.Toast("请输入姓名");
        return;
      } else if (!name_reg.test(this.user_name)) {
        vant.Toast("请输入中文名字");
        return;
      }
      this.loading = true;
      var url = this.$global_msg.leaveWords;
      var obj = {user_id: this.param.user_id, user_name: this.user_name, phone: this.phone}
      this.axios.post(url, obj).then(res => {
        console.log("res", res);
        var res = res.data;
        this.loading = false;
        if (res) {
          if (res.status == 1) {
            this.user_name = "";
            this.phone = "";
            vant.Toast(res.msg);
          } else {
            vant.Toast(res.msg);
          }
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/Authen/quick-upload.scss";

</style>
