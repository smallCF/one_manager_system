<!-- 登录组件 -->
<template>
  <div class="login_warp">
    <Login_bg ref="login" :formdata="formdata"></Login_bg>
  </div>
</template>

<script>
import Login_bg from "@/components/login/login_bg";
export default {
  data() {
    return {
      formdata: {
        user_name: "",
        password: ""
      }
    };
  },
  components: {
    Login_bg
  },
  beforeCreate() {
    if (localStorage.getItem("Token") === "admin") {
      this.$router.push("/index");
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    // 创建按键事件，执行登录
    this.keyupDown();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  //方法(函数)
  methods: {
    keyupDown() {
      document.onkeydown = e => {
        let _key = window.event.keyCode;
        if (_key === 13) {
          // 判断是否输入用户名或密码
          if (!this.formdata.user_name) {
            //调用子组件里面的方法
            this.$refs.login.$refs.user_name.focus();
            return;
          }
          if (!this.formdata.password) {
            this.$refs.login.$refs.password.focus();
            return;
          }
          this.HandleLogin();
        }
      };
    },
    async HandleLogin() {
      if (!this.formdata.user_name) {
        this.$refs.login.$refs.user_name.focus();
        return;
      }
      if (!this.formdata.password) {
        this.$refs.login.$refs.password.focus();
        return;
      }
      const that = this;
      // 登录方法
      // const res = await this.$http
      //   .post("login", this.formdata)
      //   .catch(function(res) {
      //     that.$message.warning("服务器异常，联系开发者");
      //   });
      // if (!res) {
      //   return;
      // }
      // const { code, message, count, data } = res.data;
      const code = 200;
      if (code == 200) {
        // localStorage.setItem("Token", data.Token);
        localStorage.setItem("Token", "admin");
        // this.$message.success(message);
        document.onkeydown = undefined;
        this.$router.push("/index");
      } else {
        // this.$message.error(message);
      }
    }
  }
};
</script>
<style scoped="scss">
/* @import url(); 引入css类 */
</style>