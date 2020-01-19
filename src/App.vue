<template>
  <div id="app" :style="{ height: scrollerHeight }">
  <!-- <div id="app"> -->
    <router-view id="apply" />
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {};
  },
  computed: {
    // 滚动区高度
    // (业务需求：手机屏幕高度减去头部标题和底部tabbar的高度，当然这2个高度也是可以动态获取的)
    scrollerHeight: function() {
      return window.innerHeight + "px";
    }
  },
  methods: {
    getParams(p) {
      console.log(p)
      // Vue.prototype.param = p;
    }
  },
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
    console.log("这是APP中的事件")
    // Vue.prototype.param = getParams();
    Vue.prototype.param = {
      city_code: "028",
      identity: 1,
      user_id: "4e6a5815-d119-44f9-a050-381f6debf0d0",
      bus_no: 308,
      employee_id: 569,
      employee_type: "1",
      order_no: "FPBV32MT",
      order_type: 4,
      log_id: "15764947343577704317"
    };
    /*将要给原生调用的方法挂载到 window 上面 不能加()*/
    window.getParams = this.getParams;
    /* window.οnlοad=function(){//调用交互
      window.getParams = this.getParams;
      this.getParams(p);
    } */
  }
};
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
}
.focusState {
  position: absolute;
  bottom: 0;
}
#app {
  width: 100%;
  // height: 667px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  // background-color: #F0F0F0;
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
