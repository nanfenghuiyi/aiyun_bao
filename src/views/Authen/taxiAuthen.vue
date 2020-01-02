<template>
  <div class="container" v-loading="loading" :element-loading-text="loadText" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="authen-main">
      <p>信息仅用于审核，绝对保密</p>
      <div id="select-city" class="authen-title">
        <span>城市</span>
        <div class="authen-title-city">
          <input id="city" type="text" placeholder="请选择注册城市" value="" readonly />
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="input authen-item">
        <span>公司名称</span>
        <input id="company-name" type="text" placeholder="输入公司全称" value="" />
      </div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="实名信息" name="1">
          <div id="realName" class="authen-item">
            <div class="input">
              <span>真实姓名</span>
              <input id="name" type="text" placeholder="输入姓名" value="" />
            </div>
            <div class="input">
              <span>身份证号</span>
              <input id="id" type="text" value="" placeholder="输入身份证号" />
            </div>
            <ul>
              <li onclick="showImg(0)">
                <span>身份证正面照</span>
                <img id="img1" src="@/assets/Authen/id-card-front-add.jpg" alt="" />
                <div id="img1-status" class="authen-status none">
                  <span></span>
                  <b>审核中...</b>
                </div>
              </li>
              <li onclick="showImg(1)">
                <span>身份证反面照</span>
                <img id="img2" src="@/assets/Authen/id-card-back-add.jpg" alt="" />
                <div id="img2-status" class="authen-status none">
                  <span></span>
                  <b>审核失败<br />点击重新上传</b>
                </div>
              </li>
            </ul>
          </div>
        </el-collapse-item>
        <el-collapse-item title="驾驶证信息" name="2">
          <div id="driver-license" class="authen-item">
            <div id="first-date" class="input" @click="checkTime(1)">
              <span>初次领证日期</span>
              <input id="first-issue" type="text" class="ui-date-scroll" placeholder="选择日期" value="" readonly />
            </div>
            <ul>
              <li onclick="showImg(2)">
                <span>驾驶证照</span>
                <img id="img3" src="@/assets/Authen/driver-license-front-add.jpg" alt="" />
                <div id="img3-status" class="authen-status none">
                  <span></span>
                  <b>审核中...</b>
                </div>
              </li>
            </ul>
          </div>
        </el-collapse-item>
        <el-collapse-item title="行驶证信息" name="3">
          <div id="driving-license" class="authen-item">
            <div class="input">
              <span>车牌号码</span>
              <div class="item-right">
                <div id="plate-no-short-box" class="item-right-box" @click="checkPlate">
                  <input id="plate-no-short" placeholder="车牌简称" type="text" value="" readonly />
                  <i class="el-icon-caret-right"></i>
                </div>
                <input id="plate-no" placeholder="输入车牌号码" maxlength="6" type="text" value="" />
              </div>
            </div>
            <div class="input">
              <span>车辆所有人</span>
              <input id="vehicle-owner" type="text" value="" placeholder="输入姓名" />
            </div>
            <div class="input" @click="checkTime(2)">
              <span>行驶证注册日期</span>
              <input id="register-date" class="ui-date-scroll" type="text" placeholder="选择日期" value="" readonly />
            </div>
            <ul>
              <li onclick="showImg(3)">
                <span>行驶证正本照</span>
                <img id="img4" src="@/assets/Authen/driving-license-front-add.jpg" alt="" />
                <div id="img4-status" class="authen-status none">
                  <span></span>
                  <b>审核中...</b>
                </div>
              </li>
              <li onclick="showImg(4)">
                <span>行驶证副本照</span>
                <img id="img5" src="@/assets/Authen/driving-license-back-add.jpg" alt="" />
                <div id="img5-status" class="authen-status none">
                  <span></span>
                  <b>审核中...</b>
                </div>
              </li>
            </ul>
          </div>
        </el-collapse-item>
        <el-collapse-item title="人车合照" name="4">
          <div id="photo-person-car" class="authen-item">
            <ul>
              <li onclick="showImg(5)">
                <span>人车合照</span>
                <img id="img6" src="@/assets/Authen/person-car-add.jpg" alt="" />
                <div id="img6-status" class="authen-status none">
                  <span></span>
                  <b>审核中...</b>
                </div>
              </li>
            </ul>
          </div>
        </el-collapse-item>
        <el-collapse-item title="服务证信息" name="5">
          <div class="input authen-item">
            <span>服务证号</span>
            <input id="qualification-no" type="text" value="" placeholder="输入证件号码" />
          </div>
          <div id="taxi" class="authen-item">
            <ul>
              <li onclick="showImg(6)">
                <span>服务证照</span>
                <img id="img7" src="@/assets/Authen/taxi-qualification-add.jpg" alt="" />
                <div id="img7-status" class="authen-status none">
                  <span></span>
                  <b>审核中...</b>
                </div>
              </li>
            </ul>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div id="submit" class="submit-btn">
        确认提交
      </div>
    </div>
    <!-- 上传照片 -->
    <div>
      <el-drawer
        :visible.sync="drawer"
        :show-close="false"
        size="56%"
        direction="btt"
      >
        <div class="title" v-text="drawerTitle">
          身份证正面照
        </div>
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
    <!-- 时间选择 -->
    <div class="time">
      <el-drawer
        :visible.sync="timeDrawer"
        :show-close="false"
        :wrapperClosable="false"
        size="40%"
        direction="btt"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="timeConfirm"
          @cancel="timeCancel"
          @change="getValues"
        />
      </el-drawer>
    </div>
    <!-- 车牌简称 -->
    <div class="bus-plate">
      <el-drawer
        :visible.sync="plateDrawer"
        :show-close="false"
        size="70%">
        <div class="innerDrawer">
          <ul class="list-style">
            <li v-for="(item, index) in plateShortList" :key="index" @click="carPlateSelect(item)">{{item}}</li>
          </ul>
          <el-drawer
            :append-to-body="true"
            :visible.sync="innerDrawer"
            :show-close="false">
            <ul class="list-style">
              <li v-for="(item, index) in plateletterList" :key="index" @click="plateletterSelect(item)">{{item}}</li>
            </ul>
          </el-drawer>
        </div>
      </el-drawer>
    </div>
    <!-- 车辆颜色 -->
    <div class="bus-color">
      <el-drawer
        :visible.sync="colorDrawer"
        :show-close="false"
        size="45%">
        <ul class="list-style">
          <li v-for="(item, index) in carColorList" :key="index" @click="carColorSelect(item.name)">{{item.name}}</li>
        </ul>
      </el-drawer>
    </div>
    <!-- 车辆类型 -->
    <div class="bus-type">
      <el-drawer
        :visible.sync="typeDrawer"
        :show-close="false"
        size="70%">
        <div class="innerDrawer">
          <ul class="list-style">
            <li v-for="(item, index) in carTypeList1" :key="index" @click="carTypeSelect1(item.type)">{{item.bus_class_name}}</li>
          </ul>
          <div class="x">
            <el-drawer
              :append-to-body="true"
              :visible.sync="innerTypeDrawer"
              :show-close="false"
              size="45%">
              <ul class="list-style">
                <li v-for="(item, index) in carTypeList2" :key="index" @click="carTypeSelect2(item.bus_class_name)">{{item.bus_class_name}}</li>
              </ul>
            </el-drawer>
          </div>
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
      activeNames: ["1", "2", "3", "4", "5"],
      param: [],

      busInfo: [], // 获取的认证信息
      name: "",
      image: "", // 大巴车图片
      plate_no_short: "", // 车牌简称
      plate_no_alpha: 1, // 首字母
      short: "", // 页面显示的简称
      plate_no: "", // 车牌号码
      color: "", // 大巴车颜色
      seats: "", // 大巴车核定人数
      type: "", //	大巴车类型
      bus_no: 0, // 更新时传递

      flag: true, //阻止点击事件
      drawerDisabled: false, // 阻止照片显示点击事件
      carShortDisabled: false, // 阻止车牌简称显示点击事件
      carColorDisabled: false, // 阻止车辆颜色显示点击事件
      carTypeDisabled: false, // 阻止车辆类型显示点击事件
      drawer: false, // 上传照片显示
      realNameStatusTitle: "审核中...", // 上传图片状态title
      titleShow: false, // 上传图片状态title显示
      imgIndex: 0, // 选择的图片
      /* 时间插件 */
      currentDate: new Date(),
      minDate: new Date(1999, 0, 1),
      maxDate: new Date(2029, 12, 31),
      timeDrawer: false, // 时间选择显示
      // 多层抽屉
      drawerTitle: "", // 抽屉的标题
      plateDrawer: false, // 车牌简称
      plateShortList: [], // 简称列表
      innerDrawer: false, // 车牌简称
      plateletterList: [], // 字母列表
      colorDrawer: false, // 车辆颜色
      carColorList: [], // 颜色列表
      typeDrawer: false, // 车辆类型
      carTypeList1: [], // 类型列表
      carTypeList2: [], // 类型列表
      innerTypeDrawer: false, // 车辆类型
    };
  },
  components: {},
  props: {},
  watch: {},
  computed: {},
  methods: {
    handleChange(val) {
      console.log(val);
    },
    // 时间选择
    checkTime() {
      if (!this.drawerDisabled) {
        this.timeDrawer = true;
      }
    },
    // 时间确认
    timeConfirm(){
      if (this.first_issue_time != "") {
        this.timeDrawer = false;
        this.first_issue = new Date((this.first_issue_time + " 00:00:00").replace(/-/g, "/")).getTime();
      }else {
        vant.Toast("请滚动选择时间")
      }
    },
    getValues(e) {
      let times = e.getValues();
      this.first_issue_time = `${times[0]}-${times[1]}-${times[2]}`;
    },
    // 时间取消
    timeCancel(){
      this.timeDrawer = false;
    },
    // 图片选择
    showImg(index) {
      if (!this.drawerDisabled) {
        this.drawerTitle = this.$refs.title.innerText;
        // console.log("showImg===", index);
        this.drawer = true;
        this.imgIndex = index;
      }
    },
    // 车牌简称显示
    checkPlate() {
      if (!this.carShortDisabled) {
        this.plateDrawer = true;
        this.plateShortList = this.$global_msg.plateShortList;
      }
    },
    // 车辆颜色显示
    checkColor() {
      if (!this.carColorDisabled) {
        this.colorDrawer = true;
        this.carColorList = this.$global_msg.color;
      }
    },
    // 车辆类型显示
    checkType () {
      if (!this.carTypeDisabled) {
        this.typeDrawer = true;
        this.getBusType1();
      }
    },
    // 车牌简称选择
    carPlateSelect(item) {
      this.innerDrawer = true;
      this.plate_no_short = item;
      this.plateletterList = this.$global_msg.plateletterList;
    },
    plateletterSelect(item) {
      this.plateDrawer = false;
      this.innerDrawer = false;
      this.plate_no_alpha = item;
      this.short = this.plate_no_short + this.plate_no_alpha;
    },
    // 车辆颜色选择
    carColorSelect(item) {
      this.colorDrawer = false;
      this.color = item;
    },
    // 车辆类型选择
    carTypeSelect1(type) {
      this.innerTypeDrawer = true;
      this.getBusType2(type);
    },
    carTypeSelect2(type) {
      this.typeDrawer = false;
      this.innerTypeDrawer = false;
      this.type = type;
    },
    /**
     * 选择上传图片
     * @param index 选取上传下标
     */

    /**
     * 图片上传
     * @param index 图片id
     * @param base64 图片base64
     * @param type 上传的类型1234567 身份证，驾驶证，行驶证，人车合照，上岗证，从业资格证, 大巴车资质照
     * @param extra 正反面 A、B
     * @param last_file 上次回传的文件名（服务器上的路径
     */
    uploadPicture(index, base64, type, extra, last_file) {
      this.loadText = "正在上传...";
      this.loading = true;
      var that = this;
    },

  },
  created() {},
  mounted() {
    this.param = {bus_no : 308, user_id: "3e4414e6-f287-4d6b-b194-4cb1624e8627"};
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";

</style>

<style lang="scss" scoped>
@import "../../styles/Authen/authen.scss";

</style>
