<template>
  <div
    class="container"
    v-loading="loading"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="layer-left">
      <div class="header">
        <img alt="head" src="@/assets/Utils/face_icon.png" />
        <div class="header-text">
          <span class="header-name">您好</span>
          <span class="header-msg">请完善车辆信息成为车主</span>
        </div>
      </div>
      <div class="popular-brand">
        <div class="text-hint">
          <span>选择车辆品牌</span>
        </div>
        <ul id="hot-models-list">
          <li v-for="(item, index) of hotModels" :key="index" @click="getCarModel(item)">
            <img class="mr" :src="item.src" alt="">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <!-- <van-index-bar :index-list="letter" :sticky="false" highlight-color="#00f" @select="onSelect">
        <van-index-anchor :index="letter" v-for="(item, index) of allModels" :key="index">
          {{item.letter}} 
          <van-cell v-for="(item, index) of item.module" :key="index" @click="getCarModel(item)">
            <img class="mr" :src="item.src" alt="">
            <span>{{item.name}}</span>
          </van-cell>
        </van-index-anchor>
      </van-index-bar> -->

      <van-index-bar highlight-color="#00f">
        <div v-for="(item, index) of allModels" :key="index">
          <van-index-anchor :index="item.letter" />
            <van-cell v-for="(item, index) of item.module" :key="index" @click="getCarModel(item)">
              <img class="mr" :src="item.src" alt="">
              <span>{{item.name}}</span>
            </van-cell>
        </div>
      </van-index-bar>
    </div>
    <!-- 获取指定车型数据 -->
    <div>
      <el-drawer
        :visible.sync="carDrawer"
        :show-close="false"
        size="70%">
        <div class="innerDrawer">
          <ul class="list-style">
            <li v-for="(item, index) in carSeries" :key="index" @click="getCarColor(item)">{{item.model}}</li>
          </ul>
          <el-drawer
            :append-to-body="true"
            :visible.sync="innerDrawer"
            :show-close="false">
            <ul class="list-style">
              <li v-for="(itemSeries, index) in colorSeries" :key="index" @click="setCarColor(itemSeries)">
                <div class="color_style" :class="itemSeries.color"></div>
                <span>{{itemSeries.name}}</span>
              </li>
            </ul>
          </el-drawer>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

Vue.use(vant);

export default {
  data() {
    return {
      loading: false,
      loadText: "获取中...",
      letter: [], // 车辆首字母
      hotModels: [], // 热门车型
      allModels: [], // 所有车辆
      hot: ["一汽", "东风", "丰田", "别克", "起亚", "哈弗", "大众", "雪佛兰", "本田", "标致", "现代", "福特"],
      carSeries: [], // 车型所有系列
      colorSeries: [], // 车辆颜色

      mBrand: "", // 车辆类型
      mModel: "", // 车辆系列
      mColor: "", // 车辆颜色
      carInfo: [], // 车辆信息

      // 多层嵌套
      carDrawer: false,
      innerDrawer: false,

    };
  },
  components: {},
  props: {},
  watch: {},
  computed: {},
  methods: {
    onSelect(event) {
    },
    // 选取热门车型
    isHotModel(data) {
      if(this.hot.indexOf(data) == -1){
        return false;
      } else {
        return true;
      }
    },
    /**
     * 获取车辆
     */
    getParams() {
      let params = {
        brand: ""
      };
      this.loading = true;
      let url = this.$global_msg.getAllCarType;
      this.axios.post(url, params).then(res => {
        console.log("getAllCarType=", res);
        this.loading = false;
        var res = res.data
        if (res) {
          if (res.status == 1) {
            let data = res.data;
            if (data != null && data.length > 0) {
              // 获取 letter
              for (let i = 0; i < data.length; i++) {
                let ele = data[i].alpha;
                if (this.letter.indexOf(ele) == -1) {
                  this.letter.push(ele);
                }
              }
              this.letter.sort();
              console.log("车辆首字母", this.letter);
              // 获取 allModels
              for (let i = 0; i < this.letter.length; i++) {
                let modules = [];
                for (let j = 0; j < data.length; j++) {
                  if (data[j].alpha == this.letter[i]) {
                    let module = {
                      src: this.$global_msg.carLogo + data[j].logo,
                      name: data[j].brand
                    };
                    modules.push(module);
                  }
                }
                let allModel = {
                  letter: this.letter[i],
                  module: modules
                };
                this.allModels.push(allModel);
              }
              console.log("所有车型", this.allModels)
              // 获取 hotModels
              for (let j = 0; j < data.length; j++) {
                if (this.isHotModel(data[j].brand)) {
                  let hotModel = {
                    src: this.$global_msg.carLogo + data[j].logo,
                    name: data[j].brand
                  };
                  this.hotModels.push(hotModel);
                }
              }
              console.log("热门车型", this.hotModels)
            }
          } else {
            vant.Toast(res.msg);
          }
        }
      }).catch(err => {
        this.loading = false;
        console.log("err===", err)
      })
    },
    /**
     * 获取车辆系列
     */
    getCarModel(item) {
      console.log(item);
      this.loading = true;
      this.mBrand = item.name;
      let params = {
        brand: this.mBrand
      };
      let url = this.$global_msg.getAllCarType;
      this.axios.post(url, params).then(res => {
        console.log(res);
        this.loading = false;
        var res = res.data;
        if (res) {
          if(res.status == 1){
            this.carSeries = res.data;
            if (this.carSeries != null && this.carSeries.length > 0) {
              this.carDrawer = true;
            }
          } else {
            vant.Toast(res.msg);
          }
        }
      }).catch(err => {
        this.loading = false;
        console.log("err===", err)
      })
    },
    /**
     * 获取车辆颜色
     */
    getCarColor(item) {
      console.log(item)
      this.mModel = item.model;
      this.innerDrawer = true;
      this.colorSeries = this.$global_msg.color;
    },
    /**
     * 选择车辆颜色
     */
    setCarColor(itemSeries) {
      this.carDrawer = false,
      this.innerDrawer = false,
      this.carInfo = {
        brand: this.mBrand,
        model: this.mModel,
        color: itemSeries.color,
        msg: false
      };
      console.log(this.carInfo)
    }
  },
  created() {},
  mounted() {
    this.param = {
      bus_no: 308,
      user_id: "3e4414e6-f287-4d6b-b194-4cb1624e8627"
    };
    this.getParams();
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";

</style>

<style lang="scss" scoped>

img{
  width: 26px;
  height: 26px;
}
.mr{
  margin-right: 15px;
}
.color_style{
  width: 20px;
  height: 20px;
  border-radius: 100%;
  margin-right: 5px;
}

.layer-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  .header {
    background-color: dodgerblue;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 15px;
    margin: 10px 20px;
    border-radius: 5px;
    img {
      width: 15px;
      height: 15px;
      margin-right: 15px;
      margin-top: -20px;
    }
    .header-text {
      display: flex;
      flex-direction: column;
      .header-name {
        font-size: 15px;
        color: #ffffff;
      }
      .header-msg {
        font-size: 12px !important;
        color: #ffffff;
        margin-top: 5px;
      }
    }
  }
}

.popular-brand {
  .text-hint {
    padding: 3px 15px;
    font-size: 14px
  }
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 10px 4px 4px;
    li {
      width: 16.66%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
      color: #333333;
      padding: 5px;
      img {
        margin: 0 auto;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
