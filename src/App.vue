<template>
  <div id="app">
    <router-view id="apply" />
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {};
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
    // Vue.prototype.$global_msg.id = 123;
  }
};
</script>

<style lang="scss">
.focusState {
  position: absolute;
  bottom: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  a {
    font-weight: bold;
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
