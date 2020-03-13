<!--  -->
<template>
  <el-row type="flex" class="row-bg" justify="space-between">
    <el-col :span="12" class="title-left">
      <div class="grid-content bg-purple">
        <div class="header-left-content">
          <i
            @click="toggleClickNew()"
            :class="isCollapse==true?'hamburger el-input__icon el-iconweibiaoti25':'hamburger el-input__icon el-iconshouqi'"
            style="height:100%;"
          ></i>
          <div class="header-tetle">抽奖管理系统</div>
        </div>
      </div>
    </el-col>
    <el-col :span="6" class="title-right">
      <div class="grid-content bg-purple" style="height:100%;display:flex;">
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-input__icon el-icon-rank" style="font-size:26px;"></i>
          </el-tooltip>
        </div>
        <el-dropdown class="avatar-container" trigger="click" style="height:100%;">
          <div class="avatar-wrapper" style="height:100%">
            <img src="../../assets/images/user_head.jpg" class="user-avatar" />
            <i class="el-icon-caret-bottom" style="color:white;" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/index" class="link_line">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <el-dropdown-item @click.native="loginout()">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ["isCollapse"],
  name: "hearder_bar",
  data() {
    return { fullscreen: false };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  //方法(函数)
  methods: {
    toggleClickNew() {
      this.isCollapse = !this.isCollapse;
      this.$emit("change", this.isCollapse);
    },
    loginout() {
      localStorage.removeItem("Token");
      this.$router.push("/");
    },
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.title-right {
  height: 55px !important;
  text-align: right;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
}
.title-left {
}
.header-left-content {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.header-tetle {
  font-size: 20px;
  color: white;
  margin: 0px 0px 0px 10px;
}
.hamburger {
  display: inline-block;
  vertical-align: middle; /*  */
  width: 20px;
  height: 20px;
  color: white;
}
.hamburger.is-active {
  transform: rotate(180deg);
}
.link_line {
  text-decoration: none;
}
.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  margin-top: 7px;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
  color: white;
  padding-top: 7px;
  position: relative;
  width: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
</style>