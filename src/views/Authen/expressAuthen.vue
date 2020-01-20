<template>
  <div class="container" v-loading="loading" :element-loading-text="loadText" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="authen-main">
      <p>信息仅用于审核，绝对保密</p>
      <div id="select-city" class="authen-title" @click="showCity">
        <span>城市</span>
        <div class="authen-title-city">
          <input id="city" v-model.trim="cityValue" type="text" placeholder="请选择注册城市" value="" readonly />
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="实名信息" name="1">
          <div id="realName" class="authen-item">
            <div class="input">
              <span>真实姓名</span>
              <input id="name" v-model.trim="name" type="text" placeholder="输入姓名" value="" />
            </div>
            <div class="input">
              <span>身份证号</span>
              <input id="id" v-model.trim="ID" type="text" value="" placeholder="输入身份证号" />
            </div>
            <ul>
              <li @click="showImg(0)">
                <span ref="title0">身份证正面照</span>
                <img id="img1" src="@/assets/Authen/id-card-front-add.jpg" alt="" />
                <div v-if="titleShow">
                  <b v-text="realNameStatusTitle1"></b>
                </div>
              </li>
              <li @click="showImg(1)">
                <span ref="title1">身份证反面照</span>
                <img id="img2" src="@/assets/Authen/id-card-back-add.jpg" alt="" />
                <div v-if="titleShow">
                  <b v-text="realNameStatusTitle1"></b>
                </div>
              </li>
            </ul>
          </div>
        </el-collapse-item>
        <el-collapse-item title="驾驶证信息" name="2">
          <div id="driver-license" class="authen-item">
            <div id="first-date" class="input" @click="checkTime(1)">
              <span>初次领证日期</span>
              <input v-model.trim="first_issue" id="first-issue" type="text" class="ui-date-scroll" placeholder="选择日期" value="" readonly />
            </div>
            <ul>
              <li @click="showImg(2)">
                <span ref="title2">驾驶证照</span>
                <img id="img3" src="@/assets/Authen/driver-license-front-add.jpg" alt="" />
                <div v-if="titleShow">
                  <b v-text="realNameStatusTitle2"></b>
                </div>
              </li>
            </ul>
          </div>
        </el-collapse-item>
        <el-collapse-item title="行驶证信息" name="3">
          <div id="driving-license" class="authen-item">
            <div @click="showCar" id="select-car" class="input">
              <span>注册车型</span>
              <input v-model.trim="carValue" id="car" type="text" value="" placeholder="选择车型" readonly />
            </div>
            <div class="input">
              <span>车牌号码</span>
              <div class="item-right">
                <div id="plate-no-short-box" class="item-right-box" @click="checkPlate">
                  <input id="plate-no-short" v-model.trim="short" placeholder="车牌简称" type="text" value="" readonly />
                  <i class="el-icon-caret-right"></i>
                </div>
                <input id="plate-no" v-model.trim="plate_no" placeholder="输入车牌号码" maxlength="6" type="text" value="" />
              </div>
            </div>
            <div class="input">
              <span>车辆所有人</span>
              <input v-model.trim="vehicle_owner" id="vehicle-owner" type="text" value="" placeholder="输入姓名" />
            </div>
            <div class="input" @click="checkTime(2)">
              <span>行驶证注册日期</span>
              <input v-model.trim="register_date" id="register-date" class="ui-date-scroll" type="text" placeholder="选择日期" value="" readonly />
            </div>
            <ul>
              <li @click="showImg(3)">
                <span ref="title3">行驶证正本照</span>
                <img id="img4" src="@/assets/Authen/driving-license-front-add.jpg" alt="" />
                <div v-if="titleShow">
                  <b v-text="realNameStatusTitle3"></b>
                </div>
              </li>
              <li @click="showImg(4)">
                <span ref="title4">行驶证副本照</span>
                <img id="img5" src="@/assets/Authen/driving-license-back-add.jpg" alt="" />
                <div v-if="titleShow">
                  <b v-text="realNameStatusTitle3"></b>
                </div>
              </li>
            </ul>
          </div>
        </el-collapse-item>
        <el-collapse-item title="人车合照" name="4">
          <div id="photo-person-car" class="authen-item">
            <ul>
              <li @click="showImg(5)">
                <span ref="title5">人车合照</span>
                <img id="img6" src="@/assets/Authen/person-car-add.jpg" alt="" />
                <div v-if="titleShow">
                  <b v-text="realNameStatusTitle4"></b>
                </div>
              </li>
            </ul>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div @click="submitExpressDriver" id="submit" class="submit-btn">
        确认提交
      </div>
    </div>
    <!-- 上传照片 -->
    <div>
      <el-drawer
        :modal="true"
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
            <!-- <img src="@/assets/Authen/id-card-front-demo.jpg" /> -->
            <img :src="demoImg[imgIndex].img" />
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
    <!-- 城市组件 -->
    <div v-swipeleft="swipeLeft">
      <el-drawer
        :visible.sync="cityDrawer"
        :show-close="false"
        size="100%">
        <city @cityChildFn="cityParentFn"></city>
      </el-drawer>
    </div>
    <!-- 车型组件 -->
    <div v-swipeleft="swipeLeft">
      <el-drawer
        :visible.sync="carDrawer"
        :show-close="false"
        size="100%">
        <car @carChildFn="carParentFn"></car>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { canvasDataURL } from "../../utils/util";
import { detectionParam } from "../../utils/util";
import vueTouch from "@/utils/touch.js";
import Vue from "vue";


import city from "../Utils/city";
import car from "../Utils/car";

import 'vant/lib/index.css';
import { IndexBar, IndexAnchor, Cell, DatetimePicker } from 'vant';

Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
Vue.use(DatetimePicker);
// Vue.use(vant);

export default {
  data() {
    return {
      loading: false,
      loadText: "图片上传中",
      activeNames: ["1", "2", "3", "4", "5"],
      demoImg: [
          {text: "身份证正面照", img: require("@/assets/Authen/id-card-front-demo.jpg")},
          {text: "身份证反面照", img: require("@/assets/Authen/id-card-back-demo.jpg")},
          {text: "驾驶证照", img: require("@/assets/Authen/driver-license-front-demo.jpg")},
          {text: "行驶证正本照", img: require("@/assets/Authen/driving-license-front-demo.jpg")},
          {text: "行驶证副本照", img: require("@/assets/Authen/driving-license-back-demo.jpg")},
          {text: "人车合照", img: require("@/assets/Authen/person-car-demo.jpg")}
      ],

      driverInfo: [], //司机认证信息
      carInfo: [], // 选择车辆信息
      cityInfo: [], // 选择城市信息
      cityValue: "", // 城市选择的信息
      carValue: "", // 车型选择的信息
      pro_code: "",
      pro_name: "", // 
      city_code: "", // 
      city_name: "", // 
      ad_code: "", // 
      ad_name: "", // 
      company_name: "", // 出租公司名
      name: "", // 姓名
      ID: "", //	身份证号	
      image_id_a: "", // 身份证人像面照片
      image_id_b: "", // 身份证国徽面照片	
      first_issue: "", // 初次领取驾照日期
      image_drivers: "", //	驾驶证照片
      brand: "", // 车辆品牌
      model: "", // 车辆型号
      color: "", // 车辆颜色	 
      plate_no_short: "", // 车牌简称
      plate_no_alpha: "", // 首字母
      short: "", // 页面显示的简称
      plate_no: "", // 车牌号码
      vehicle_owner: "", // 车辆所有人姓名	
      register_date: "", // 行驶证注册日期	
      image_driving_a: "", //	行驶证正本照片	
      image_driving_b: "", // 行驶证副本照片
      image_group: "", //	与车辆的合照
      img1: "",	
      img2: "",	
      img3: "",	
      img4: "",	
      img5: "",	
      img6: "",	

      flag: true, //阻止点击事件
      drawerDisabled: false, // 阻止照片显示点击事件
      timeDisabled: false, //  阻止时间显示点击事件
      cityDisabled: false, // 阻止城市显示点击事件
      carShortDisabled: false, // 阻止车牌简称显示点击事件
      carTypeDisabled: false, // 阻止车辆类型显示点击事件
      drawer: false, // 上传照片显示
      realNameStatusTitle1: "审核中...", // 上传图片状态实名信息title
      realNameStatusTitle2: "审核中...", // 上传图片状态驾驶证信息title
      realNameStatusTitle3: "审核中...", // 上传图片状态行驶证信息title
      realNameStatusTitle4: "审核中...", // 上传图片状态人车合照title
      titleShow: false, // 上传图片状态title显示
      imgIndex: 0, // 选择的图片
      /* 时间插件 */
      timeIndex: -1, // 时间对应
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
      // 城市组件
      cityDrawer: false,
      // 车型组件
      carDrawer: false,
      // 认证的条件
      status: "", // 全部状态
      realNameStatus: "", // 实名信息
      driversLicenseStatus: "", // 驾驶证信息
      drivingLicenseStatus: "", // 行驶证信息
      photoGroupStatus: "", // 人车信息
    };
  },
  components: {city, car},
  methods: {
    handleChange(val) {
      console.log(val);
    },
    // 城市右滑关闭
    swipeLeft() {
      vant.Toast("未选择")
      this.cityDrawer = false;
      this.carDrawer = false;
    },
    // 城市显示
    showCity() {
      var driverInfo = this.driverInfo;
      if (driverInfo) {
        if (driverInfo.city != null && driverInfo.city != "") {
          return;
        }
      }
      if (!this.flag) {
        return;
      }
      this.cityDrawer = true;
      // if (status != 2) {
      //   this.cityDrawer = true;
      // }
    },
    // 车型显示
    showCar() {
      if (!(this.drivingLicenseStatus > 0) || this.drivingLicenseStatus == 2 || this.drivingLicenseStatus == "") {
        this.carDrawer = true;
      }
    },
    // 城市选择
    cityParentFn(payload) {
      console.log("城市选择===", payload);
      this.taxiCityInfo = payload;
      this.cityValue = payload.city;
      this.cityDrawer = payload.msg;
    },
    // 车型选择
    carParentFn(payload) {
      console.log("车型选择===", payload);
      this.taxiCityInfo = payload;
      this.carValue = payload.brand + " " + payload.model + " " + payload.color;
      this.carDrawer = payload.msg;
    },
    // 时间显示
    checkTime(index) {
      console.log("时间显示")
      this.timeIndex = index;
      if (index == 1) {
        console.log(this.driversLicenseStatus)
        if (!(this.driversLicenseStatus > 0) || this.driversLicenseStatus == 2 || this.driversLicenseStatus == "") {
          this.timeDrawer = true;
        }
      }
      if (index == 2) {
        console.log(this.drivingLicenseStatus)
        if (!(this.drivingLicenseStatus > 0) || this.drivingLicenseStatus == 2 || this.drivingLicenseStatus == "") {
          this.timeDrawer = true;
        }
      }
    },
    // 时间确认
    timeConfirm(){
      if (this.timeIndex == 1) {
        if (this.first_issue != "") {
          this.timeDrawer = false;
          // this.first_issue = new Date((this.first_issue_time + " 00:00:00").replace(/-/g, "/")).getTime();
          // this.first_issue = this.first_issue_time;
        }else {
          vant.Toast("请滚动选择时间")
        }
      }else if (this.timeIndex ==2 ) {
        if (this.register_date != "") {
          this.timeDrawer = false;
          // this.register_date = new Date((this.register_date_time + " 00:00:00").replace(/-/g, "/")).getTime();
          // this.register_date = this.register_date_time;
          console.log(this.register_date)
        }else {
          vant.Toast("请滚动选择时间")
        }
      }
    },
    getValues(e) {
      let times = e.getValues();
      if (this.timeIndex == 1) {
        this.first_issue = `${times[0]}-${times[1]}-${times[2]}`;
      }else if (this.timeIndex == 2) {
        this.register_date = `${times[0]}-${times[1]}-${times[2]}`;
      }
    },
    // 时间取消
    timeCancel(){
      this.timeDrawer = false;
    },
    // 图片选择
    showImg(index) {
      console.log(index)
      this.imgIndex = index;
      if (index == 0) {
      this.drawerTitle = this.$refs.title0.innerText;
      }else if (index == 1) {
        this.drawerTitle = this.$refs.title1.innerText;
      }else if (index == 2) {
        this.drawerTitle = this.$refs.title2.innerText;
      }else if (index == 3) {
        this.drawerTitle = this.$refs.title3.innerText;
      }else if (index == 4) {
        this.drawerTitle = this.$refs.title4.innerText;
      }else if (index == 5) {
        this.drawerTitle = this.$refs.title5.innerText;
      }else if (index == 6) {
        this.drawerTitle = this.$refs.title6.innerText;
      }
      // console.log("showImg===", index);
      if (index == 0 || index == 1) {
        if (!(this.realNameStatus > 0) || this.realNameStatus == 2 || this.realNameStatus == "") {
          this.drawer = true;
        }
      }
      if (index == 2) {
        if (!(this.driversLicenseStatus > 0) || this.driversLicenseStatus == 2 || this.driversLicenseStatus == "") {
          this.drawer = true;
        }
      }
      if (index == 3 || index == 4) {
        if (!(this.drivingLicenseStatus > 0) || this.drivingLicenseStatus == 2 || this.drivingLicenseStatus == "") {
          this.drawer = true;
        }
      }
      if (index == 5) {
        if (!(this.photoGroupStatus > 0) || this.photoGroupStatus == 2 || this.photoGroupStatus == "") {
          this.drawer = true;
        }
      }
    },
    // 车牌简称显示
    checkPlate() {
      if (!(this.drivingLicenseStatus > 0) || this.drivingLicenseStatus == 2 || this.drivingLicenseStatus == "") {
        this.plateDrawer = true;
        this.plateShortList = this.$global_msg.plateShortList;
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

    //获取司机实名认证信息
    getExpressDriverInfo() {
      let params = {};
      var param = this.param;
      params.user_id = param.user_id;
      // params.user_id = $.user_id;
      if (param.id != null) {
        params.id = param.id;
      }
      this.loadText = "获取中...";
      this.loading = true;
      let url = this.$global_msg.getExpressDriverInfo;
      this.axios.post(url, params).then(res => {
        console.log(res);
        this.loading = false;
        var res = res.data;
        if (res && res.status == 1) {
          this.driverInfo = res.data;
          if (this.driverInfo) {
            this.showExpressDriverInfo();
          }
        } else {
          vant.Toast(res.msg);
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    },

    //提交司机实名认证信息
    submitExpressDriver() {
      var cityInfo = this.cityInfo;
      var carInfo = this.carInfo;
      let params = {
        user_id: this.param.user_id,
        city_code: cityInfo.city_code,
        city_name: cityInfo.city,
        name: this.name,
        ID: this.ID,
        image_id_a: this.img1,
        image_id_b: this.img2,
        image_drivers: this.img3,
        first_issue: this.first_issue,
        brand: carInfo.brand,
        model: carInfo.model,
        color: carInfo.color,
        plate_no_short: this.plate_no_short,
        plate_no_alpha: this.plate_no_alpha,
        plate_no: this.plate_no,
        vehicle_owner: this.vehicle_owner,
        register_date: this.register_date,
        image_driving_a: this.img4,
        image_driving_b: this.img5,
        image_group: this.img6
      };
      console.log(params);
      let text = detectionParam(params);
      if (text != "") {
        vant.Toast(text);
        return;
      }
      this.loadText = "提交中...";
      this.loading = true;
      let url = this.$global_msg.submitExpressDriver;
      this.axios.post(url, params).then(res => {
        console.log(res);
        this.loading =false;
        var res = res.data;
        if (res && res.status == 1) {
          this.flag = false;
          this.drawerDisabled = true, // 阻止照片显示点击事件
          this.timeDisabled = true, // 阻止时间显示点击事件
          this.cityDisabled = true, // 阻止城市显示点击事件
          this.carTypeDisabled = true, // 阻止车型显示点击事件
          this.carShortDisabled = true, // 阻止车牌简称显示点击事件
          this.status = 1, // 全部状态
          this.realNameStatus = 1, // 实名信息
          this.driversLicenseStatus = 1, // 驾驶证信息
          this.drivingLicenseStatus = 1, // 行驶证信息
          this.photoGroupStatus = 1, // 人车信息
          $("#submit").removeClass("submit-btn").addClass("none");
          $("input").attr("readonly", true);
          $("input").attr("disabled", true);
          this.titleShow = true;
          this.realNameStatusTitle1 = "审核中";
          this.realNameStatusTitle2 = "审核中";
          this.realNameStatusTitle3 = "审核中";
          this.realNameStatusTitle4 = "审核中";
          vant.Toast(res.msg);
        } else {
          vant.Toast(res.msg);
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading =false;
      })
    },

    /**
     * 显示司机认证信息
     */
    showExpressDriverInfo() {
      var driverInfo = this.driverInfo;
      if (driverInfo) {
        console.log(driverInfo)
        this.status = driverInfo.status;
        this.realNameStatus = driverInfo.real_name_status;
        this.driversLicenseStatus = driverInfo.drivers_license_status;
        this.drivingLicenseStatus = driverInfo.driving_license_status;
        this.photoGroupStatus = driverInfo.photo_group_status;
        var status = this.status; 
        var realNameStatus = this.realNameStatus; 
        var driversLicenseStatus = this.driversLicenseStatus; 
        var drivingLicenseStatus = this.drivingLicenseStatus; 
        var photoGroupStatus = this.photoGroupStatus; 
        if (driverInfo.city != null) {
          this.cityInfo = {   //选择城市信息
            city: driverInfo.city,
            city_code: driverInfo.city_code
          };
          var cityInfo = this.cityInfo
          this.cityValue = (cityInfo.city != null ? cityInfo.city : "");
        }
        if (driverInfo.brand != null || driverInfo.model != null || driverInfo.color != null) {
          this.carInfo = {   //选择车辆信息
            brand: driverInfo.brand,
            model: driverInfo.model,
            color: driverInfo.color
          };
          var carInfo = this.carInfo;
          this.carValue = ((carInfo.brand != null ? carInfo.brand : "") + " " + (carInfo.model != null ? carInfo.model : "") + " " + (carInfo.color != null ? carInfo.color : ""))
        }
        if (status != 2 && realNameStatus > 0 && driversLicenseStatus > 0 && drivingLicenseStatus > 0 && photoGroupStatus > 0) {
          console.log(111)
          this.flag = false;
          this.drawerDisabled = true, // 阻止照片显示点击事件
          this.timeDisabled = true, // 阻止时间显示点击事件
          this.cityDisabled = true, // 阻止城市显示点击事件
          this.carDisabled = true, // 阻止城市显示点击事件
          this.carShortDisabled = true, // 阻止车牌简称显示点击事件
          $("#submit").removeClass("submit-btn").addClass("none");
        } else {
          console.log(222)
          this.flag = true;
          this.drawerDisabled = false, // 阻止照片显示点击事件
          this.timeDisabled = false, // 阻止时间显示点击事件
          this.cityDisabled = false, // 阻止城市显示点击事件
          this.carDisabled = false, // 阻止城市显示点击事件
          this.carShortDisabled = false, // 阻止车牌简称显示点击事件
          $("#submit").removeClass("none").addClass("submit-btn");
        }
        //实名信息
        var server3 = this.$global_msg.server3;
        this.name = (driverInfo.name != null ? driverInfo.name : "");
        this.ID = (driverInfo.ID != null ? driverInfo.ID : "");
        if (realNameStatus == 1) { //审核中
          $("#realName input").attr("readonly", true);
          $("#realName #img1").attr("src", driverInfo.image_id_a != null ? (server3 + driverInfo.image_id_a) : "");
          $("#realName #img2").attr("src", driverInfo.image_id_b != null ? (server3 + driverInfo.image_id_b) : "");
          this.img1 = driverInfo.image_id_a != null ? driverInfo.image_id_a : "";
          this.img2 = driverInfo.image_id_b != null ? driverInfo.image_id_b : "";
          this.titleShow = true;
          this.realNameStatusTitle1 = "审核中";
        } else if (realNameStatus == 2) { //待完善
          $("#realName input").attr("readonly", false);
          $("#realName #img1").attr("src", driverInfo.image_id_a != null ? (server3 + driverInfo.image_id_a) : "");
          $("#realName #img2").attr("src", driverInfo.image_id_b != null ? (server3 + driverInfo.image_id_b) : "");
          this.img1 = driverInfo.image_id_a != null ? driverInfo.image_id_a : "";
          this.img2 = driverInfo.image_id_b != null ? driverInfo.image_id_b : "";
          this.titleShow = true;
          this.realNameStatusTitle1 = "请完善资料";
        } else if (realNameStatus == 3) { //成功
          $("#realName input").attr("readonly", true);
          $("#realName #img1").attr("src", driverInfo.image_id_a != null ? (server3 + driverInfo.image_id_a) : "");
          $("#realName #img2").attr("src", driverInfo.image_id_b != null ? (server3 + driverInfo.image_id_b) : "");
          this.img1 = driverInfo.image_id_a != null ? driverInfo.image_id_a : "";
          this.img2 = driverInfo.image_id_b != null ? driverInfo.image_id_b : "";
          this.titleShow = true;
          this.realNameStatusTitle1 = "审核通过";
        } else if (realNameStatus == 0 || realNameStatus == -1) { //未提交认证 数据无效
          $("#realName input").attr("readonly", false);
          this.titleShow = false;
          this.realNameStatusTitle1 = "";
        } else if (realNameStatus == -2) { //失败
          $("#realName input").attr("readonly", false);
          $("#realName #img1").attr("src", driverInfo.image_id_a != null ? (server3 + driverInfo.image_id_a) : "");
          $("#realName #img2").attr("src", driverInfo.image_id_b != null ? (server3 + driverInfo.image_id_b) : "");
          this.img1 = driverInfo.image_id_a != null ? driverInfo.image_id_a : "";
          this.img2 = driverInfo.image_id_b != null ? driverInfo.image_id_b : "";
          this.titleShow = true;
          this.realNameStatusTitle1 = "审核失败,点击重新上传";
        }
        //驾驶证信息
        this.first_issue = (driverInfo.first_issue != null ? driverInfo.first_issue : "");
        if (driversLicenseStatus == 1) { //审核中
          $("#driver-license input").attr("disabled", true);
          console.log("驾驶证信息")
          $("#driver-license #img3").attr("src", driverInfo.image_drivers != null ? (server3 + driverInfo.image_drivers) : "");
          this.img3 = driverInfo.image_drivers != null ? driverInfo.image_drivers : "";
          // this.
          this.titleShow = true;
          this.realNameStatusTitle2 = "审核中";
        } else if (driversLicenseStatus == 2) { //待完善
          $("#driver-license input").attr("disabled", false);
          $("#driver-license #img3").attr("src", driverInfo.image_drivers != null ? (server3 + driverInfo.image_drivers) : "");
          this.img3 = driverInfo.image_drivers != null ? driverInfo.image_drivers : "";
          this.titleShow = true;
          this.realNameStatusTitle2 = "请完善资料";
        } else if (driversLicenseStatus == 3) { //成功
          $("#driver-license input").attr("disabled", true);
          $("#driver-license #img3").attr("src", driverInfo.image_drivers != null ? (server3 + driverInfo.image_drivers) : "");
          this.img3 = driverInfo.image_drivers != null ? driverInfo.image_drivers : "";
          this.titleShow = true;
          this.realNameStatusTitle2 = "审核通过";
        } else if (driversLicenseStatus == 0 || driversLicenseStatus == -1) { //未提交认证 数据无效
          $("#driver-license input").attr("disabled", false);
          $("#driver-license ul li div").addClass("none");
          $("#driver-license ul li div b").html("");
        } else if (driversLicenseStatus == -2) { //失败
          $("#driver-license input").attr("disabled", false);
          $("#driver-license #img3").attr("src", driverInfo.image_drivers != null ? (server3 + driverInfo.image_drivers) : "");
          this.img3 = driverInfo.image_drivers != null ? driverInfo.image_drivers : "";
          this.titleShow = true;
          this.realNameStatusTitle2 = "审核失败,点击重新上传";
        }
        //行驶证信息
        this.carValue = ((driverInfo.brand != null ? driverInfo.brand : "") + " " + (driverInfo.model != null ? driverInfo.model : "") + " " + (driverInfo.color != null ? driverInfo.color : ""));
        this.plate_no_alpha = (driverInfo.plate_no_short != null ? driverInfo.plate_no_short : "")
        this.plate_no_short = (driverInfo.plate_no_alpha != null ? driverInfo.plate_no_alpha : "")
        this.short =(this.plate_no_alpha + this.plate_no_short);
        this.plate_no = (driverInfo.plate_no != null ? driverInfo.plate_no : "");
        this.vehicle_owner = (driverInfo.vehicle_owner != null ? driverInfo.vehicle_owner : "");
        this.register_date= (driverInfo.register_date != null ? driverInfo.register_date : "");
        if (drivingLicenseStatus == 1) { //审核中
          $("#driving-license input").attr("disabled", true);
          $("#driving-license #plate-no").attr("readonly", true);
          $("#driving-license #vehicle-owner").attr("readonly", true);
          $("#driving-license #img4").attr("src", driverInfo.image_driving_a != null ? (server3 + driverInfo.image_driving_a) : "");
          $("#driving-license #img5").attr("src", driverInfo.image_driving_b != null ? (server3 + driverInfo.image_driving_b) : "");
          this.img4 = driverInfo.image_driving_a != null ? driverInfo.image_driving_a : "";
          this.img5 = driverInfo.image_driving_b != null ? driverInfo.image_driving_b : "";
          this.titleShow = true;
          this.realNameStatusTitle3 = "审核中";
        } else if (drivingLicenseStatus == 2) { //待完善
          $("#driving-license input").attr("disabled", false);
          $("#driving-license #plate-no").attr("readonly", false);
          $("#driving-license #vehicle-owner").attr("readonly", false);
          $("#driving-license #img4").attr("src", driverInfo.image_driving_a != null ? (server3 + driverInfo.image_driving_a) : "");
          $("#driving-license #img5").attr("src", driverInfo.image_driving_b != null ? (server3 + driverInfo.image_driving_b) : "");
          this.img4 = driverInfo.image_driving_a != null ? driverInfo.image_driving_a : "";
          this.img5 = driverInfo.image_driving_b != null ? driverInfo.image_driving_b : "";
          this.titleShow = true;
          this.realNameStatusTitle3 = "请完善资料";
        } else if (drivingLicenseStatus == 3) { //成功
          $("#driving-license input").attr("disabled", true);
          $("#driving-license #plate-no").attr("readonly", true);
          $("#driving-license #vehicle-owner").attr("readonly", true);
          $("#driving-license #img4").attr("src", driverInfo.image_driving_a != null ? (server3 + driverInfo.image_driving_a) : "");
          $("#driving-license #img5").attr("src", driverInfo.image_driving_b != null ? (server3 + driverInfo.image_driving_b) : "");
          this.img4 = driverInfo.image_driving_a != null ? driverInfo.image_driving_a : "";
          this.img5 = driverInfo.image_driving_b != null ? driverInfo.image_driving_b : "";
          this.titleShow = true;
          this.realNameStatusTitle3 = "审核通过";
        } else if (drivingLicenseStatus == 0 || drivingLicenseStatus == -1) { //未提交认证 数据无效
          $("#driving-license input").attr("disabled", false);
          $("#driving-license #plate-no").attr("readonly", false);
          $("#driving-license #vehicle-owner").attr("readonly", false);
          this.titleShow = false;
          this.realNameStatusTitle3 = "";
        } else if (drivingLicenseStatus == -2) { //失败
          $("#driving-license input").attr("disabled", false);
          $("#driving-license #plate-no").attr("readonly", false);
          $("#driving-license #vehicle-owner").attr("readonly", false);
          $("#driving-license #img4").attr("src", driverInfo.image_driving_a != null ? (server3 + driverInfo.image_driving_a) : "");
          $("#driving-license #img5").attr("src", driverInfo.image_driving_b != null ? (server3 + driverInfo.image_driving_b) : "");
          this.img4 = driverInfo.image_driving_a != null ? driverInfo.image_driving_a : "";
          this.img5 = driverInfo.image_driving_b != null ? driverInfo.image_driving_b : "";
          this.titleShow = true;
          this.realNameStatusTitle3 = "审核失败,点击重新上传";
        }
        //人车信息
        if (photoGroupStatus == 1) { //审核中
          $("#img6").attr("src", driverInfo.image_group != null ? (server3 + driverInfo.image_group) : "");
          this.img6 = driverInfo.image_group != null ? driverInfo.image_group : "";
          this.titleShow = true;
          this.realNameStatusTitle4 = "审核中";
        } else if (photoGroupStatus == 2) { //待完善
          $("#img6").attr("src", driverInfo.image_group != null ? (server3 + driverInfo.image_group) : "");
          this.img6 = driverInfo.image_group != null ? driverInfo.image_group : "";
          this.titleShow = true;
          this.realNameStatusTitle4 = "请完善资料";
        } else if (photoGroupStatus == 3) { //成功
          $("#img6").attr("src", driverInfo.image_group != null ? (server3 + driverInfo.image_group) : "");
          this.img6 = driverInfo.image_group != null ? driverInfo.image_group : "";
          this.titleShow = true;
          this.realNameStatusTitle4 = "审核通过";
        } else if (photoGroupStatus == 0 || photoGroupStatus == -1) { //未提交认证 数据无效
          this.titleShow = false;
          this.realNameStatusTitle4 = "";
        } else if (photoGroupStatus == -2) { //失败
          $("#img6").attr("src", driverInfo.image_group != null ? (server3 + driverInfo.image_group) : "");
          this.img6 = driverInfo.image_group != null ? driverInfo.image_group : "";
          this.titleShow = true;
          this.realNameStatusTitle4 = "审核失败,点击重新上传";
        }
      }
    },

    /**
     * 选择上传图片
     * @param index 选取上传下标
     */
    checkImg(index) {
      this.drawer = false;
      var that = this;
      var driverInfo = that.driverInfo;
      if (driverInfo) {
        if (index < 2) {
          if (driverInfo.real_name_status > 0 && driverInfo.real_name_status != 2) {
            return;
          }
        }
        if (index == 2) {
          if (driverInfo.drivers_license_status > 0 && driverInfo.drivers_license_status != 2) {
            return;
          }
        }
        if (index == 3 || index == 4) {
          if (driverInfo.driving_license_status > 0 && driverInfo.driving_license_status != 2) {
            return;
          }
        }
        if (index > 4) {
          if (driverInfo.photo_group_status > 0 && driverInfo.photo_group_status != 2) {
            return;
          }
        }
      }
      if (!that.flag) {
        return;
      }
      var file = $(".file").get(0).files[0];
      var render = new FileReader();
      render.readAsDataURL(file);
      render.onload = function (e) {
        // console.log(e);
        //console.log(e.target.result);
        if (index == 0) {
          that.uploadPicture(0, e.target.result, 1, "A", that.img1);  //身份证正面
        } else if (index == 1) {
          that.uploadPicture(1, e.target.result, 1, "B", that.img2); //身份证反面
        } else if (index == 2) {
          that.uploadPicture(2, e.target.result, 2, "A", that.img3); //驾驶证
        } else if (index == 3) {
          that.uploadPicture(3, e.target.result, 2, "A", that.img4); //行驶证正面
        } else if (index == 4) {
          that.uploadPicture(4, e.target.result, 3, "B", that.img5); //行驶证反面
        } else {
          that.uploadPicture(5, e.target.result, 3, "A", that.img6); // 人车照
        }
        file = null;
        $("#file").val("");
        $("#file").off("change");
      }
    },
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
      canvasDataURL(base64, function callback(data) {
        let params = {
          user_id: that.param.user_id,
          base64: data,
          type: type,
          extra: extra,
          last_file: last_file
        };
        console.log(params);
        let url = that.$global_msg.uploadPicture;
        that.axios.post(url, params).then(res => {
          console.log(res);
          var res = res.data;
          that.loading = false;
          if (res.status == 1) {
            let path = res.data;
            switch (index) {
              case 0:
                that.img1 = path;
                $("#img1").attr("src", data);
                break;
              case 1:
                that.img2 = path;
                $("#img2").attr("src", data);
                break;
              case 2:
                that.img3 = path;
                $("#img3").attr("src", data);
                break;
              case 3:
                that.img4 = path;
                $("#img4").attr("src", data);
                break;
              case 4:
                that.img5 = path;
                $("#img5").attr("src", data);
                break;
              case 5:
                that.img6 = path;
                $("#img6").attr("src", data);
                break;
              default: break;
            }
          } else {
            vant.Toast(res.msg);
          }
        }).catch(err => {
          console.log("err===", err)
          that.loading = false;
        })
      });
    },
  },
  created() {},
  mounted() {
    this.getExpressDriverInfo();
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";

</style>

<style lang="scss" scoped>
@import "../../styles/Authen/authen.scss";

</style>
