<template>
  <div class="container" v-loading="loading" :element-loading-text="loadText" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="authen-main">
      <p>信息仅用于审核，绝对保密</p>
      <div class="line"></div>
      <div class="authen-type-box">
        <span>类型</span>
        <el-radio-group v-model="radio" :disabled="disabled" @change="radioleChange">
          <el-radio :label="1">司机</el-radio>
          <el-radio :label="2">售票员</el-radio>
        </el-radio-group>
      </div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="身份信息" name="1">
          <div id="realName" class="authen-item">
            <div class="input">
              <span>真实姓名</span>
              <input id="name" v-model.trim="name" placeholder="输入姓名" type="text" value />
            </div>
            <div class="input">
              <span>身份证号</span>
              <input id="id" v-model.trim="ID" placeholder="输入身份证号" type="text" value />
            </div>
            <ul>
              <li @click="showImg(0)">
                <span ref="title0">身份证正面照</span>
                <img id="img1" src="@/assets/Authen/id-card-front-add.jpg" alt />
                <div v-if="titleShow">
                  <b v-text="realNameStatusTitle1"></b>
                </div>
              </li>
              <li @click="showImg(1)">
                <span ref="title1">身份证反面照</span>
                <img id="img2" src="@/assets/Authen/id-card-back-add.jpg" alt />
                <div v-if="titleShow">
                  <b v-text="realNameStatusTitle1"></b>
                </div>
              </li>
            </ul>
          </div>
        </el-collapse-item>
        <el-collapse-item title="驾驶证信息" name="2" v-if="demoShow">
          <div id="driver" class="authen-item">
            <div class="input" @click="checkTime">
              <span>初次领证日期</span>
              <input
                id="first-issue"
                v-model.trim="first_issue"
                placeholder="选择日期"
                type="text"
                readonly
              />
            </div>
            <ul>
              <li @click="showImg(2)">
                <span ref="title2">驾驶证照</span>
                <img id="img3" src="@/assets/Authen/driver-license-front-add.jpg" alt />
                <div v-if="titleShow">
                  <b v-text="realNameStatusTitle2">审核中...</b>
                </div>
              </li>
            </ul>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div @click="submitBusEmployeesInfo" id="submit" class="submit-btn">确认提交</div>
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
  </div>
</template>

<script>
import $ from "jquery";
import { canvasDataURL } from "../../utils/util";
import Vue from 'vue';
Vue.use(vant)

export default {
  data() {
    return {
      loading: false,
      loadText: "图片上传中",
      activeNames: ["1", "2"],
      demoImg: [
        { text: "身份证正面照", img: require("@/assets/Authen/id-card-front-demo.jpg") },
        { text: "身份证反面照", img: require("@/assets/Authen/id-card-back-demo.jpg") },
        { text: "驾驶证正本照", img: require("@/assets/Authen/driver-license-front-demo.jpg") }
      ],
      demoShow: true,
      radio: 1,
      disabled: false, // 单选禁止
      existToken: "", // url传递的参数

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

      flag: true, //阻止点击事件
      drawerDisabled: false, // 阻止照片显示点击事件
      drawer: false, // 上传照片显示
      realNameStatusTitle1: "审核中", // 上传图片身份信息状态title
      realNameStatusTitle2: "审核中", // 上传图片驾驶证信息状态title
      titleShow: false, // 上传图片状态title显示
      imgIndex: 0, // 选择的图片
      drawerTitle: "", // 抽屉的标题
      /* 时间插件 */
      currentDate: new Date(),
      minDate: new Date(1999, 0, 1),
      maxDate: new Date(2019, 12, 31),
      timeDrawer: false, // 时间选择显示
      // 时间认证的条件
      status: "", // 全部状态
      realNameStatus: "", // 实名信息
      driverStatus: "", // 驾驶证信息
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    // 单选框选择
    radioleChange(val) {
      if (val == 1) {
        this.demoShow = true;
      } else if (val == 2) {
        this.demoShow = false;
      }
      this.type = val;
      this.img3 = "";
      this.first_issue = "";
    },
    // 时间显示
    checkTime() {
      if (!(this.driverStatus > 0) || this.driverStatus == 2 || this.driverStatus == "") {
        this.timeDrawer = true;
      }
    },
    // 时间确认
    timeConfirm(){
      if (this.first_issue != "") {
        this.timeDrawer = false;
      }else {
        vant.Toast("请滚动选择时间")
      }
    },
    getValues(e) {
      let times = e.getValues();
      this.first_issue = `${times[0]}-${times[1]}-${times[2]}`;
    },
    // 时间取消
    timeCancel(){
      this.timeDrawer = false;
    },
    // 图片选择
    showImg(index){
      this.imgIndex = index;
      if (!this.drawerDisabled) {
        if (index ==0) {
        this.drawerTitle = this.$refs.title0.innerText;
        }else if (index ==1) {
          this.drawerTitle = this.$refs.title1.innerText;
        }else if (index ==2) {
          this.drawerTitle = this.$refs.title2.innerText;
        }
        // console.log("showImg===", index);
        if (index == 0 || index == 1) {
          if (!(this.realNameStatus > 0) || this.realNameStatus == 2 || this.realNameStatus == "") {
            this.drawer = true;
          }
        }
        if (index == 2) {
          if (!(this.driverStatus > 0) || this.driverStatus == 2 || this.driverStatus == "") {
            this.drawer = true;
          }
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
        // console.log("index= ", index);
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
            that.uploadPicture(2, e.target.result, 4, "A", that.img3); //手持身份证正面照
          } else if (index == 3) {
            that.uploadPicture(3, e.target.result, 6, "A", that.img4); //企业营业执照照
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
     * @param type 上传的类型123456 身份证，驾驶证，行驶证，人车合照，上岗证，从业资格证
     * @param extra 正反面 A、B
     * @param last_file 上次回传的文件名（服务器上的路径
     */
    uploadPicture(index, base64, type, extra, last_file) {
      this.loadText = '图片上传中';
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
        var url = that.$global_msg.uploadPicture
        that.axios.post(url, params).then(res => {
          console.log("res===", res);
          var res = res.data;
            if (res && res.status == 1) {
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
                default: break;
              }
              that.loading = false;
            } else {
              that.loading = false;
              vant.Toast(res.msg);
            }
        }).catch(err => {
          console.log(err);
            that.loading = false;
        })
      });
    },
    /**
     * 获取雇员实名认证信息getEmployeesInfo
     */
    getBusEmployeesInfo() {
      let params = {};
      let url = "";
      let param = this.param;
      if (param.type == "selfInfo") {
        params.user_id = param.user_id;
        url = this.$global_msg.getEmployeesInfo;
      } else {
        if (param.employee_id == null) {
          return;
        }
        if (param.id != null) {
          params.id = param.id;
        }
        params.user_id = param.user_id;
        params.type = param.employee_type;
        params.employee_id = param.employee_id;
        url = this.$global_msg.getBusEmployees;
      }
      this.loadText = "获取中...";
      this.loading = true;
      console.log(params);
      this.axios.post(url, params).then(res => {
        console.log(res);
        var res = res.data;
        if (res && res.status == 1) {
          this.busEmployeesInfo = res.data;
          if (this.busEmployeesInfo) {
            // sessionStorage.setItem("busEmployeesInfo", JSON.stringify(this.busEmployeesInfo));
            this.showBusEmployeesInfo();
          }
        } else {
          vant.Toast(res.msg, 2500);
        }
        this.loading = false;
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    },
    /**
     * 提交司机实名认证信息
     */
    submitBusEmployeesInfo() {
      let params = {};
      var param = this.param;
      params.user_id = param.user_id;
      let url = this.$global_msg.submitBusEmployees;
      if (param.employee_id != null) {
        params.employee_id = param.employee_id;
        url = this.$global_msg.updateEmployeeInfo;
      }
      var data = this.$route.query;
      if (data != null && data.token != null) {
        params.__token__ = data.token;
      }
      params.type = this.type;
      params.name = this.name;
      params.ID = this.ID;
      params.image_id_a = this.img1;
      params.image_id_b = this.img2;
      params.image_drivers = this.img3;
      params.first_issue = this.first_issue;
      console.log(params);
      if (params.name == "" || params.name == null) {
        vant.Toast("请输入姓名");
        return;
      }
      if (params.ID == "" || params.ID == null) {
        vant.Toast("请输入身份证号码");
        return;
      }
      if (params.image_id_a == "" || params.image_id_a == null) {
        vant.Toast("请上传身份证正面照");
        return;
      }
      if (params.image_id_b == "" || params.image_id_b == null) {
        vant.Toast("请上传身份证背面照");
        return;
      }
      if (params.type == "1") {
        if (params.image_drivers == "" || params.image_drivers == null) {
          vant.Toast("请上传驾驶证正本照");
          return;
        }
        if (params.first_issue == "" || params.first_issue == null) {
          vant.Toast("请选择初次领证日期");
          return;
        }
      }
      this.loadText = "上传中...";
      this.loading = true;
      this.axios.post(url, params).then(res => {
        console.log(res);
        var res = res.data
        if (res && res.status == 1) {
          this.flag = false;
          $("#submit").removeClass("submit-btn").addClass("none");
          $("input").attr("readonly", true);
          $("input").attr("disabled", true);
          this.titleShow = true;
          this.flag = false;
          this.drawerDisabled = true, // 阻止照片显示点击事件
          this.status = 1;
          this.realNameStatus = 1;
          this.driverStatus = 1;
          this.realNameStatusTitle1 = "审核中";
          this.realNameStatusTitle2 = "审核中";
          vant.Toast(res.msg);
        } else {
          vant.Toast(res.msg);
        }
        this.loading = false;
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    },
    /**
     * 显示司机认证信息
     */
    showBusEmployeesInfo() {
      var busEmployeesInfo = this.busEmployeesInfo;
      if (busEmployeesInfo) {
        this.status = busEmployeesInfo.status;
        this.realNameStatus = busEmployeesInfo.real_name_status;
        this.driverStatus = busEmployeesInfo.drivers_license_status;
        var status = this.status;
        var realNameStatus = this.realNameStatus;
        var driverStatus = this.driverStatus;
        this.type = busEmployeesInfo.employee_type;
        var type = this.type;
        this.radio = Number(type);
        if (type == "1") {
          this.demoShow = true;
          this.disabled = true;
          if (realNameStatus > 0 && driverStatus > 0 && status != 2) {
            this.flag = false;
            // this.disabled = true;
            this.drawerDisabled = true;
            $("#submit").removeClass("submit-btn").addClass("none");
          } else {
            this.flag = true;
            // this.disabled = false;
            this.drawerDisabled = false;
            $("#submit").removeClass("none").addClass("submit-btn");
          }
        } else {
          this.demoShow = false;
          this.disabled = true;
          if (realNameStatus > 0 && status != 2) {
            this.flag = false;
            // this.disabled = true;
            this.drawerDisabled = true;
            $("#submit").removeClass("submit-btn").addClass("none");
          } else {
            this.flag = true;
            // this.disabled = false;
            this.drawerDisabled = false;
            $("#submit").removeClass("none").addClass("submit-btn");
          }
        }
        // 实名信息
        this.name = (busEmployeesInfo.name != null ? busEmployeesInfo.name : "");
        this.ID = (busEmployeesInfo.ID != null ? busEmployeesInfo.ID : "");
        var server3 = this.$global_msg.server3;
        if (realNameStatus == 1) { //审核中
          $("#realName input").attr("readonly", true);
          $("#realName #img1").attr("src", server3 + busEmployeesInfo.image_id_a);
          $("#realName #img2").attr("src", server3 + busEmployeesInfo.image_id_b);
          this.img1 = busEmployeesInfo.image_id_a;
          this.img2 = busEmployeesInfo.image_id_b;
          this.titleShow = true;
          this.realNameStatusTitle1 = "审核中";

        } else if (realNameStatus == 2) { //待完善
          $("#realName input").attr("readonly", false);
          $("#realName #img1").attr("src", busEmployeesInfo.image_id_a != null && busEmployeesInfo.image_id_a != "" ? server3 + busEmployeesInfo.image_id_a : img_id_card_front);
          $("#realName #img2").attr("src", busEmployeesInfo.image_id_b != null && busEmployeesInfo.image_id_b != "" ? server3 + busEmployeesInfo.image_id_b : img_id_card_back);
          if (busEmployeesInfo.image_id_a != null && busEmployeesInfo.image_id_a != "") {
            this.img1 = busEmployeesInfo.image_id_a;
          }
          if (busEmployeesInfo.image_id_b != null && busEmployeesInfo.image_id_b != "") {
            this.img2 = busEmployeesInfo.image_id_b;
          }
          this.titleShow = true;
          this.realNameStatusTitle1 = "请完善资料";

        } else if (realNameStatus == 3) { //成功
          $("#realName input").attr("readonly", true);
          $("#realName #img1").attr("src", server3 + busEmployeesInfo.image_id_a);
          $("#realName #img2").attr("src", server3 + busEmployeesInfo.image_id_b);
          this.img1 = busEmployeesInfo.image_id_a;
          this.img2 = busEmployeesInfo.image_id_b;
          this.titleShow = true;
          this.realNameStatusTitle1 = "审核通过";

        } else if (realNameStatus == 0 || realNameStatus == -1) { //未提交认证 数据无效
          $("#realName input").attr("readonly", false);
          this.titleShow = false;
          this.realNameStatusTitle1 = "";

        } else if (realNameStatus == -2) { //失败
          $("#realName input").attr("readonly", false);
          $("#realName #phone").attr("readonly", true);
          $("#realName #img1").attr("src", server3 + busEmployeesInfo.image_id_a);
          $("#realName #img2").attr("src", server3 + busEmployeesInfo.image_id_b);
          this.img1 = busEmployeesInfo.image_id_a;
          this.img2 = busEmployeesInfo.image_id_b;
          this.titleShow = true;
          this.realNameStatusTitle1 = "审核失败,点击重新上传";
        }
        //驾驶证信息
        this.first_issue = busEmployeesInfo.first_issue;
        if (type == "1") {
          if (driverStatus == 1) { //审核中
            $("#driver input").attr("readonly", true);
            $("#driver input").attr("disabled", true);
            $("#driver #img3").attr("src", server3 + busEmployeesInfo.image_drivers);
            this.img3 = busEmployeesInfo.image_drivers;
            this.titleShow = true;
            this.realNameStatusTitle2 = "审核中";
          } else if (driverStatus == 2) { //待完善
            $("#driver input").attr("disabled", false);
            $("#driver input").attr("readonly", false);
            $("#driver #img3").attr("src", busEmployeesInfo.image_drivers != null && busEmployeesInfo.image_drivers != "" ? server3 + busEmployeesInfo.image_drivers : img_driver_license);
            if (busEmployeesInfo.image_drivers != null && busEmployeesInfo.image_drivers != "") {
              this.img3 = busEmployeesInfo.image_drivers;
            }
            this.titleShow = true;
            this.realNameStatusTitle2 = "请完善资料";

          } else if (driverStatus == 3) { //成功
            $("#driver input").attr("disabled", true);
            $("#driver input").attr("readonly", true);
            $("#driver #img3").attr("src", server3 + busEmployeesInfo.image_drivers);
            this.img3 = busEmployeesInfo.image_drivers;
            console.log(this.img3)
            this.titleShow = true;
            this.realNameStatusTitle2 = "审核通过";

          } else if (driverStatus == 0 || driverStatus == -1) { //未提交认证 数据无效
            $("#driver input").attr("disabled", false);
            $("#driver input").attr("readonly", false);
            this.titleShow = false;
            this.realNameStatusTitle = "";
          } else if (driverStatus == -2) { //失败
            $("#driver input").attr("readonly", false);
            $("#driver input").attr("disabled", false);
            $("#driver #img3").attr("src", server3 + busEmployeesInfo.image_drivers);
            this.img3 = busEmployeesInfo.image_drivers;
            this.titleShow = true;
            this.realNameStatusTitle2 = "审核失败,点击重新上传";
          }
        }
      }
    },
  },
  mounted() {
    this.existToken = this.$route.query.token;
    if(this.$route.query != "" && this.$route.query != null && this.existToken != "" && this.existToken != null){
      this.param.user_id = this.existToken;
    }else {
      this.getBusEmployeesInfo();
    }
    
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";

</style>

<style lang="scss" scoped>
@import "../../styles/Authen/authen.scss";

</style>
