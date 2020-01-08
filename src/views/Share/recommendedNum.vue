<template>
  <div class="container"
      v-loading="loading"
      :element-loading-text="loadText"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)">
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    </van-pull-refresh> -->
    <div class="share-recommend-list">
      <div id="listloading" class="listloading-list">
        <div>
          <ul class="infinite-list" id="share-recommend-list" v-infinite-scroll="load" infinite-scroll-disabled="disabled" infinite-scroll-immediate="false" infinite-scroll-delay="10">
            <li v-for="(item, index) of recommendList" :key="index">
              <span>{{item.phone}}</span>
              <span>{{item.time}}</span>
            </li>
          </ul>
          <!-- <p v-if="resLoading">加载中...</p>
          <p v-if="noMore">没有更多了</p> -->
        </div>
      </div>
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
      loadText: "加载中",
      disabled: false, // 滚动禁用
      loading: false, // 加载状态
      resLoading: true, // 加载中
      noMore: false, // 没有更多了

      recommendList: [],
      status: -1,

      page: 1,
      // 下拉刷新
      // isLoading: false,
    }
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
    // 下拉刷新
    /* onRefresh() {
      setTimeout(() => {
        vant.Toast('刷新成功');
        this.isLoading = false;
        this.page = 1;
        this.recommendList = [];
        this.getDataList()
      }, 500);
    }, */
    /**
     * 获取推荐用户列表信息
     */
    getDataList() {
      var params = {
        user_id: this.param.user_id,
        grade: this.param.id,
        page: this.page,
        page_size: 20
      };
      this.loadText = "正在加载...";
      this.loading = true;
      let url = this.$global_msg.getRecommendDetail;
      this.axios.post(url, params).then(res => {
        console.log(this.page);
        console.log(res);
        this.loading = false;
        var res = res.data;
        if (res.status == 1) {
          this.noMore = false;
          this.resLoading = true;
          var data = res.data;
          this.recommendList=this.recommendList.concat(res.data)
        } else {// 阻止滚动事件
          // console.log('阻止滚动事件===')
          this.disabled = true;
          this.noMore = true;
          this.resLoading = false;
          vant.Toast(res.msg);
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    }
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight //视口大小
    document.getElementById('share-recommend-list').style.height = (winHeight - 46) +'px'  //调整上拉加载框高度
    this.param.id = this.$route.query.id;
    this.getDataList();
  }
}
</script>

<style lang="scss">
@import "../../styles/main.scss";

</style>

<style lang="scss" scoped>
@import "../../styles/Share/recommend.scss";

</style>
