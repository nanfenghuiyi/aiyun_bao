<template>
  <div
    class="container"
    v-loading="loading"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="bus-repeat-list">
      <div id="listloading" class="listloading-list">
        <div>
          <ul id="bus-repeat-list"></ul>
        </div>
      </div>
    </div>
    <div class="puBox">
      <div class="model"></div>
      <div class="pu">
        <div class="title">
          <div class="title_text">
            <span>重复车牌号详情</span>
            <span class="title_plate" v-text="title_plate"></span>
          </div>
          <i class="close el-icon-close"></i>
        </div>
        <div class="infoContent">
          <div class="infoContent_item border_top">
            <span>已上传的该车牌号的手机号为：</span>
            <span class="info_he_tel" v-text="info_he_tel"></span>
            <span>平台审核该提交的信息的时间为：</span>
            <span class="info_he_time text_blue" v-text="info_he_time"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { format } from "../../utils/util";
import Vue from "vue";
Vue.use(vant);

export default {
  data() {
    return {
      loading: false,
      loadText: "图片上传中",
      param: [],

      title_plate: "", // 重复车牌号详情
      info_he_tel: "" , // 已上传的该车牌号的手机号为：
      info_he_time: "" , // 平台审核该提交的信息的时间为：
    };
  },
  methods: {
    /**
     * 获取大巴车上传记录详情
     * @param type
     * @param cb
     * @param flg
     */
    getDataList(type, cb, flg) {
      if (type == "refresh") {
        mData = [];
        mPage = 1;
      } else {
        mPage++;
      }
      var param = this.param;
      let params = {
        user_id: param.user_id,
        upload_no: param.upload_no,
        id: param.id,
        page: mPage
      };
      console.log(params);
      let url = this.$global_msg.getAllUploadedBus;
      this.axios.post(url, params).then(res => {
        console.log(mPage);
        console.log(res);
        if (res.status == 1) {
          let data = res.data;
          for (let key in data) {
            mData.push(data[key]);
          }
          let template = document.getElementById("template-bus-repeat-list")
            .innerHTML;
          if (type == "refresh") {
            $("#bus-repeat-list").empty();
            $("#bus-repeat-list").append(doT.template(template)(data));
          } else {
            if (mData.length != 10) {
              flg = true;
            }
            $("#bus-repeat-list").append(doT.template(template)(data));
          }
        } else {
          if (type == "refresh") {
            $("#bus-repeat-list").empty();
          } else {
            flg = true;
            mPage--;
          }
          vant.Toast(res.msg);
        }
        cb(flg);
      });
      cb(flg);
    },
    /**
     * 查看重复大巴车上传者信息
     * @param bus_id bus_id
     */
    lookDetail(bus_id) {
      let params = {
        user_id: this.param.user_id,
        bus_no: bus_id
      };
      console.log(params);
      this.loadText = "正在加载...";
      this.loading = true;
      let url = this.$global_msg.getBusUploaderInfo;
      this.axios
        .post(url, params)
        .then(res => {
          console.log(res);
          loadAlertHide();
          if (res.status == 1) {
            let data = res.data;
            this.title_plate = ("【" + data.plate_number + "】");
            this.info_he_tel = data.phone;
            this.info_he_time = format(data.add_time, "yyyy-MM-dd hh:mm:ss");
          } else {
            vant.Toast(res.msg);
          }
        })
        .catch(err => {
          console.log("err===", err);
          this.loading = false;
        });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.bus-repeat-list {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 16px;
  flex-direction: column;
  background-color: #f1f3f5;
  .listloading-list {
    width: 100%;
    height: calc(100% - 150px);
    overflow: auto;
  }
  ul {
    height: 100%;
    overflow: auto;
    padding: 0 10px;
    li {
      background-color: #ffffff;
      padding: 10px;
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 16px;
        color: #333333;
      }
      .detail {
        font-size: 16px;
        color: #fd5b00;
      }
    }
  }
}
.puBox,
.puBox .model {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  font-size: 16px;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99;
  .pu {
    border-radius: 5px;
    position: absolute;
    top: 25%;
    width: 80%;
    left: 0;
    right: 0;
    margin: 0 auto;
    background: #fff;
    padding: 10px;
    z-index: 100;
    .title {
      font-size: 26px;
      .title_text {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: #0c56ff;
      }
      .title_text span {
        padding: 5px;
      }
    }
    .close {
      display: inline-block;
      width: 20px;
      height: 20px;
      position: absolute;
      right: 12px;
      top: 10px;
      -webkit-tap-highlight-color: transparent;
    }
  }
  .infoContent {
    padding: 0 10px;
    .infoContent_item {
      display: flex;
      flex-direction: column;
      .text_blue {
        color: #005cff;
        padding-bottom: 10px;
      }
      .text_blue {
        color: #005cff;
        padding-bottom: 10px;
      }
    }
  }
}
</style>
