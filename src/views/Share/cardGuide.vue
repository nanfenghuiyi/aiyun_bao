<template>
  <div class="container">
    <div class="guide-main">
      <h3>快车、出租车</h3>
      <ul>
        <li>
          <img src="@/assets/Share/kc1.jpg" alt />
          <img src="@/assets/Share/taxi2.jpg" alt />
          <p>可将您的二维码名片张贴在车身侧面</p>
        </li>
        <li>
          <img src="@/assets/Share/kc_taxi1.jpg" alt />
          <p>可将您的二维码名片张贴在车室前排或放在名片盒中</p>
        </li>
        <li>
          <img src="@/assets/Share/kc_taxi2.jpg" alt />
          <p>可将您的二维码名片张贴在座位靠背后方</p>
        </li>
      </ul>
      <h3>大巴车</h3>
      <ul>
        <li>
          <img src="@/assets/Share/bus4.jpg" alt />
          <p>可将您的二维码名片张贴在大巴车车门上</p>
        </li>
        <li>
          <img src="@/assets/Share/bus1.jpg" alt />
          <p>可将您的二维码名片张贴在大巴车车身侧面</p>
        </li>
        <li>
          <img src="@/assets/Share/bus2.jpg" alt />
          <p>可将您的二维码名片张贴在车室前排或放在名片盒中</p>
        </li>
        <li>
          <img src="@/assets/Share/bus3.jpg" alt />
          <p>可将您的二维码名片张贴在大巴车各座位靠背上方</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../styles/main.scss";

.guide-main {
  width: 92%;
  height: 100%;
  overflow: scroll;
  font-size: 16px;
  padding: 15px;
  h3 {
    text-align: center;
    padding: 15px 0;
  }
  ul li {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 100%;
      margin: 0 auto;
    }
    p {
      padding: 10px 0 35px 0;
      font-size: 14px;
      color: #6d6d6d;
    }
  }
}
</style>
