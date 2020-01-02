<template>
  <div class="container" v-loading="loading" :element-loading-text="loadText" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
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
        </ul>
      </div>
      <!-- <ul id="province-list" class="list-style">
        <li>
          <img alt="" src="@/assets/Utils/icon_location.jpg" />
          <span>1</span>
        </li>
      </ul> -->
      <van-index-bar>
        <van-index-anchor index="A" />
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell title="文本" />

        <van-index-anchor index="B" />
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell title="文本" />

        ...
      </van-index-bar>
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
    };
  },
  components: {},
  props: {},
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    this.param = {bus_no : 308, user_id: "3e4414e6-f287-4d6b-b194-4cb1624e8627"};
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/main.scss";

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

.popular-brand .text-hint {
    padding: 0.10rem 0.40rem ;
}
.popular-brand ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 0.70rem 0.30rem 0.30rem;
}
.popular-brand ul li {
    width: 16.66%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.28rem;
    color: #333333;
    padding: 0.10rem;
}
.popular-brand ul li img {
    width: 0.52rem;
    height: 0.52rem;
    margin-bottom: 0.10rem;
}

</style>
