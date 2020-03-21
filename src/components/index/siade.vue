<!--  -->
<template>
  <el-menu
    default-active="$route.path"
    class="el-menu-vertical-demo"
    :default-active="onRoutes"
    :collapse="isCollapse"
    :unique-opened="true"
    background-color="#324157"
    text-color="#bfcbd9"
    hide-timeout="0"
    show-timeout="100"
    active-text-color="#20a0ff"
    router
  >
    <template v-for="item in items">
      <template v-if="item.subs">
        <el-submenu :index="item.index" :key="item.index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
          <template v-for="subItem in item.subs">
            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
              <template slot="title">{{ subItem.title }}</template>
              <el-menu-item
                v-for="(threeItem,i) in subItem.subs"
                :key="i"
                :index="threeItem.index"
              >{{ threeItem.title }}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
          </template>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.index" :key="item.index">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
import bus from "@/components/tags/bus";
export default {
  props: ["isCollapse"],
  data() {
    return {
      items: [
        {
          icon: "el-icon-user",
          index: "table",
          title: "用户管理"
        },
        {
          icon: "el-icon-goods",
          index: "tabs",
          title: "商品管理"
        },
        {
          icon: "el-icon-s-order",
          index: "order",
          title: "订单管理",
        },
        {
          icon: "el-icon-s-claim",
          index: "winner",
          title: "中奖管理",
        }
      ]
    };
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  //方法(函数)
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
      bus.$emit("collapse-content", msg);
    });
  }
};
</script>
<style scoped lang="scss">
/* @import url(); 引入css类 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  webkit-transition: 0s height, 0s padding-top, 0s padding-bottom;
  transition: 0s height, 0s padding-top, 0s padding-bottom;
  .el-submenu {
    width: 205px;
  }
}
.el-menu--collapse {
  .el-submenu {
    // width: 205px;
  }
}
.el-menu {
  border-right: 0;
}
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>