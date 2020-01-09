<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh"
    class="container"
    v-loading="loading"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="share-recommend">
      <h2>
        累计推荐用户
        <b id="invite_total" v-text="invite_total"></b>
      </h2>
      <ul id="grade">
        <li>
          <router-link :to="{name: 'recommendedNum', query: {id: '1' }}">
            <span>
              第一级推荐用户数
              <b id="invite_one" v-text="invite_one"></b>
            </span>
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'recommendedNum', query: {id: '2' }}">
            <span>
              第二级推荐用户数
              <b id="invite_two" v-text="invite_two"></b>
            </span>
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'recommendedNum', query: {id: '3' }}">
            <span>
              第三级推荐用户数
              <b id="invite_three" v-text="invite_three"></b>
            </span>
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </li>
        <!-- <li>
          <router-link :to="{name: 'recommendedNum', query: {id: '4' }}">
            <span>
              第四级推荐用户数
              <b id="invite_four" v-text="invite_four"></b>
            </span>
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </li> -->
      </ul>
    </div>
  </van-pull-refresh>
</template>

<script>
import Vue from "vue";
Vue.use(vant);

export default {
  data() {
    return {
      loading: false,
      loadText: "图片上传中",

      invite_total: 0,
      invite_one: 0,
      invite_two: 0,
      invite_three: 0,
      invite_four: 0,

      // 下拉刷新
      isLoading: false
    };
  },
  methods: {
    /**
     * 获取app传递过来的参数
     */
    getRecommendDetail() {
      this.loadText = "正在获取...";
      this.loading = true;
      let params = {
        user_id: this.param.user_id,
        grade: 0
      };
      console.log("params", params);
      let url = this.$global_msg.getRecommendDetail;
      this.axios.post(url, params).then(res => {
        console.log(res);
        this.loading = false;
        var res = res.data;
        if (res.status == 1) {
          let data = res.data;
          this.invite_total = data.invite_total;
          this.invite_one = data.invite_one;
          this.invite_two = data.invite_two;
          this.invite_three = data.invite_three;
          this.invite_four = data.invite_four;
        } else {
          vant.Toast(res.msg);
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        vant.Toast('刷新成功');
        this.isLoading = false;
        this.getRecommendDetail();
      }, 500);
    }
  },
  mounted() {
    this.getRecommendDetail()
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";

</style>

<style lang="scss" scoped>
@import "../../styles/Share/recommend.scss";

</style>
