<template>
  <div class="container" v-loading="loading" :element-loading-text="loadText" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="authen-main">
      <p>信息仅用于审核，绝对保密</p>
      <div class="line"></div>
      <div class="authen-type-box">
        <span>承包者类型</span>
        <el-radio-group v-model="radio" :disabled="disabled" @change="radioleChange">
          <el-radio :label="2">企业</el-radio>
          <el-radio :label="1">自然人</el-radio>
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
                <b v-text="realNameStatusTitle" v-if="titleShow"></b>
              </li>
              <li @click="showImg(1)">
                <span ref="title1">身份证反面照</span>
                <img id="img2" src="@/assets/Authen/id-card-back-add.jpg" alt />
                <b v-text="realNameStatusTitle" v-if="titleShow"></b>
              </li>
              <li @click="showImg(2)">
                <span ref="title2">手持身份证正面照</span>
                <img id="img3" src="@/assets/Authen/id-card-hand-add.jpg" alt />
                <b v-text="realNameStatusTitle" v-if="titleShow"></b>
              </li>
            </ul>
          </div>
        </el-collapse-item>
        <el-collapse-item title="企业信息" name="2" v-if="demoShow">
          <div id="company" class="authen-item">
            <div class="input">
              <span>企业名称</span>
              <input
                id="company-name"
                v-model.trim="company_name"
                placeholder="输入企业全称"
                type="text"
                value
              />
            </div>
            <div class="input">
              <span>企业代码</span>
              <input
                id="company-code"
                v-model.trim="unified_social_credit_code"
                placeholder="输入企业机构组织代码"
                type="text"
                value
              />
            </div>
            <ul>
              <li @click="showImg(3)">
                <span ref="title3">企业营业执照照</span>
                <img id="img4" src="@/assets/Authen/enterprise-license-add.jpg" alt />
                <div v-if="titleShow">
                  <b v-text="realNameStatusTitle">审核中...</b>
                </div>
              </li>
            </ul>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div @click="submitBusManager" id="submit" class="submit-btn">确认提交</div>
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
  </div>
</template>

<script>
import $ from "jquery";
import { canvasDataURL } from "../../utils/util";

export default {
  data() {
    return {
      loading: false,
      loadText: "图片上传中",
      activeNames: ["1", "2"],
      demoShow: true,
      radio: 2,
      disabled: false,
      param: [],

      busManagerInfo: [], // 获取的认证信息
      name: "",
      ID: "",
      image_id_a: "", // 身份证人像面照片
      image_id_b: "", // 身份证国徽面照片
      image_group: "", // 与车辆的合照
      type: 1, // 经营者类型 1：个人 2： 公司
      company_name: "", // 	公司中文名称
      unified_social_credit_code: "", // 公司组织机构代码
      image_enterprise_license: "", // 公司营业执照
      img1: "",
      img2: "",
      img3: "",
      img4: "",

      flag: true, //阻止点击事件
      drawerDisabled: false, // 阻止照片显示点击事件
      drawer: false, // 上传照片显示
      realNameStatusTitle: "审核中", // 上传图片状态title
      titleShow: false, // 上传图片状态title显示
      imgIndex: 0, // 选择的图片
      drawerTitle: "", // 抽屉的标题
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
    // 单选框选择
    radioleChange(val) {
      console.log(val)
      if (val == 1) {
        this.demoShow = false;
      } else if (val == 2) {
        this.demoShow = true;
      }
      this.type = val;
      this.company_name = "";
      this.unified_social_credit_code = "";
      this.img4 = "";
    },
    // 图片选择
    showImg(index){
      if (!drawerDisabled) {
        if (index ==0) {
          this.drawerTitle = this.$refs.title0.innerText;
        }else if (index ==1) {
          this.drawerTitle = this.$refs.title1.innerText;
        }else if (index ==2) {
          this.drawerTitle = this.$refs.title2.innerText;
        }else if (index ==3) {
          this.drawerTitle = this.$refs.title3.innerText;
        }
        // console.log("showImg===", index);
        this.drawer = true;
        this.imgIndex = index;
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
                  // $("#img1-status").removeClass("authen-status-ing authen-status-over").addClass("none");
                  break;
                case 1:
                  that.img2 = path;
                  $("#img2").attr("src", data);
                  // $("#img2-status").removeClass("authen-status-ing authen-status-over").addClass("none");
                  break;
                case 2:
                  that.img3 = path;
                  $("#img3").attr("src", data);
                  // $("#img3-status").removeClass("authen-status-ing authen-status-over").addClass("none");
                  break;
                case 3:
                  that.img4 = path;
                  $("#img4").attr("src", data);
                  // $("#img4-status").removeClass("authen-status-ing authen-status-over").addClass("none");
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
     * 获取大巴经营者认证信息
     */
    getBusManagerInfo() {
      let params = {};
      params.user_id = this.param.user_id;
      this.loadText = "获取认证信息"
      this.loading = true;
      var url = this.$global_msg.getBusManagerInfo;
      this.axios.post(url, params).then(res => {
        console.log("res===", res);
        var res = res.data;
          if (res && res.status == 1) {
            this.busManagerInfo = res.data;
            if (this.busManagerInfo) {
              this.showBusManagerInfo();
              console.log("showBusManagerInfo===")
            }
          } else {
            vant.Toast(res.msg, 2500);
          }
          this.loading = false;
      }).catch(err => {
        this.loading = false;
        console.log(err);
      })
    },
    /**
     * 显示大巴经营者认证信息
     */
    showBusManagerInfo() {
      var busManagerInfo = this.busManagerInfo;
      console.log(busManagerInfo)
      var flag = this.flag;
      if (busManagerInfo) {
        let status = busManagerInfo.status;
        let realNameStatus = busManagerInfo.real_name_status;
        let companyStatus = busManagerInfo.enterprise_license_status;
        let type = busManagerInfo.type;
        this.radio = Number(type);
        if (type == 2) {
          this.demoShow = true;
          if (realNameStatus > 0 && companyStatus > 0 && status != 2) {
            flag = false;
            this.disabled = true;
            this.drawerDisabled = true;
            $("#submit").removeClass("submit-btn").addClass("none");
          } else {
            flag = true;
            this.disabled = false;
            this.drawerDisabled = false;
            $("#submit").removeClass("none").addClass("submit-btn");
          }
        } else {
          this.demoShow = false;
          if (realNameStatus > 0 && status != 2) {
            flag = false;
            this.disabled = true;
            this.drawerDisabled = true;
            $("#submit").removeClass("submit-btn").addClass("none");
          } else {
            flag = true;
            this.disabled = false;
            this.drawerDisabled = false;
            $("#submit").removeClass("none").addClass("submit-btn");
          }
        }
        //实名信息
        var server3 = this.$global_msg.server3;
        if (realNameStatus == 1) { //审核中
          this.name = busManagerInfo.name;
          this.ID = busManagerInfo.ID
          $("#realName input").attr("readonly", true);
          $("#realName #img1").attr("src", server3 + busManagerInfo.image_id_a);
          $("#realName #img2").attr("src", server3 + busManagerInfo.image_id_b);
          $("#realName #img3").attr("src", server3 + busManagerInfo.image_group);
          this.img1 = busManagerInfo.image_id_a;
          this.img2 = busManagerInfo.image_id_b;
          this.img3 = busManagerInfo.image_group;
          this.titleShow = true;
          this.realNameStatusTitle = "审核中";

        } else if (realNameStatus == 2) { //待完善
          this.name = (busManagerInfo.name != null ? busManagerInfo.name : "");
          this,ID = (busManagerInfo.ID != null ? busManagerInfo.ID : "");
          $("#realName input").attr("readonly", false);
          $("#realName #img1").attr("src", busManagerInfo.image_id_a != null && busManagerInfo.image_id_a != "" ? server3 + busManagerInfo.image_id_a : img_id_card_front);
          $("#realName #img2").attr("src", busManagerInfo.image_id_b != null && busManagerInfo.image_id_b != "" ? server3 + busManagerInfo.image_id_b : img_id_card_back);
          $("#realName #img3").attr("src", busManagerInfo.image_group != null && busManagerInfo.image_group != "" ? server3 + busManagerInfo.image_group : img_id_card_hand);
          if (busManagerInfo.image_id_a != null && busManagerInfo.image_id_a != "") {
            this.img1 = busManagerInfo.image_id_a;
          }
          if (busManagerInfo.image_id_b != null && busManagerInfo.image_id_b != "") {
            this.img2 = busManagerInfo.image_id_b;
          }
          if (busManagerInfo.image_group != null && busManagerInfo.image_group != "") {
            this.img3 = busManagerInfo.image_group;
          }
          this.titleShow = true;
          this.realNameStatusTitle = "请完善资料";

        } else if (realNameStatus == 3) { //成功
          this.name = busManagerInfo.name;
          console.log(this.name)
          this.ID = busManagerInfo.ID
          $("#realName input").attr("readonly", true);
          $("#realName #img1").attr("src", server3 + busManagerInfo.image_id_a);
          $("#realName #img2").attr("src", server3 + busManagerInfo.image_id_b);
          $("#realName #img3").attr("src", server3 + busManagerInfo.image_group);
          this.img1 = busManagerInfo.image_id_a;
          this.img2 = busManagerInfo.image_id_b;
          this.img3 = busManagerInfo.image_group;
          this.titleShow = true;
          this.realNameStatusTitle = "审核通过";

        } else if (realNameStatus == 0 || realNameStatus == -1) { //未提交认证 数据无效
          $("#realName input").attr("readonly", false);
          this.titleShow = false;
          this.realNameStatusTitle = "";
        } else if (realNameStatus == -2) { //失败
          this.name = busManagerInfo.name;
          this.ID = busManagerInfo.ID;
          $("#realName input").attr("readonly", false);
          $("#realName #img1").attr("src", server3 + busManagerInfo.image_id_a);
          $("#realName #img2").attr("src", server3 + busManagerInfo.image_id_b);
          $("#realName #img3").attr("src", server3 + busManagerInfo.image_group);
          this.img1 = busManagerInfo.image_id_a;
          this.img2 = busManagerInfo.image_id_b;
          this.img3 = busManagerInfo.image_group;
          this.titleShow = true;
          this.realNameStatusTitle = "审核失败，点击重新上传";
        }
        //企业信息
        if (type == 2) {
          if (companyStatus == 1) { //审核中
            $("#company input").attr("disabled", true);
            this.company_name = busManagerInfo.company_name;
            this.unified_social_credit_code = busManagerInfo.code;
            $("#company #img4").attr("src", server3 + busManagerInfo.image_enterprise_license);
            this.img4 = busManagerInfo.image_enterprise_license;
            this.titleShow = true;
            this.realNameStatusTitle = "审核中";

          } else if (companyStatus == 2) { //待完善
            $("#company input").attr("disabled", false);
            this.company_name = (busManagerInfo.company_name != null ? busManagerInfo.company_name : "");
            this.unified_social_credit_code = (busManagerInfo.code != null ? busManagerInfo.code : "");
            $("#company #img4").attr("src", busManagerInfo.image_enterprise_license != null && busManagerInfo.image_enterprise_license != "" ? server3 + busManagerInfo.image_enterprise_license : img_enterprise_license);
            if (busManagerInfo.image_enterprise_license != null && busManagerInfo.image_enterprise_license != "") {
              this.img4 = busManagerInfo.image_enterprise_license;
            }
            this.titleShow = true;
            this.realNameStatusTitle = "请完善资料";

          } else if (companyStatus == 3) { //成功
            $("#company input").attr("disabled", true);
            this.company_name = busManagerInfo.company_name;
            this.unified_social_credit_code = busManagerInfo.code;
            $("#company #img4").attr("src", server3 + busManagerInfo.image_enterprise_license);
            this.img4 = busManagerInfo.image_enterprise_license;
            this.titleShow = true;
            this.realNameStatusTitle = "审核通过";

          } else if (companyStatus == 0 || companyStatus == -1) { //未提交认证 数据无效
            $("#company input").attr("disabled", false);
            this.titleShow = false;
            this.realNameStatusTitle = "";
          } else if (companyStatus == -2) { //失败
            $("#company input").attr("disabled", false);
            this.company_name = busManagerInfo.company_name;
            this.unified_social_credit_code = busManagerInfo.code;
            $("#company #img4").attr("src", server3 + busManagerInfo.image_enterprise_license);
            this.img4 = busManagerInfo.image_enterprise_license;
            this.titleShow = true;
            this.realNameStatusTitle = "审核失败，点击重新上传";
          }
        }
      }
    },
    /**
     * 提交大巴经营者认证信息
     */
    submitBusManager() {
      let params = {
        user_id: this.param.user_id,
        type: this.type,
        name: this.name,
        ID: this.ID,
        image_id_a: this.img1,
        image_id_b: this.img2,
        image_group: this.img3,
        company_name: this.company_name,
        unified_social_credit_code: this.unified_social_credit_code,
        image_enterprise_license: this.img4
      };
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
      if (params.image_group == "" || params.image_group == null) {
        vant.Toast("请上传手持身份证正面照");
        return;
      }
      console.log(params.type)
      if (params.type != "1") {
        if (params.company_name == "" || params.company_name == null) {
          vant.Toast("请输入企业名称");
          return;
        }
        if (params.unified_social_credit_code == "" || params.unified_social_credit_code == null) {
          vant.Toast("请输入企业编号");
          return;
        }
        if (params.image_enterprise_license == "" || params.image_enterprise_license == null) {
          vant.Toast("请上传营业执照");
          return;
        }
      }
      console.log(params);
      this.loading = true;
      this.loadText = "信息提交中"
      var url = this.$global_msg.submitBusManager;
      this.axios.post(url, params).then(res => {
        console.log(res);
        var res = res.data;
        if (res && res.status == 1) {
          flag = false;
          $("#submit").removeClass("submit-btn").addClass("none");
          $("input").attr("readonly", true);
          $("input").attr("disabled", true);
          this.titleShow = true;
          this.realNameStatusTitle = "审核中";
          vant.Toast(res.msg);
        } else {
          vant.Toast(res.msg);
        }
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        console.log("err===", err)
      })
    }
  },
  created() {},
  mounted() {
    this.param.user_id = this.$global_msg.user_id;
    this.getBusManagerInfo();
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
</style>

<style lang="scss" scoped>
@import "../../styles/Authen/authen.scss";

</style>
