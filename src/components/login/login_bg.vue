<!-- 登录背景组件 -->
<template>
  <div class="homepage-hero-module">
    <div class="video-container">
      <div :style="fixStyle" class="filter">
        <!--内容-->
        <div class="login_warp">
          <div class="login_title">抽奖后台管理系统</div>
          <el-form label-position="top" label-width="80px" :model="formdata" class="login-form">
            <el-form-item>
              <el-input v-model="formdata.user_name" ref="user_name"  placeholder="UserName">
                <i slot="prefix" class="el-input__icon el-icon-s-custom"></i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                :key="passwordType"
                :type="passwordType"
                placeholder="Password"
                ref="password"
                autocomplete="off"
                v-model="formdata.password"
              >
                <i slot="prefix" class="el-input__icon el-iconsuo"></i>
              </el-input>
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :class="passwordType === 'password' ? 'el-input__icon el-iconeye' : 'el-input__icon el-iconyanjing'"
                />
              </span>
            </el-form-item>
            <el-button type="primary" class="login-submit" @click="clickLogin()">登录</el-button>
          </el-form>
        </div>
      </div>
      <video :style="fixStyle" autoplay loop muted class="fillWidth" v-on:canplay="canplay">
        <source src="../../assets/video/G1s.mp4" type="video/mp4" />浏览器不支持 video 标签，建议升级浏览器。
      </video>
      <div class="poster hidden" v-if="!vedioCanPlay">
        <img :style="fixStyle" src="../../assets/video/G1.jpg" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["formdata"],
  name: "Login_bg",
  data() {
    return {
      vedioCanPlay: false,
      fixStyle: "",
      passwordType: "password"
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.$parent.keyupDown();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    window.onresize = () => {
      const windowWidth = document.body.clientWidth;
      const windowHeight = document.body.clientHeight;
      const windowAspectRatio = windowHeight / windowWidth;
      let videoWidth;
      let videoHeight;
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth;
        videoHeight = videoWidth * 0.5625;
        this.fixStyle = {
          height: windowWidth * 0.5625 + "px",
          width: windowWidth + "px",
          "margin-bottom": (windowHeight - videoHeight) / 2 + "px",
          "margin-left": "initial"
        };
      } else {
        videoHeight = windowHeight;
        videoWidth = videoHeight / 0.5625;
        this.fixStyle = {
          height: windowHeight + "px",
          width: windowHeight / 0.5625 + "px",
          "margin-left": (windowWidth - videoWidth) / 2 + "px",
          "margin-bottom": "initial"
        };
      }
    };
    window.onresize();
  },
  //方法(函数)
  methods: {
    canplay() {
      this.vedioCanPlay = true;
    },
    clickLogin() {
      this.$parent.HandleLogin();
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    }
  }
};
</script>
<style scoped  lang="scss">
/* @import url(); 引入css类 */
$dark_gray: #889aa4;

.homepage-hero-module,
.video-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
  padding: 0px;
  margin: 0px;
}
video {
  margin-top: -30px;
}
.video-container .poster img,
.video-container video {
  z-index: 0;
  position: absolute;
}

.video-container .filter {
  z-index: 1;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
}
.login_warp {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .login-form {
    width: 400px;
    // background: #ffffff;
    padding: 30px;
    border-radius: 5px;
  }
  .login-submit {
    width: 100%;
  }
  .el-input__icon {
    width: 25px !important;
  }
  .login_title {
    font-size: 25px;
    font-weight: bold;
    color: white;
    margin-top: -30px;
  }
}
.show-pwd {
  position: absolute;
  right: 10px;
  top: 0px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>