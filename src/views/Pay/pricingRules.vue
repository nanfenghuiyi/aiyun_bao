<template>
  <div
    class="container"
    v-loading="loading"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="main-rules">
      <img src="@/assets/Pay/img_car_picture.png" alt="img" />
      <div class="title">爱运计价规则</div>
      <div class="time-title">
        <i></i>
        <span>实时用车</span>
        <i></i>
      </div>
      <ul id="price-detail">
        <li v-for="(item, index) of priceData" :key="index">
          <span>{{item.text}}</span>
          <span>{{item.price}}</span>
        </li>
      </ul>
      <p id="far-info-text"></p>
      <div class="line"></div>
      <ul>
        <li>
          <span>夜间费</span>
          <span id="night-price" v-text="nightPrice"></span>
        </li>
      </ul>
      <p id="night-text" v-text="nightText"></p>
      <div class="line"></div>
      <ul>
        <li>多人拼车</li>
      </ul>
      <p id="share-1" v-text="share1"></p>
      <p id="share-2" v-text="share2"></p>
      <p id="share-3" v-text="share3"></p>
      <div class="line"></div>
      <ul>
        <li>拼车一口价</li>
      </ul>
      <p>拼车全称一口价，堵车不加价。但发生更改目的地，实际里程超出预估里程时，将恢复实时计价。</p>
      <div class="line"></div>
      <p>注1：里程费、时长费合计不足起步价时，将直接按起步价计费</p>
      <p>注2：高速费、路桥费、停车费、其他费用按行驶过程中司机实际垫付费用收取</p>
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
      loadText: "获取中",

      priceData: [], // 价格详情
      nightPrice: "", // 夜间费
      nightText: "", // 加收夜间服务费
      share1: "", // 1人拼车按爱运快车价格
      share2: "", // 2人拼车按爱运快车价格
      share3: "", // 3人拼车按爱运快车价格
    };
  },
  methods: {
    /**
     * 获取计价规则
     */
    getPriceRules() {
      this.loadText = "正在获取";
      this.loading = true;
      var priceData = this.priceData;
      let url = this.$global_msg.getPriceConfig;
      let params = {
        user_id: this.param.user_id,
        order_no: this.param.order_no
      }
      this.axios.post(url, params).then(res => {
        console.log(res);
        this.loading = false;
        var res = res.data;
        if(res && res.status == 1){
            let data = res.data;
            if (data.start_config != null && data.start_config.price != null) {
                let start_config = {
                    type: 2,
                    text: "起步价",
                    price: data.start_config.price + "元"
                };
                priceData.push(start_config);
            }
            if(data.price_per_kilometre != null){
                let price_per_kilometre = {
                    type: 2,
                    text: "里程费",
                    price: data.price_per_kilometre + "元/公里"
                };
                priceData.push(price_per_kilometre);
            }
            if(data.price_per_minute != null){
                let price_per_minute = {
                    type: 2,
                    text: "时长费",
                    price: data.price_per_minute + "元/分钟"
                };
                priceData.push(price_per_minute);
            }
            if(data.far_config != null && data.far_config.price_per_kilometre != null){
                let far_config = {
                    type: 2,
                    text: "远途费",
                    price: data.far_config.price_per_kilometre + "元/公里"
                };
                priceData.push(far_config);
                if (data.far_config.distance != null) {
                    $("#far-info-text").text("超出 "+ data.far_config.distance + " 公里后，加收远途费");
                }
            }

            if (data.night_config != null) {
                if (data.night_config.price_per_minute != null) {
                  this.nightPrice = (data.night_config.price_per_minute + "元/公里");
                }
                if (data.night_config.start_time1 != null && data.night_config.end_time1 != null && data.night_config.start_time1 != "" && data.night_config.end_time1 != "") {
                  this.nightText = ("夜间（" + format(data.night_config.start_time, "hh:mm") + "-次日" + format(data.night_config.end_time, "hh:mm") + "），加收夜间服务费");
                } else if (data.night_config.start_time != null && data.night_config.end_time != null) {
                  this.nightText = ("夜间（" + data.night_config.start_time + "-次日" + data.night_config.end_time + "），加收夜间服务费");
                }
            }
            if (data.share_config != null && data.share_config.config != null) {
                if (data.share_config.config.one != null) {
                  this.share1 = ("1人拼车按爱运快车价格的" + (parseFloat(data.share_config.config.one))+ "%计费");
                }
                if (data.share_config.config.two != null) {
                  this.share2 = ("2人拼车按爱运快车价格的" + (parseFloat(data.share_config.config.two))+ "%计费");
                }
                if (data.share_config.config.three != null) {
                  this.share3 = ("3人拼车按爱运快车价格的" + (parseFloat(data.share_config.config.three))+ "%计费");
                }
            }
        } else {
            vant.Toast(res.msg);
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    }
  },
  mounted() {
    this.getPriceRules();
  }
};
</script>

<style lang="scss" scoped>
body {
  background-color: #ffffff;
}
.main-rules {
  background-color: #ffffff;
  font-size: 16px;
  padding: 10px 0;
  width: 80%;
  margin: 0 auto;
  overflow: scroll;
  img {
    width: 100%;
  }
  .title {
    font-size: 20px;
    color: #000000;
    text-align: center;
    padding: 15px;
  }
  .time-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
      font-size: 16px;
      color: #111111;
      padding: 0 5px;
    }
    i {
      height: 1px;
      flex: 1;
      background-color: #acacac;
    }
  }
  ul li {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: #000000;
    padding: 5px 0;
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: #acacac;
    margin: 15px 0;
  }
  p {
    font-size: 14px;
    color: #444444;
    margin: 2px 0;
    line-height: 20px;
  }
  b {
    font-size: 14px;
    color: #111;
    margin: 5px 0;
  }
}
</style>
