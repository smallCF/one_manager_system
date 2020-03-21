<!-- 首页 -->

<template>
  <el-container class="content">
    <!-- 左侧导航栏 -->
    <div class="aside-content">
      <SiadeBar :isCollapse="isCollapse" style="background-color: rgb(50, 65, 87);"></SiadeBar>
    </div>
    <el-container>
      <el-header class="title-content">
        <hearder_bar :isCollapse="isCollapse" @change="change"></hearder_bar>
      </el-header>
      <el-header class="heder-tags">
        <div class="content-box" :class="{'content-collapse':collapse}">
          <v-tags></v-tags>
          <div class="content">
            <transition name="move" mode="out-in">
              <keep-alive :include="tagsList">
                <router-view></router-view>
              </keep-alive>
            </transition>
            <el-backtop target=".content"></el-backtop>
          </div>
        </div>
      </el-header>
      <el-main class="el-main"></el-main>
    </el-container>
  </el-container>
</template>

<script>
import SiadeBar from "@/components/index/siade";
import vTags from "@/components/tags/Tags";
import hearder_bar from "@/components/index/heard";
import bus from "@/components/tags/bus";
export default {
  data() {
    return {
      tagsList: [],
      isCollapse: false,
      collapse: false
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.busfu();
    // this.$router.push("/table");
  },
  components: {
    SiadeBar: SiadeBar,
    "v-tags": vTags,
    hearder_bar: hearder_bar
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  //方法(函数)
  methods: {
    busfu() {
      bus.$on("collapse-content", msg => {
        this.collapse = msg;
      });
      // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
      bus.$on("tags", msg => {
        let arr = [];
        for (let i = 0, len = msg.length; i < len; i++) {
          msg[i].name && arr.push(msg[i].name);
        }
        this.tagsList = arr;
      });
    },
    change(type) {
      this.isCollapse = type;
    }
  }
};
</script>
<style scoped lang="scss">
/* @import url(); 引入css类 */
.content,
.el-menu-vertical-demo {
  height: 100%;
}
.avatar-container {
  margin-right: 30px;

  .avatar-wrapper {
    margin-top: 5px;
    position: relative;

    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
.title-content {
  height: 55px !important;
  line-height: 55px;
  background-color: #242f42;
}
.aside-left {
  position: relative;
  width: 205px;
  height: 100%;
  .aside-content {
    position: absolute;
    padding: 0px;
    margin: 0px;
    height: 100%;
    min-width: 205px;
  }
}
.heder-tags {
  height: 35px !important;
  width: 100%;
  padding: 5px 0px 0px 5px !important;
  ul {
    padding: 0px !important;
  }
}
</style>