<template>
  <div
    class="container"
    v-loading="loading"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="mp-main">
      <div class="flex-row mp-box-title bottom-border">
        <!-- <img @click="closePay" class="mp-img-close" src="@/assets/Pay/icon_gray_close.png" /> -->
        <span class="title">支付</span>
      </div>
      <div class="mp-alert-pay-type">
        <ul id="price-info-list">
          <li v-for="(item, index) of priceInfoList" :key="index">
            <span>{{item.text}}</span>
            <span>{{item.price}}</span>
          </li>
        </ul>
        <div class="flex-row mp-alert-pay-type-row">
          <img class="img" src="@/assets/Pay/wechat_pay.png" />
          <span class="span">微信支付</span>
          <input class="input" name="radio" type="radio" checked="checked" value="1" />
        </div>
        <div class="flex-row mp-alert-pay-type-row">
          <img class="img" src="@/assets/Pay/alipay.png" />
          <span class="span">支付宝支付</span>
          <input class="input" name="radio" type="radio" value="2" />
        </div>
      </div>
      <div @click="pay" class="mp-alert-pay-btn" v-text="payBtn"></div>
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
      loadText: "获取中",

      priceInfoList: [], // 账单信息
      payBtn: "确认支付0.00元", // 确定支付
    };
  },
  methods: {
    /**
     * 获取账单信息
     */
    getPayInfo() {
      this.loadText = "正在获取";
      this.loading = true;
      var priceInfoList = this.priceInfoList;
      let url = this.$global_msg.getPayInfo;
      let params = this.param;
      this.axios.post(url, params).then(res => {
        this.loading = false;
        console.log(res);
        var res = res.data;
        if (res.status == 1) {
          switch (res.ext) {
            case 1:
              var data = res.data;
              if (data != null) {
                if (data.price && parseFloat(data.price) != 0.00) {
                  let start_info = {
                    type: 2,
                    text: "行程费用",
                    price: data.price + "元"
                  };
                  priceInfoList.push(start_info);
                }
                if (data.discount_money && parseFloat(data.discount_money) != 0.00) {
                  let discount_money = {
                    type: 1,
                    text: "优惠金额",
                    price: data.discount_money + "元"
                  };
                  priceInfoList.push(discount_money);
                }
                if (data.order_reward && parseFloat(data.order_reward) != 0.00) {
                  let order_reward = {
                    type: 1,
                    text: "奖励金额",
                    price: data.order_reward + "元"
                  };
                  priceInfoList.push(order_reward);
                }
                if (data.parking_fee && parseFloat(data.parking_fee) != 0.00) {
                  let parking_fee = {
                    type: 2,
                    text: "停车费",
                    price: data.parking_fee + "元"
                  };
                  priceInfoList.push(parking_fee);
                }
                if (data.road_bridge_fee && parseFloat(data.road_bridge_fee) != 0.00) {
                  let road_bridge_fee = {
                    type: 2,
                    text: "高速费",
                    price: data.road_bridge_fee + "元"
                  };
                  priceInfoList.push(road_bridge_fee);
                }
                if (data.toll_fee && parseFloat(data.toll_fee) != 0.00) {
                  let toll_fee = {
                    type: 2,
                    text: "路桥费",
                    price: data.toll_fee + "元"
                  };
                  priceInfoList.push(toll_fee);
                }
                this.payBtn = "确认支付 " + data.pay_price + " 元"
              }
              break;

            case 2:
              vant.Toast(res.msg);
              break;
          }
          console.log(this.priceInfoList)
        } else if (res.status == 3) {
          window.location.href = res.data;
        } else {
          vant.Toast(res.msg);
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })

      // //支付
      // if (priceInfoList && priceInfoList.length > 0) {
      //   this.pay(payType, param.order_no, param.user_id, param.order_type);
      // } else {
      //   vant.Toast("未获取到价格信息，无法发起支付");
      // }
    },
    /**
     * 点击支付
     * @param payType 支付类型 1 微信， 2 支付宝
     * @param order_no 订单号
     * @param user_id 用户id
     */
    pay(payType, order_no, user_id, order_type) {
      this.loadText = "正在提交"
      this.loading = true;
      let url = this.$global_msg.unifiedOrder;
      var param = this.param;
      var payType = $("input[name='radio']:checked").val();
      let params = {
        user_id: param.user_id,
        order_no: param.order_no,
        order_type: param.order_type,
        channel: payType
      }
      console.log(params)
      this.axios.post(url, params).then(res => {
        this.loading = false;
        var res = res.data;
        console.log(res);
        if (res.status == 1) {
          switch (res.ext) {
            case 1: // 下单成功
              var res = res.data;
              window.location = res;
              break;

            case 2:
              vant.Toast(res.msg);
              break
          }
        } else {//统一下单失败
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
    this.getPayInfo();
  }
};
</script>

<style lang="scss" scoped>

.mp-main {
  width: 100%;
  background-color: #ffffff;
  height: auto;
  .bottom-border {
    border-bottom: 1px solid #d5d5dc;
  }
  .mp-box-title {
    font-size: 20px;
    padding: 10px 12px;
    display: flex;
    .title {
      color: #1fb1ff;
      flex: 1;
      text-align: center;
    }
  }
}

.mp-alert-pay-type {
  flex: 1;
  margin: 12px 0;
}
.mp-alert-pay-type-row {
  padding: 15px 23px;
  font-size: 18px;
  align-items: center;
  display: flex;
  align-items: center;
  .img {
    width: 23px;
    height: 23px;
  }
  .span {
    flex: 1;
    margin: 0 10px;
  }
  .input {
    width: 23px;
    height: 23px;
    color: #1fb1ff;
  }
}
.mp-alert-pay-btn {
  background-color: #1fb1ff;
  font-size: 22px;
  color: white;
  text-align: center;
  padding: 15px 0;
}
.mp-main ul {
  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.15rem 0.6rem;
    span {
      font-size: 0.3rem;
      color: #666666;
    }
  }
  .active span {
    font-size: 0.3rem;
    color: #fe8d2a;
  }
}
</style>
