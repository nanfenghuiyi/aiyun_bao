<template>
  <div v-loading="loading" :element-loading-text="loadText" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="header">
      <img alt="head" src="@/assets/Utils/face_icon.png" />
      <div class="header-text">
        <span class="header-name">您好，车主</span>
        <span class="header-msg">请选择您要注册的城市</span>
      </div>
    </div>
    <ul id="province-list" class="list-style listHeight">
      <li v-for="(item, index) of provincesList" :key="index" @click="getCities(item)">
        <img alt="" src="@/assets/Utils/icon_location.jpg" />
        <span>{{item.province}}</span>
      </li>
    </ul>
    <!-- 城市列表 -->
    <div>
      <el-drawer
        :visible.sync="cityDrawer"
        :show-close="false"
        size="70%">
        <div class="innerDrawer">
          <ul class="list-style">
            <li v-for="(item, index) in citysList" :key="index" @click="getAds(item)">{{item.city}}</li>
          </ul>
          <div>
            <el-drawer
              :append-to-body="true"
              :visible.sync="AdsDrawer"
              :show-close="false"
              size="45%">
              <ul class="list-style">
                <li v-for="(item, index) in AdsList" :key="index" @click="selectAds(item)">{{item.district}}</li>
              </ul>
            </el-drawer>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      loadText: "获取中...",

      cityInfo: "", // 城市信息
      type: "", // 传递的类型 express-快车
      province: "",
      pro_code: "",
      city: "",
      city_code: "",
      provincesList: [], // 省列表
      citysList: [], // 城市列表
      AdsList: [], // 区县列表

      // 城市列表
      cityDrawer: false,
      AdsDrawer: false,
    };
  },
  methods: {
    /**
     * 获取省
     */
    getProvinces() {
      this.loading = true;
      let url = this.$global_msg.getProvinces;
      let params = {user_id: this.param.user_id}
      this.axios.post(url, params).then(res => {
        console.log(res);
        this.loading = false;
        var res = res.data;
        if(res.status == 1){
          if (res.data != null && res.data.length > 0) {
            this.provincesList = res.data;
          } else {
            vant.Toast("暂无数据");
          }
        } else {
          this.loading = false;
          vant.Toast(res.msg);
        }
      }).catch(err => {
        this.loading = false;
        console.log("err===", err)
      })
    },
    /**
     * 获取城市
     * @param obj
     * @param pro
     * @param code
     */
    getCities(item) {
        this.province = item.province;
        this.pro_code = item.province_code;
        let url = this.$global_msg.getCities;
        let params = {
          user_id: this.param.user_id,
          province: this.province,
          pro_code: this.pro_code
        }
        this.axios.post(url, params).then(res => {
          this.loading = false;
          console.log(res);
          console.log(params)
          var res = res.data;
          if(res.status == 1){
            this.cityDrawer = true;
            if (res.data != null && res.data.length > 0) {
              this.citysList = res.data;
            } 
          } else {
            this.loading = false;
            this.cityInfo = {   //选择城市信息
              province: this.province,
              pro_code: this.pro_code,
              city: this.province,
              city_code: this.pro_code
            };
            console.log(this.cityInfo)
            vant.Toast(res.msg);
          }
        }).catch(err => {
          this.loading = false;
          console.log("err===", err)
        })
    },
    /**
     * 获取区县
     * @param obj
     * @param c
     * @param code
     */
    getAds(item) {
      console.log(item)
      this.AdsDrawer = true;
      this.city = item.city;
      this.city_code = item.code;
      if(this.type == "express"){ // 快车
        let cityInfo = {   //选择城市信息
          province: this.province,
          pro_code: this.pro_code,
          city: this.city,
          city_code: this.city_code
        };
      } else {
        let url = this.$global_msg.getAds;
        let params = {
          user_id: this.param.user_id,
          city: this.city,
          city_code: this.city_code
        }
        this.axios.post(url, params).then(res => {
          console.log(res);
          var res = res.data;
          if(res.status == 1){
              if (res.data != null && res.data.length > 0) {
                this.AdsList = res.data;
              }
          } else {
            let cityInfo = {   //选择城市信息
              province: this.province,
              pro_code: this.pro_code,
              city: this.city,
              city_code: this.city_code
            };
            vant.Toast(res.msg);
          }
        }).catch(err => {
          console.log("err===", err)
        })
      }
    },
    /**
     * 选择好区县
     * @param obj
     * @param dist
     * @param ad_code
     */
    selectAds(item) {
      this.cityDrawer = false;
      this.AdsDrawer = false;
      let cityInfo = {   //选择城市信息
        province: this.province,
        pro_code: this.pro_code,
        city: this.city,
        city_code: this.city_code,
        dist: item.district,
        ad_code: item.district_code,
        msg: false
      };
    }
  },
  mounted() {
    this.param = {bus_no : 308, user_id: "3e4414e6-f287-4d6b-b194-4cb1624e8627"};
    this.getProvinces();
  }
};
</script>

<style lang="scss">
@import "../../styles/main.scss";

</style>

<style lang="scss" scoped>

.listHeight{
  height: 580px;
}
</style>
