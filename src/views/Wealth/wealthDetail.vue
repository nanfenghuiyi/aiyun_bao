<template>
  <div
    class="container"
    v-loading="loading"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="wealth-detail-main">
      <div class="title">
        <span class="type"></span>
        <span class="value"></span>
      </div>
      <ul id="wealth-detail">
        <li v-for="(item, index) of wealthDetail" :key="index">
          <span>{{item.text}}</span>
          <span>{{item.content}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Vue from "vue";
import { formatTwoDecimal, getNewsType, getNewsStatus, getWealthChannel, format } from "../../utils/util";

Vue.use(vant);

export default {
  data() {
    return {
      loading: false,
      loadText: "图片上传中",
      param: [],

      wealthDetail: [], // 钱包详情
    };
  },
  components: {},
  props: {},
  watch: {},
  computed: {},
  methods: {
    getParams() {
      var param = this.param;
      let params = {
        user_id: param.user_id,
        id: param.id,
        log_id: param.log_id
      };
      console.log(params)
      this.loadText = "获取中...";
      this.loading = true;
      let url = this.$global_msg.getPropertyDetail;
      this.axios.post(url, params).then(res => {
        console.log(res);
        var res = res.data;
        this.loading =false;
        if (res && res.status == 1) {
          let data = res.data;
          // $(".type").text($.getNewsType(data.type));
          $(".type").text(data.remarks);
          $(".value").text(formatTwoDecimal(data.value));
          if (data.type != null) {
            let type = {
              text: "类型",
              content: getNewsType(data.type)
            };
            this.wealthDetail.push(type);
          }
          if (data.status != null) {
            let status = {
              text: "状态",
              content: getNewsStatus(data.status)
            };
            this.wealthDetail.push(status);
          }
          if (data.extra != null) {
            let extra = data.extra;
            if (extra.channel != null) {
              let channel = {
                text: "账户类型",
                content: getWealthChannel(extra.channel + "")
              };
              this.wealthDetail.push(channel);
            }
            if (extra.name != null) {
              let name = {
                text: "账户姓名",
                content: extra.name
              };
              this.wealthDetail.push(name);
            }
            if (extra.account != null) {
              let account = {
                text: "账户账号",
                content: extra.account
              };
              this.wealthDetail.push(account);
            }
          }
          if (data.add_time != null) {
            let add_time = {
              text: "时间",
              content: format(data.add_time, "yyyy-MM-dd hh:mm:ss")
            };
            this.wealthDetail.push(add_time);
          }
          if (data.id != null) {
            let id = {
              text: "编号",
              content: data.id
            };
            this.wealthDetail.push(id);
          }
          if (data.balance != null) {
            let balance = {
              text: "剩余金额",
              content: formatTwoDecimal(data.balance)
            };
            this.wealthDetail.push(balance);
          }
          // if (data.remarks != null || (data.extra != null && data.extra.err_msg != null)) {
          if (data.extra != null && data.extra.err_msg != null) {
            let remarks = {
              text: "备注",
              // content: (data.remarks != null ? data.remarks : "") + (data.remarks != null && data.remarks != "" && data.extra.err_msg != null && data.extra.err_msg != "" ? "，" : "") + (data.extra.err_msg != null ? data.extra.err_msg : "")
              content: data.extra.err_msg
            };
            this.wealthDetail.push(remarks);
          }
        } else {
          vant.Toast(res.msg);
        }
      }).catch(err => {
        console.log("err===", err);
        this.loading =false;
      })
    }
  },
  created() {},
  mounted() {
    this.param = {
      // id: "",
      user_id: "3e4414e6-f287-4d6b-b194-4cb1624e8627",
      log_id: "15764947343577704317"
    };
    this.getParams();
  }
};
</script>

<style lang="scss" scoped>

.wealth-detail-main, .container {
  background-color: #f3f3f3;
  font-size: 16px;
  width: 100%;
  height: 100%;
  ul li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 10px;
    font-size: 14px;
    span:first-child {
      color: #6e6e6e;
      min-width: 20px;
    }
    span:last-child {
      color: #333333;
      margin-left: 5px;
    }
  }
  .title {
    border-bottom: 1px solid #cccccc;
    padding: 30px 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child {
      font-size: 18px;
      color: #333333;
      padding: 5px;
    }
    span:last-child {
      font-size: 18px;
      color: #333333;
    }
  }
}
</style>
