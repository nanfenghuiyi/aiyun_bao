<template>
  <div id="app" :style="{ height: scrollerHeight }">
    <router-view id="apply" />
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {};
  },
  computed: {
    // 滚动区高度
    // (业务需求：手机屏幕高度减去头部标题和底部tabbar的高度，当然这2个高度也是可以动态获取的)
    scrollerHeight: function() {
      return (window.innerHeight) + 'px';
    },
  },
  methods: {},
  created() {
    var clientHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    window.onresize = function() {
      var nowClientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (clientHeight - nowClientHeight > 60) {
        //因为ios有自带的底部高度
        //键盘弹出的事件处理
        // vant.Toast("键盘弹出的事件处理", this.focus);
        // this.focus = true;
        // document.querySelector("#apply").scrollTop = 200;
        document.getElementById("app").classList.add("focusState");
      } else {
        //键盘收起的事件处理
        // vant.Toast("键盘收起的事件处理", this.focus);
        // this.focus = false;
        document.getElementById("app").classList.remove("focusState");
      }
    };
  },
  mounted() {
    console.log("这是APP中的事件");
    Vue.prototype.param = {
      city_code: "028",
      identity: 1,
      user_id: "3e4414e6-f287-4d6b-b194-4cb1624e8627"
    };
  }
};
</script>

<style lang="scss">
.focusState {
  position: absolute;
  bottom: 0;
}
#app {
  width: 100%;
  // height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  background-color: #f1f3f5;
  a {
    // font-weight: bold;
    text-decoration: none;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  ul,
  li {
    list-style: none;
  }
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #999999;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #999999;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #999999;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #999999;
  }
}
</style>
