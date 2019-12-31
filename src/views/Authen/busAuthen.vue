<template>
  <div class="container" v-loading="loading" :element-loading-text="loadText" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="authen-main">
      <p>信息仅用于审核，绝对保密</p>
      <div id="realName" class="authen-item">
        <div class="input">
          <span>业户名称</span>
          <input id="name" placeholder="例：某运输有限公司" type="text" value />
        </div>
        <div class="input">
          <span>车牌号码</span>
          <div class="item-right">
            <div id="plate-no-short-box" class="item-right-box" @click="checkPlate">
              <input id="plate-no-short" placeholder="车牌简称" type="text" value readonly />
              <i class="el-icon-caret-right"></i>
            </div>
            <input id="plate-no" placeholder="输入车牌号码" maxlength="7" type="text" value />
          </div>
        </div>
        <div class="input">
          <span>车辆颜色</span>
          <div class="item-right">
            <input id="plate-color" placeholder="车辆颜色" type="text" value readonly />
          </div>
        </div>
        <div class="input">
          <span>车辆类型</span>
          <div class="item-right">
            <input id="plate-type" placeholder="车辆类型" type="text" value readonly />
          </div>
        </div>
        <div class="input">
          <span>核载客量</span>
          <div class="item-right">
            <input
              class="center"
              id="plate-seats"
              maxlength="2"
              placeholder="车辆核载客量"
              type="text"
              value
            />
          </div>
          <span>座</span>
        </div>
        <ul>
          <li @click="showImg(0)">
            <span ref="title">道路运输许可证</span>
            <img id="img1" src="@/assets/Authen/road-transport-permit-add.jpg" alt />
            <div v-if="titleShow">
              <b v-text="realNameStatusTitle"></b>
            </div>
          </li>
        </ul>
      </div>
      <div id="submit" class="submit-btn">确认提交</div>
    </div>
    <!-- 上传照片 -->
    <div>
      <el-drawer
        :title="drawerTitle"
        :visible.sync="drawer"
        :show-close="false"
        size="56%"
        direction="btt"
      >
        <div class="content">
          <div class="legend">
            <img src="@/assets/Authen/id-card-front-demo.jpg" />
            <p>请按照示例图提交身份证正面照</p>
            <p>确保照片真实有效、文字清晰、无反光、无遮挡</p>
          </div>
          <div class="upload-btn">
            <span>上传照片</span>
            <input
              id="file"
              class="file"
              type="file"
              accept="image/jpeg, image/gif, image/png, image/jpg"
              @change="checkImg(imgIndex)"
            />
          </div>
        </div>
      </el-drawer>
    </div>
    <!-- 车牌简称 -->
    <div class="bus-plate">
      <el-drawer
        :visible.sync="plateDrawer"
        :show-close="false"
        size="70%">
        <div class="innerDrawer">
          <el-button @click="innerDrawer = true">打开里面的!</el-button>
          <el-drawer
            :append-to-body="true"
            :visible.sync="innerDrawer"
            :show-close="false">
            <p>_(:зゝ∠)_</p>
          </el-drawer>
        </div>
      </el-drawer>
    </div>
    <!-- 车辆颜色 -->
    <div class="bus-color">
      <el-drawer
        :visible.sync="colorDrawer"
        :show-close="false"
        size="70%">
      </el-drawer>
    </div>
    <!-- 车辆类型 -->
    <div class="bus-type">
      <el-drawer
        :visible.sync="typeDrawer"
        :show-close="false"
        size="70%">
        <div class="innerDrawer">
          <el-button @click="innerDrawer = true">打开里面的!</el-button>
          <el-drawer
            :append-to-body="true"
            :visible.sync="innerTypeDrawer"
            :show-close="false">
            <p>_(:зゝ∠)_</p>
          </el-drawer>
        </div>
      </el-drawer>
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
      disabled: false,
      param: [],

      busEmployeesInfo: [], // 获取的认证信息
      name: "",
      ID: "",
      __token__: "", // 雇员token
      type: 1, // 经营者类型 1：司机 2： 售票员
      image_id_a: "", // 身份证人像面照片
      image_id_b: "", // 身份证国徽面照片
      image_drivers: "", // 雇员的驾驶证照片
      first_issue: "", // 雇员初次领取驾照日期
      img1: "",
      img2: "",
      img3: "",
      first_issue_time: "", // 显示的时间

      flag: true, //阻止点击事件
      drawerDisabled: false, // 阻止照片显示点击事件
      drawer: false, // 上传照片显示
      realNameStatusTitle: "审核中...", // 上传图片状态title
      titleShow: false, // 上传图片状态title显示
      imgIndex: 0, // 选择的图片
      drawerTitle: "", // 抽屉的标题
      // 多层抽屉
      plateDrawer: false, // 车牌简称
      innerDrawer: false, // 车牌简称
      colorDrawer: false, // 车辆颜色
      typeDrawer: false, // 车辆类型
      innerTypeDrawer: false, // 车辆类型
    };
  },
  components: {},
  props: {},
  watch: {},
  computed: {},
  methods: {
    // 图片选择
    showImg(index) {
      if (!this.drawerDisabled) {
        this.drawerTitle = this.$refs.title.innerText;
        // console.log("showImg===", index);
        this.drawer = true;
        this.imgIndex = index;
      }
    },
    // 车牌简称选择
    checkPlate() {
      this.plateDrawer = true;
    },
  },
  created() {},
  mounted() {
    this.param.user_id = this.$global_msg.user_id;
    console.log(this.param);
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";

</style>

<style lang="scss" scoped>
@import "../../styles/Authen/authen.scss";

.authen-item{
  padding: 0 20px;
}
</style>
