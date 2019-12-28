<template>
    <div class="upload-main">
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
      <input type="tel" placeholder="电话" class="input_tel" maxlength="12" />
      <input type="text" placeholder="姓名" class="input_name" maxlength="10" />
      <div class="submit">提交联系信息</div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  props: {},
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../styles/Authen/quick-upload.scss";

</style>
