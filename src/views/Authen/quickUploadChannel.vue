<template>
  <div class="upload-main">
    <p class="text">
      您使用以下方式的任何一种方式，向平台所提供的，每一辆大巴车信息，经过平台核实后，
      <span>您都将得到即时现金大奖及永久性提成</span>
      ,奖金在本【爱运宝】APP的左上角的“我”里的“钱包”中可查询及提现
    </p>
    <ul class="select-channel">
      <li>
        <p>1.选择快速代注册认证求助通道，我们将为您和您的亲友快速注册认证</p>
        <router-link to="/quickAuthen">
          <span>快速代注册认证求助通道</span>
          <span>点击进入</span>
        </router-link>
      </li>
      <li id="card-box">
        <p>2.选择上传大巴车随车名片快速录入注册，您需要提交大巴车随车名片一张</p>
        <router-link to="/cardAuthen">
          <span>上传大巴车随车名片快速注册</span>
          <span>点击进入</span>
        </router-link>
      </li>
    </ul>
    <ul class="demo-picture">
      <li>
        <span>正面图样</span>
        <el-image 
          style="width: 150px; height: 100px"
          :src="srcList[0]" 
          :preview-src-list="srcList"
          alt="demo">
        </el-image>
        <span>点击查看大图</span>
      </li>
      <li>
        <span>反面图样</span>
        <el-image 
          style="width: 150px; height: 100px"
          :src="srcList[1]" 
          :preview-src-list="srcList"
          alt="demo">
        </el-image>
        <span>点击查看大图</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      srcList: [require('@/assets/Authen/card_face_demo.jpg'), require('@/assets/Authen/card_back_demo.jpg')]
    };
  },
  components: {},
  props: {},
  watch: {},
  computed: {},
  methods: {
    getUploaderStatus() {

    }
  },
  created() {},
  mounted() {
    // console.log(this.$global_msg.user_id)
    console.log(this.$global_msg.getShareQR)
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/Authen/quick-upload.scss";
</style>
