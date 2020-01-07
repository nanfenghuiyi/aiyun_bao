<template>
  <div
    class="container"
    v-loading="loading"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="main">
      <div class="title">
        <i></i>
        <span>拼车预估价格明细</span>
        <i></i>
      </div>
      <div class="price">
        <span id="price"></span>
        <span>元</span>
      </div>
      <ul id="price-detail">
        <li v-for="(item, index) of priceData" :key="index">
          <span>{{item.text}}</span>
          <span>{{item.price}}</span>
        </li>
      </ul>
      <p>*车费计算四舍五入取小数点后两位</p>
      <router-link class="router_link" to="/pricingRules">查看计价规则</router-link>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Vue from "vue";
Vue.use(vant);

export default {
  data() {
    return {
      loading: false,
      loadText: "获取中",
      param: [],

      type: 0, // 1 快车 2 出租车
      priceData: [], // 价格详情
    };
  },
  components: {},
  props: {},
  watch: {},
  computed: {},
  methods: {
    /**
     * 获取价格详情
     * 
     */
    getPriceDetail() {
      this.loadText = "正在获取";
      this.loading = true;
      var priceData = this.priceData;
      let url = this.$global_msg.getDetailEstimateInfo;
      this.axios.post(url, this.param).then(res => {
        console.log(res);
        this.loading = false;
        var res = res.data;
        if(res && res.status == 1){
          let data = res.data;
          $("#price").text(data.price);
          if (this.type == 1) { // 快车
            if(data.distance_info && parseFloat(data.distance_info.price) != 0.00){
              let distance_info = {
                type: 2,
                text: "里程费(" + (data.distance_info.distance/1000).toFixed(2) + "公里)",
                price: data.distance_info.price + "元"
              };
              priceData.push(distance_info);
            }
            if(data.duration_info && parseFloat(data.duration_info.price) != 0.00){
              let duration_info = {
                type: 2,
                text: "时长费(" + (data.duration_info.duration/60).toFixed(2) + "分钟)",
                price: data.duration_info.price + "元"
              };
              priceData.push(duration_info);
            }
            if(data.far_info && parseFloat(data.far_info.price) != 0.00){
              let far_info = {
                type: 2,
                text: "远途费(" + (data.far_info.distance/1000).toFixed(2) + "公里)",
                price: data.far_info.price + "元"
              };
              priceData.push(far_info);
            }
            if(data.night_info && parseFloat(data.night_info.price) != 0.00){
              let night_info = {
                type: 2,
                text: "夜间费",
                price: data.night_info.price + "元"
              };
              priceData.push(night_info);
            }
            if(data.extra && parseFloat(data.extra.discount) != 0.00){
              let discount = {
                type: 1,
                text: "优惠金额",
                price: data.extra.discount + "元"
              };
              priceData.push(discount);
            }
            if(data.extra && parseFloat(data.extra.award) != 0.00){
              let extra = {
                type: 1,
                text: "奖励金额",
                price: data.extra.award + "元"
              };
              priceData.push(extra);
            }
          }else if (this.type == 2) { // 出租车
            if(data.price && parseFloat(data.price) != 0.00){
              let price = {
                  type: 2,
                  text: "一口价(" + data.num +"座)",
                  price: data.price + "元"
              };
              priceData.push(price);
            }
            if(data.award && parseFloat(data.award) != 0.00){
              let extra = {
                  type: 1,
                  text: "奖励金额",
                  price: data.award + "元"
              };
              priceData.push(extra);
            }
          }
        } else {
          vant.Toast(res.msg);
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    },
  },
  created() {},
  mounted() {
    this.param = {},
    this.type = this.param.type;
    this.getPriceDetail()
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  width: 92%;
  height: 85%;
  flex-direction: column;
  background-color: #f1f3f5;
  position: absolute;
  font-size: 18px;
  color: #666666;
  padding: 50px 15px;
  margin: 0 auto;
  .title {
    font-size: 18px;
    color: #333;
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
      margin: 0 10px;
    }
    i {
      flex: 1;
      background-color: #acacac;
      height: 1px;
    }
  }
  .price {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    margin: 10px 0;
    font-size: 16px;
    span:first-child {
      color: #111111;
    }
    span:last-child {
      color: #666666;
    }
  }
  ul {
    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      span {
        font-size: 16px;
        color: #666666;
      }
    }
    .active span {
      font-size: 16px;
      color: #fe8d2a;
    }
  }
  p {
    font-size: 14px;
    color: #666666;
    padding: 20px 0;
    margin: 0 auto;
  }
  .router_link {
    display: inline-block;
    border: 1px solid #acacac;
    padding: 10px 0;
    font-size: 14px;
    color: #666666;
    text-align: center;
    width: 120px;
    margin: 0 auto;
  }
}
</style>
