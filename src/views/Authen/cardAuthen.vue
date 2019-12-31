<template>
  <div class="upload-main" v-loading="loading" :element-loading-text="loadText" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
    <p class="context">1.您需要取得大巴车随车名片一张</p>
    <p class="context">2.请拍名片正反面照片各一张，要求图片清晰，不倾斜，不反光</p>
    <p class="context">
      3.为了给您更好更快捷的注册，
      <span>请您上传正反面照片各一张</span>
    </p>
    <ul id="demo-picture" class="demo-picture">
      <li>
        <span>正面图样</span>
        <el-image
          style="width: 150px; height: 100px"
          :src="srcList[0]"
          :preview-src-list="srcList"
          alt="demo"
        ></el-image>
        <span>点击查看大图</span>
      </li>
      <li>
        <span>反面图样</span>
        <el-image
          style="width: 150px; height: 100px"
          :src="srcList[1]"
          :preview-src-list="srcList"
          alt="demo"
        ></el-image>
        <span>点击查看大图</span>
      </li>
    </ul>
    <ul id="upload-picture" class="demo-picture">
      <li>
        <img id="img1" src="@/assets/Authen/card_back_add.jpg" alt="" />
        <input
          id="file1"
          class="file"
          type="file"
          accept="image/jpeg, image/gif, image/png, image/jpg"
          @change="showImg(1)"
        />
      </li>
      <li>
        <img id="img2" src="@/assets/Authen/card_face_add.jpg" alt="" />
        <input
          id="file2"
          class="file"
          type="file"
          accept="image/jpeg, image/gif, image/png, image/jpg"
          @change="showImg(2)"
        />
      </li>
    </ul>
    <div class="city" @click="getCity">
      <span>选择城市</span>
      <select id="select"></select>
    </div>
    <div class="submit" @click="submit">提交信息</div>
  </div>
</template>

<script>
import $ from "jquery";
import { canvasDataURL } from "../../utils/util";

export default {
  data() {
    return {
      srcList: [
        require('@/assets/Authen/card_face_demo.jpg'),
        require('@/assets/Authen/card_back_demo.jpg')
      ],
      loading: false,
      loadText: '加载中...',
      img1: '',
      img2: '',
      user_id: ''
    };
  },
  methods: {
    /**
     * 选择上传图片
     * @param index 选取上传下标
     */
    showImg(index) {
      index = index;
      var file;
      var that = this;
      if (index == 1) {
        file = $("#file1").get(0).files[0];
      } else {
        file = $("#file2").get(0).files[0];
      }
      var render = new FileReader();
      render.readAsDataURL(file);
      render.onload = function(e) {
        // console.log(e);
        // console.log(e.target.result);
        if (index == 1) {
          that.uploadPicture(1, e.target.result, 8, "A", that.img1); //名片正面
        } else if (index == 2) {
          that.uploadPicture(2, e.target.result, 8, "B", that.img2); //名片反面
        }
      };
    },
    /**
     * 图片上传
     * @param index 图片id
     * @param base64 图片base64
     * @param type 上传的类型12345678 身份证，驾驶证，行驶证，人车合照，上岗证，从业资格证, 8 名片
     * @param extra 正反面 A、B
     * @param last_file 上次回传的文件名（服务器上的路径
     */
    uploadPicture(index, base64, type, extra, last_file) {
      this.loadText = '图片上传中'
      this.loading = true;
      var that = this;
      canvasDataURL(base64, function callback(data) {
        let params = {
          user_id: that.user_id,
          base64: data,
          type: type,
          extra: extra,
          last_file: last_file
        };
        console.log(params);
        var url = that.$global_msg.uploadPicture;
        that.axios
          .post(url, params)
          .then(res => {
            console.log(res);
            var res = res.data;
            if (res && res.status == 1) {
              let path = res.data;
              switch (index) {
                case 1:
                  that.img1 = path;
                  $("#img1").attr("src", data);
                  break;
                case 2:
                  that.img2 = path;
                  $("#img2").attr("src", data);
                  break;
                default:
                  break;
              }
              that.loading = false;
            } else {
              that.loading = false;
              vant.Toast(res.data.msg);
            }
          })
          .catch(err => {
            that.loading = false;
            console.log(err);
          });
      });
    },
    // 获取城市
    getCity() {
      var url = this.$global_msg.getUploaderCity;
      var obj = { user_id: this.user_id };
      this.axios.post(url, obj).then(res => {
        console.log("res", res);
        var res = res.data;
        if (res) {
          if (res.status == 1) {
            let data = res.data;
            if (data != null) {
              var obj = document.getElementById("select");
              for (let i in data) {
                obj.add(new Option(data[i].city, data[i].citycode));
              }
            }
          } else {
            vant.Toast(res.msg);
          }
        }
      }).catch(err => {
        console.log('err===', err)
      })
    },
    // 提交信息
    submit() {
      if (this.img1 === "") {
        vant.Toast("请上传名片正面照片");
        return;
      }
      if (this.img2 === "") {
        vant.Toast("请上传名片反面照片");
        return;
      }
      var obj = document.getElementById("select");
      var index = obj.selectedIndex; //序号，取当前选中选项的序号
      if (index === -1) {
        vant.Toast("未选择负责城市，刷新获取城市后再试");
        return;
      }
      var code = obj.options[index].value;
      this.loadText = '正在提交...';
      this.loading = true;
      let params = {
        // user_id: param.user_id,
        user_id: this.user_id,
        paths: this.img1 + "," + this.img2,
        code: code != null ? code : ""
      };
      var url = this.$global_msg.uploadInfo;
      this.axios
        .post(url, params)
        .then(res => {
          console.log("res", res);
          console.log("res", params);
          var res = res.data;
          if (res) {
            if (res.status == 1) {
              $("#img1").attr("src", require("@/assets/Authen/card_face_add.jpg"));
              $("#img2").attr("src", require("@/assets/Authen/card_face_add.jpg"));
              this.img1 = '';
              this.img2 = '';
              this.loading = false;
              vant.Toast(res.msg);
            } else {
              this.loading = false;
              vant.Toast(res.msg);
            }
          }
        })
        .catch(err => {
          this.loading = false;
          console.log("err", err);
        });
    }
  },
  mounted() {
    this.user_id = this.$global_msg.user_id;
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/Authen/quick-upload.scss";
</style>
