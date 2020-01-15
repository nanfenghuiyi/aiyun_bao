<template>
  <div class="container" v-loading="loading" :element-loading-text="loadText" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="share-recommend-list" id="share-recommend-list">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="listLoading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="10" >
          <div class="list-item">
            <van-cell v-for="(item, index) in recommendList" :key="index">
              <div class="list_li">
                <span>{{item.phone}}</span>
                <span>{{item.time}}</span>
              </div>
            </van-cell>
          </div>
        </van-list>
      </van-pull-refresh>
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
      resLoading: true, // 加载中

      recommendList: [],
      status: -1,

      page: 1,
      // 下拉刷新
      listLoading: false,   //是否处于加载状态
      finished: false,  //是否已加载完所有数据
      isLoading: false,   //是否处于下拉刷新状态
    }
  },
  methods: {
    // 上拉加载
    onLoad() {    
      if (this.recommendList.length<20) {
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
        vant.Toast('刷新成功');
        this.isLoading = false;
        this.page = 1;
        this.recommendList = [];
        this.getDataList()
      }, 500);
    },
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
