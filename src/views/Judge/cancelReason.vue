<template>
  <div
    class="container"
    v-loading="loading"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="cancel-main">
    <!--<div class="title">-->
    <!--<span>取消理由</span>-->
    <!--<span id="close">关闭</span>-->
    <!--</div>-->
    <!-- <ul id="cancel-reason">
      <li v-for="(item, index) of resultReason" :key="index">
        {{item.content}}
      </li>
    </ul> -->
    <ul id="list-content" class="list-content" >
      <!-- <li :class="{'active':judgeChecked.indexOf(index)>-1}" 
        v-for="(item, index) of content" :key="index" 
        @click="setReason(index)">{{item.content}}</li> -->
      <li :class="{'active':judgeChecked.indexOf(1)>-1}" 
        @click="setReason(1)">晒u哦发表</li>
      <li :class="{'active':judgeChecked.indexOf(2)>-1}"
      @click="setReason(2)">拉开那五个覅颇为</li>
      <li :class="{'active':judgeChecked.indexOf(3)>-1}"
      @click="setReason(3)">发地区稳定</li>
      <li :class="{'active':judgeChecked.indexOf(4)>-1}"
      @click="setReason(4)">的请温柔</li>
      <li :class="{'active':judgeChecked.indexOf(5)>-1}"
      @click="setReason(5)">多1染发发呆</li>
    </ul>
    <input v-model="remark" id="remark" type="text" placeholder="其他想说的">
    <button @click="submitCancelReason" class="submit active-btn">匿名提交</button>
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
      loadText: "图片上传中",

      result: [], // 内容
      remark: "", // 想说的内容
      resultReason: "", // 获取的内容
      judgeChecked: [], // 评论点击后的状态
    }
  },
  methods: {
    /**
     * 获取取消理由
     */
    getCancelReason() {
      this.loadText = "加载中...";
      this.loading = true;
      var param = this.param;
      let params = {
        user_id: param.user_id,
        identity: param.identity
      }
      let url = this.$global_msg.getCancelReason;
      this.axios.post(url, params).then(res => {
        console.log(res);
        this.loading = false;
        var res = res.data;
        this.result = res;
        if (res && res.status == 1) {
          this.resultReason = res.data;
        } else {
          vant.Toast(res.msg)
        }
      }).catch(err => {
        console.log("err===", err)
        this.result = res;
      })
      // //取消
      // $("#close").bind("click",function(){
      //     closeWebview();
      // });

    },

    /**
     * 提交取消理由
     */
    submitCancelReason(user_id, order_no) {
      this.loadText = "加载中...";
      this.loading = true;
      let reason = 0;
      $("#cancel-reason li").each(function () {
        if ($(this).hasClass("active")) {
          reason = $(this).context.id;
        }
      });
      let data = {
        reason: reason,
        remark: this.remark
      };
      paramsTo.postMessage(JSON.stringify(data));
      this.loading = false;
      closeWebview();
    },
    /**
     * 选择取消内容
     * @param obj
     * @param index
     */
    setReason(index) {
      if(this.judgeChecked.indexOf(index) == -1) {
        this.judgeChecked.push(index); // 实现添加效果只需要这句代码  
      }else { // 实现取消效果就要加上外面的判断条件 
        var spliceIndex = this.judgeChecked.indexOf(index);
        this.judgeChecked.splice(spliceIndex, 1);
      }
      // 判断是否有选择评论
      if (this.judgeChecked != null && this.judgeChecked != "") {
        $(".submit").attr("disabled", false);
        $(".submit").removeClass("active-btn");
      }else {
        $(".submit").attr("disabled", true);
        $(".submit").addClass("active-btn");
      }
    },
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>

.cancel-main {
    background-color: #ffffff;
    font-size: 0.28rem;
    color: #000000;
    padding: 0.20rem 0 0.40rem 0;
    display: flex;
    flex-direction: column;
}
.none {
    display: none;
}
.cancel-main .title {
    position: relative;
    width: 100%;
    padding: 0.20rem 0;
    border-bottom: 0.02rem solid #cccccc;
}
.cancel-main .title span:first-child{
    font-size: 0.35rem;
    color: #000000;
    display: inherit;
    text-align: center;
}
.cancel-main .title span:last-child{
    font-size: 0.35rem;
    color: #000000;
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
}
.cancel-main ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 0.3rem;
    flex-wrap: wrap;
    overflow: scroll;
    /*max-height: 4rem;*/
}
.cancel-main ul li {
    border: 0.02rem solid #cccccc;
    background-color: #ffffff;
    color: #333333;
    font-size: 0.26rem;
    padding: 0.20rem;
    text-align: center;
    margin: 2%;
    width: 100%;
}
.cancel-main ul .active {
    border: 0.02rem solid #ff9229;
    color: #ff9229;
    background-color: #fee9d1;
}
.cancel-main input {
    padding: 0.20rem;
    text-align: left;
    border: none;
    flex: 1;
    font-size: 0.33rem;
    color: #333333;
    margin: 0.30rem 2%;
    background-color: #eeeeee;
}
.cancel-main .submit {
    width: 96%;
    background-color: #5c5d65;
    color: #ffffff;
    font-size: 0.33rem;
    text-align: center;
    padding: 0.20rem 0;
    margin:  0 auto;
    border: none;
    border-radius: 0.04rem;
}
.cancel-main .active-btn {
    background-color: #bbbbbb;
    color: #ffffff;
}
</style>
