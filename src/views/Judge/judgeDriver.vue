<template>
  <div
    class="container"
    v-loading="loading"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div id="judge-main" class="judge-main">
    <p class="m-t-20">
      <i></i>
      <span class="text" v-text="judgeText"></span>
      <i></i>
    </p>
    <div class="judge-content">
      <div class="judge-info">
        <el-rate v-model="judgeValue" @change="judgeChange"></el-rate>
        <p class="judge-hint" v-text="judgeHint"></p>
        <ul id="list-content" class="list-content" >
          <!-- <li :class="{'active':judgeChecked.indexOf(index)>-1}" 
            v-for="(item, index) of content" :key="index" 
            @click="setJudgeItem(index)">{{item.content}}</li> -->
          <li :class="{'active':judgeChecked.indexOf(1)>-1}" 
            @click="setJudgeItem(1)">晒u哦发表</li>
          <li :class="{'active':judgeChecked.indexOf(2)>-1}"
          @click="setJudgeItem(2)">拉开那五个覅颇为</li>
          <li :class="{'active':judgeChecked.indexOf(3)>-1}"
          @click="setJudgeItem(3)">发地区稳定</li>
          <li :class="{'active':judgeChecked.indexOf(4)>-1}"
          @click="setJudgeItem(4)">的请温柔</li>
          <li :class="{'active':judgeChecked.indexOf(5)>-1}"
          @click="setJudgeItem(5)">多1染发发呆</li>
        </ul>
      </div>
      <input id="remark" type="text" placeholder="其他想说的">
      <button @click="submitRating" class="submit active-btn">匿名提交</button>
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
      loadText: "图片上传中",

      result: [], //内容
      resultGood: [], // 好的评价
      resultBad: [], // 不好的评价
      judgeText: "请评价司机",
      judgeStatus: "",
      money: "",
      phone: "",

      remark: "", // 其他想说的
      judgeValue: 1, // 评论星星
      judgeHint: "指出不足",
      judgeIndex: 0,
      judgeChecked: [], // 评论点击后的状态
    };
  },
  methods: {
    // 评论星星改变
    judgeChange() {
      if (this.judgeValue != 5) {
        this.judgeHint = "指出不足";
      }else {
        this.judgeHint = "完美乘客，无可挑剔";
      }
    },
    /**
     * 获取评价信息
     */
    getRatingInfo() {
      var param = this.param;
      let params = {
        user_id: param.user_id,
        order_no: param.order_no,
        identity: "1",
        business_type: param.business_type
      };
      console.log("params", params);
      this.loadText = "加载中...";
      this.loading = true;
      let url = this.$global_msg.getRatingInfo;
      this.axios.post(url, params).then(res => {
        console.log(res);
        this.loading = false;
        var res = res.data;
        this.result = res;
        if (res && res.status == 1) {
          let data = res.data;
          if (res.ext == 1) { //已评价
            $(".submit, input").addClass("none");
            this.judgeText = "已评价司机";
            this.judgeHint = this.remark;
            let template = document.getElementById('template-judge-content-list').innerHTML;
            document.getElementById('list-content').innerHTML = doT.template(template)(data.content);

          } else if (res.ext == 2) { //未评价
            $(".submit, input").removeClass("none");
            this.judgeText = "请评价司机";
            this.judgeHint = "指出不足";
            let content = data.content;
            if (content.length > 0) {
              for (let i in content) {
                if (content[i].type == 1) {
                  this.resultGood.push(content[i]);
                } else {
                  this.resultBad.push(content[i]);
                }
              }
              $(".submit").attr("disabled", true);
              $(".submit").addClass("active-btn");
              let template = document.getElementById('template-judge-content-list').innerHTML;
              document.getElementById('list-content').innerHTML = doT.template(template)(resultBad);
            }
          } else if (res.ext == 3) { //没有获取到支付结果
            this.$router.push({ path: "payRequest" });
          } else {
            vant.Toast(res.msg)
          }
        } else {
          vant.Toast(res.msg)
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    },

    /**
     * 提交评价
     * @param user_id
     * @param order_no
     */
    submitRating() {
      let content = "";
      // 选中的标记
      for (const item of this.judgeChecked) {
        content += item;
        content += ",";
      }
      var param = this.param;
      content = content.substring(0, content.length - 1);
      let params = {
        user_id: param.user_id,
        order_no: param.order_no,
        business_type: param.business_type,
        identity: "1",
        star: this.judgeValue,
        remark: this.remark,
        content: content
      };
      console.log(param);
      this.loadText = "正在提交";     
      this.loading = true;
      let url = this.$global_msg.submitRating;
      this.axios.post(url, params).then(res => {
        console.log(res);
        this.loading = false;
        var res =res.data;
        if (res && res.status == 1) {
          if (res.ext == 1) {
            result = { ext: 1 };
            $(".submit, input").addClass("none");
            this.judgeText = "已评价司机";
            this.judgeHint = this.remark;
            let contentJudge = [];
            if (this.judgeValue == 5) {
              $(".list-content li").each(function () {
                if ($(this).hasClass("active")) {
                  for (let i = 0; i < resultGood.length; i++) {
                    if (resultGood[i].id == parseInt($(this).context.id)) {
                      contentJudge.push(resultGood[i])
                    }
                  }
                }
              });
            } else {
              $(".list-content li").each(function () {
                if ($(this).hasClass("active")) {
                  for (let i = 0; i < resultBad.length; i++) {
                    if (resultBad[i].id == parseInt($(this).context.id)) {
                      contentJudge.push(resultBad[i])
                    }
                  }
                }
              });
            }
            let template = document.getElementById('template-judge-content-list').innerHTML;
            document.getElementById('list-content').innerHTML = doT.template(template)(contentJudge);
          } else {
            vant.Toast(res.msg)
          }
        } else {
          vant.Toast(res.msg)
        }
      }).catch(err => {
        console.log("err===", err)
        this.loading = false;
      })
    },

    /**
    * 选择评价内容
    * @param obj
    * @param index
    */
    setJudgeItem(index) {
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

<style lang="scss">
@import "../../styles/main.scss";

</style>

<style lang="scss" scoped>
@import "../../styles/Judge/judge.scss";

</style>
