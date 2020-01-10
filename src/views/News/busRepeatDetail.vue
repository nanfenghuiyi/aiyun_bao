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
          <ul id="bus-repeat-list" class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="disabled" infinite-scroll-immediate="false" infinite-scroll-delay="10">
            <!-- <li v-for="(item, index) of content" :key="index" 
            >
              <span>{{item.plate_for_word}}{{item.plate_for_alpha}}{{item.plate_for_no}}</span>
              <span>{{item.add_time}}</span>
              <span>{{item.status}}</span>
              <span @click="lookDetail(index)">{{item.bus_id}}</span>
            </li> -->
            <li>
              <span>12e2312</span>
              <span>safasd</span>
              <span>f12eads</span>
              <span @click="lookDetail(1)">giqwoi</span>
            </li>
            <li>
              <span>12e2312</span>
              <span>safasd</span>
              <span>f12eads</span>
              <span @click="lookDetail(2)">gkloi</span>
            </li>
            <li>
              <span>12e2312</span>
              <span>safasd</span>
              <span>f12eads</span>
              <span @click="lookDetail(3)">gklno</span>
            </li>
            <li>
              <span>12e2312</span>
              <span>safasd</span>
              <span>f12eads</span>
              <span @click="lookDetail(4)">gkln</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <div class="puBox">
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
    </div> -->
    <!-- 重复车牌号码 -->
    <van-popup v-model="puBoxShow" round :style="{ height: '25%', width: '80%' }">
      <div class="pu">
        <div class="title">
          <div class="title_text">
            <span>重复车牌号详情</span>
            <span class="title_plate" v-text="title_plate"></span>
          </div>
          <i class="close el-icon-close" @click="close"></i>
        </div>
        <div class="infoContent">
          <div class="infoContent_item border_top">
            <span>已上传的该车牌号的手机号为：</span>
            <span class="info_he_tel text_blue" v-text="info_he_tel"></span>
            <span>平台审核该提交的信息的时间为：</span>
            <span class="info_he_time text_blue" v-text="info_he_time"></span>
          </div>
        </div>
      </div>
    </van-popup>
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
      puBoxShow: true, // 重复车牌号码显示
      disabled: false, // 滚动禁用
      loading: false, // 加载状态

      title_plate: "1231", // 重复车牌号详情
      info_he_tel: "10992949" , // 已上传的该车牌号的手机号为：
      info_he_time: "13:00" , // 平台审核该提交的信息的时间为：

      page: 1,
    };
  },
  methods: {
    // 列表
    load() {
      console.log(111)
      this.page++;
      this.getDataList();
      // 加载状态结束
      this.loading = false;
    },
    // 关闭弹窗
    close() {
      this.puBoxShow = false;
    },
    /**
     * 获取大巴车上传记录详情
     * @param type
     * @param cb
     * @param flg
     */
    getDataList() {
      // if (type == "refresh") {
      //   mData = [];
      //   mPage = 1;
      // } else {
      //   mPage++;
      // }
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
        } else {
          // if (type == "refresh") {
          //   $("#bus-repeat-list").empty();
          // } else {
          //   flg = true;
          //   mPage--;
          // }
          // console.log('阻止滚动事件===')
          this.disabled = true;
          vant.Toast(res.msg);
        }
      });
    },
    /**
     * 查看重复大巴车上传者信息
     * @param bus_id bus_id
     */
    lookDetail(bus_id) {
      this.puBoxShow = true;
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
          this.loading = false;
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
  .pu {
    width: 94%;
    margin: 0 auto;
    background: #fff;
    padding: 3%;
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
</style>
