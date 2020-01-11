<template>
  <div
    class="container"
    v-loading="loading"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <!-- <div class="bus-repeat-list">
      <div id="listloading" class="listloading-list">
        <div>
          <ul id="bus-repeat-list" class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="disabled" infinite-scroll-immediate="false" infinite-scroll-delay="10">
            <li v-for="(item, index) of content" :key="index" 
            >
              <span>{{item.plate_for_word}}{{item.plate_for_alpha}}{{item.plate_for_no}}</span>
              <span>{{item.add_time}}</span>
              <span>{{item.status}}</span>
              <span @click="lookDetail(index)">{{item.bus_id}}</span>
            </li>
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
    </div> -->
    <div class="list-content" id="list-content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
              v-model="listLoading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :offset="10"
          >
            <div class="list-item">
                <van-cell v-for="(item, index) in list" :key="index">
                  <div>
                    <span>{{item.plate_for_word}}{{item.plate_for_alpha}}{{item.plate_for_no}}</span>
                    <span>{{item.add_time}}</span>
                    <span>{{item.status}}</span>
                    <span @click="lookDetail(item.bus_id)">详情</span>
                  </div>
                  <!-- <div class="list_style">
                    <span>12e2312</span>
                    <span>safasd</span>
                    <span>f12eads</span>
                    <span class="detail" @click="lookDetail(1)">giqwoi</span>
                  </div> -->
                </van-cell>
            </div>
          </van-list>
      </van-pull-refresh>
    </div>
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
      puBoxShow: false, // 重复车牌号码显示
      // disabled: false, // 滚动禁用
      // loading: false, // 加载状态
      // list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],//24,25,26,27,28,29,30],
      listLoading: false,   //是否处于加载状态
      finished: false,  //是否已加载完所有数据
      isLoading: false,   //是否处于下拉刷新状态

      list: [], // 获取的数据
      loadStatus: 1, // 阻止加载的状态
      title_plate: "1231", // 重复车牌号详情
      info_he_tel: "10992949" , // 已上传的该车牌号的手机号为：
      info_he_time: "13:00" , // 平台审核该提交的信息的时间为：

      page: 1,
    };
  },
  methods: {
    // 列表
    /* load() {
      console.log(111)
      this.page++;
      this.getDataList();
      // 加载状态结束
      this.loading = false;
    }, */
    // 上拉加载
    onLoad() {    
      if (this.list.length<20) {
        console.log(111)
        this.finished = true;
        return
      }  
      setTimeout(() => {
        this.page++;
        this.getDataList();
        this.listLoading = false;

        if (this.loadStatus != 1) {
          this.finished = true;
        }
      }, 500);
    },
    // 下拉刷新
    onRefresh() {       
      setTimeout(() => {
        console.log("下拉刷新")
        this.finished = false;
        this.isLoading = false;
        this.list = []
        this.onLoad()
      }, 500);
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
      var param = this.param;
      let params = {
        user_id: param.user_id,
        upload_no: param.upload_no,
        id: param.id,
        page: this.page
      };
      console.log(params);
      let url = this.$global_msg.getAllUploadedBus;
      this.axios.post(url, params).then(res => {
        console.log(this.page);
        console.log(res);
        var res = res.data;
        if (res.status == 1) {
          let data = res.data;
          for (let key in data) {
            this.list.push(data[key]);
          }
        } else {
          // console.log('阻止滚动事件===')
          // this.disabled = true;
          this.loadStatus = res.status;
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
          var res = res.data;
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
  mounted() {
    let winHeight = document.documentElement.clientHeight                          //视口大小
    document.getElementById('list-content').style.height = (winHeight - 20) +'px'  //调整上拉加载框高度
    this.getDataList()
  }
};
</script>

<style lang="scss" scoped>
.list-content {
    overflow:scroll;
}
.list-item {
    text-align:center;
}
.list_style {
  width: 100%;
  background-color: #ffffff;
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

/* .bus-repeat-list {
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
} */
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
