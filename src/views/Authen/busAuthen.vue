<template>
  <div class="container" v-loading="loading" :element-loading-text="loadText" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="authen-main">
      <p>信息仅用于审核，绝对保密</p>
      <div id="realName" class="authen-item">
        <div class="input">
          <span>业户名称</span>
          <input v-model.trim="name" id="name" placeholder="例：某运输有限公司" type="text" />
        </div>
        <div class="input">
          <span>车牌号码</span>
          <div class="item-right">
            <div id="plate-no-short-box" class="item-right-box" @click="checkPlate">
              <input v-model.trim="short" id="plate-no-short" placeholder="车牌简称" type="text" readonly />
              <i class="el-icon-caret-right"></i>
            </div>
            <input v-model.trim="plate_no" id="plate-no" placeholder="输入车牌号码" maxlength="7" type="text" value />
          </div>
        </div>
        <div class="input" @click="checkColor">
          <span>车辆颜色</span>
          <div class="item-right">
            <input v-model.trim="color" id="plate-color" placeholder="车辆颜色" type="text"  readonly />
          </div>
        </div>
        <div class="input" @click="checkType">
          <span>车辆类型</span>
          <div class="item-right">
            <input v-model.trim="type" id="plate-type" placeholder="车辆类型" type="text" readonly />
          </div>
        </div>
        <div class="input">
          <span>核载客量</span>
          <div class="item-right">
            <input v-model.trim="seats" class="center" id="plate-seats" maxlength="2" placeholder="车辆核载客量" type="text" />
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
      <div @click="submitBusInfo" id="submit" class="submit-btn">确认提交</div>
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
      drawerTitle: "", // 抽屉的标题
      // 多层抽屉
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
     * 获取车辆大类型
     */
    getBusType1() {
      let params = {
        user_id: this.param.user_id,
        type: "1"
      };
      this.loadText = "获取中...";
      this.loading = true;
      let url = this.$global_msg.getBusType;
      this.axios.post(url, params).then(res => {
        console.log(res);
        var res = res.data;
          this.loading = false;
          if (res && res.status == 1) {
            this.carTypeList1 = res.data;
            //车辆类型
          } else {
            vant.Toast(res.msg);
          }
      }).catch( err => {
        console.log("err===", err)
        this.loading = false;
      })
    },
    /**
     * 获取车辆小类型
     * @param type
     */
    getBusType2(type) {
      let params = {
        user_id: this.param.user_id,
        type: type
      };
      this.loadText = "获取中...";
      this.loading = true;
      let url = this.$global_msg.getBusType;
      this.axios.post(url, params).then(res => {
        console.log(res);
        var res = res.data;
          this.loading = false;
          if (res && res.status == 1) {
            this.carTypeList2 = res.data;
          } else {
            this.loading = false;
            vant.Toast(res.msg);
          }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    },
    /**
     * 选择上传图片
     * @param index 选取上传下标
     */
    checkImg(index) {
      this.drawer = false;
      var that = this;
      var busInfo = that.busInfo;
      if (busInfo) {
        if (index < 2) {
          if (busInfo.status > 0 && busInfo.status != 2) {
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
        // console.log(e.target.result);
        if (index == 0) {
          that.uploadPicture(0, e.target.result, 7, "A", img1);  //大巴车资质照
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
          // user_id: $.user_id,
          user_id: that.param.user_id,
          base64: data,
          type: type,
          extra: extra,
          last_file: last_file
        };
        console.log(params);
        var url = that.$global_msg.uploadPicture;
        that.axios.post(url, params).then(res => {
          console.log(res);
          that.loading = false;
          var res = res.data;
          if (res && res.status == 1) {
            let path = res.data;
            switch (index) {
              case 0:
                that.img1 = path;
                $("#img1").attr("src", data);
                break;
              default: break;
            }
          } else {
            this.loading = false;
            vant.Toast(res.msg);
          }
        }).catch(err => {
          console.log("err===", err);
          that.loading = false;
        })
      });
    },
    /**
     * 获取大巴车认证信息
     */
    getBusInfo() {
      console.log("getBusInfo")
      var param = this.param;
      if (param.bus_no == null) {
        console.log(111)
        return;
      }
      let params = {};
      // params.user_id = $.user_id;
      params.user_id = param.user_id;
      params.bus_no = param.bus_no;
      if (param.id != null) {
        params.id = param.id;
      }
      this.loadText = "获取中...";
      this.loading = true;
      let url = this.$global_msg.getBusInfo;
      this.axios.post(url, params).then(res => {
        console.log(res);
        var res = res.data;
        this.loading = false;
        if (res && res.status == 1) {
          this.busInfo = res.data;
          if (this.busInfo) {
            this.showBusInfo();
          }
        } else {
          this.loading = false;
          vant.Toast(res.msg);
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    },

    /**
     * 提交大巴车认证信息
     */
    submitBusInfo() {
      let params = {};
      var param = this.param;
      params.user_id = param.user_id;
      if (param.bus_no != null) {
        params.bus_no = param.bus_no;
      }
      params.image = this.img1;
      params.name = this.name;
      params.plate_no_short = this.plate_no_short;
      params.plate_no_alpha = this.plate_no_alpha;
      params.plate_no = this.plate_no;
      params.color = this.color;
      params.type = this.type;
      params.seats = this.seats;
      console.log(params);
      if (params.image == "" || params.image == null) {
        vant.Toast("请上传道路运输许可证");
        return;
      }
      if (params.name == "" || params.name == null) {
        vant.Toast("请输入业主姓名");
        return;
      }
      if (params.plate_no_short == "" || params.plate_no_short == null) {
        vant.Toast("请选择车牌简称");
        return;
      }
      if (params.plate_no == "" || params.plate_no == null) {
        vant.Toast("请输入车牌号");
        return;
      }
      if (params.color == "" || params.color == null) {
        vant.Toast("请选择车辆颜色");
        return;
      }
      if (params.type == "" || params.type == null) {
        vant.Toast("请选择车辆类型");
        return;
      }
      if (params.seats == "" || params.seats == null) {
        vant.Toast("请输入荷载人数");
        return;
      }
      this.loadText = "提交中...";
      this.loading = true;
      let url = this.$global_msg.submitBusInfo;
      this.axios.post(url, params).then(res => {
        console.log(res);
        var res = res.data;
          this.loading = false;
          if (res && res.status == 1) {
          this.flag = false;
          $("#submit").removeClass("submit-btn").addClass("none");
          $("input").attr("readonly", true);
          $("input").attr("disabled", true);
          this.titleShow = true;
          this.realNameStatusTitle = "审核中";
          vant.Toast(res.msg, 2500);
        } else {
          this.loading = false;
          vant.Toast(res.msg, 2000);
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    },

    /**
     * 显示司机认证信息
     */
    showBusInfo() {
      var busInfo = this.busInfo;
      var server3 = this.$global_msg.server3;
      if (busInfo) {
        let status = busInfo.status;
        if (status > 0 && busInfo.status != 2) {
          this.flag = false;
          this.drawerDisabled = true;
          this.carShortDisabled = true, 
          this.carColorDisabled = true, 
          this.carTypeDisabled = true,
          $("#submit").removeClass("submit-btn").addClass("none");
        } else {
          this.flag = true;
          this.drawerDisabled = false;
          this.carShortDisabled = false, 
          this.carColorDisabled = false, 
          this.carTypeDisabled = false,
          $("#submit").removeClass("none").addClass("submit-btn");
        }
        //实名信息
        if (status == 1) { //审核中
          this.name = busInfo.name;
          this.short = (busInfo.plate_for_short + busInfo.plate_for_alpha);
          this.plate_no = busInfo.plate_no;
          this.color = busInfo.bus_color;
          this.type = busInfo.bus_type_name;
          this.seats = busInfo.bus_seat;
          $("#realName input").attr("readonly", true);
          $("#realName #img1").attr("src", server3 + busInfo.image);
          this.img1 = busInfo.image;
          this.titleShow = true;
          this.realNameStatusTitle = "审核中";

        } else if (status == 2) { //待完善
          this.name = (busInfo.name != null ? busInfo.name : "");
          this.short = (busInfo.plate_for_short != null && busInfo.plate_for_alpha != null ? busInfo.plate_for_short + busInfo.plate_for_alpha : "");
          this.plate_no = (busInfo.plate_no != null ? busInfo.plate_no : "");
          this.color = (busInfo.bus_color != null ? busInfo.bus_color : "");
          this.type = (busInfo.bus_type_name != null ? busInfo.bus_type_name : "");
          this.seats = (busInfo.bus_seat != null ? busInfo.bus_seat : "");
          $("#realName input").attr("readonly", false);
          this.carShortDisabled = false, 
          this.carColorDisabled = false, 
          this.carTypeDisabled = false,
          $("#realName #img1").attr("src", busInfo.image != null && busInfo.image != "" ? server3 + busInfo.image : img_road_transport);
          if (busInfo.image != null && busInfo.image != "") {
            this.img1 = busInfo.image;
          }
          this.titleShow = true;
          this.realNameStatusTitle = "请完善资料";

        } else if (status == 3) { //成功
          this.name = busInfo.name;
          this.short = (busInfo.plate_for_short + busInfo.plate_for_alpha);
          this.plate_no = busInfo.plate_no;
          this.color = busInfo.bus_color;
          this.type = busInfo.bus_type_name;
          this.seats = busInfo.bus_seat;
          $("#realName input").attr("readonly", true);
          $("#realName #img1").attr("src", server3 + busInfo.image);
          this.img1 = busInfo.image;
          this.titleShow = true;
          this.realNameStatusTitle = "审核通过";
        } else if (status == 0 || status == -1) { //未提交认证 数据无效
          $("#realName input").attr("readonly", false);
          this.carShortDisabled = false, 
          this.carColorDisabled = false, 
          this.carTypeDisabled = false,
          this.titleShow = true;
          this.realNameStatusTitle = "";
        } else if (status == -2) { //失败
          this.name = busInfo.name;
          this.short = (busInfo.plate_for_short + busInfo.plate_for_alpha);
          this.plate_no = busInfo.plate_no;
          this.color = busInfo.bus_color;
          this.type = busInfo.bus_type_name;
          this.seats = busInfo.bus_seat;
          $("#realName input").attr("readonly", false);
          this.carShortDisabled = false, 
          this.carColorDisabled = false, 
          this.carTypeDisabled = false,
          $("#realName #img1").attr("src", server3 + busInfo.image);
          this.img1 = busInfo.image;
          this.titleShow = true;
          this.realNameStatusTitle = "审核失败,点击重新上传";
        }
      }
    },
  },
  created() {},
  mounted() {
    this.param = {bus_no : 308, user_id: "3e4414e6-f287-4d6b-b194-4cb1624e8627"};
    this.getBusInfo();
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
