<template>
  <div class="login-container">
    <h1 style="margin: 1% 0px 0px 15%;cursor:default">BigD通行证</h1>
    <el-row>
      <el-col :span="24" style="text-align:center;margin-top:1%">
        <h1 style="cursor:default">BigD</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="text-align:center;margin-top:1%">
        <h2 style="cursor:default">登录BigD，与500万+ 名设计师一起交流设计、分享快乐吧！</h2>
      </el-col>
    </el-row>
    <el-form class="login-form" ref="formLogin" :model="formLoginValidate" :rules="ruleLogin">
      <el-tabs v-model="activeName">
        <el-tab-pane label="密码登陆" name="first">
          <div style="margin-top:6%" v-if="activeName==='first'">
            <!-- 输入框 -->
            <el-form-item prop='mobile'>
              <el-input v-model="formLoginValidate.mobile" size="large" type="text" placeholder="请输入您注册的手机号" />
            </el-form-item>
            <el-form-item prop='password'>
              <el-input v-model="formLoginValidate.password" size="large" type="password" placeholder="请输入您的密码" />
            </el-form-item>
          </div>
        </el-tab-pane>
        <el-tab-pane label="验证码登录" name="second">
          <div style="margin-top:6%" v-if="activeName==='second'">
            <el-form-item prop='mobile'>
              <el-input v-model="formLoginValidate.mobile" size="large" type="text" placeholder="请输入您注册的手机号" />
            </el-form-item>
            <el-row type='flex' justify="center">
              <el-col :span='14'>
                <el-form-item prop='verificationCode'>
                  <el-input v-model="formLoginValidate.verificationCode" size="large" type="text" placeholder="请输入验证码" />
                </el-form-item>
              </el-col>
              <el-col :span='10' style="text-align:right">
                <el-button style="width:90%" size="large" type="primary" plain @click="getMa" :loading="this.$store.state.ma.loading">
                  {{!this.$store.state.ma.loading?'获取验证码':'获取中...'}}
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 按钮 -->
      <el-row type="flex" justify="end" align="middle">
        <el-col :span="14">
          <el-checkbox v-model="checked">自动登陆</el-checkbox>
        </el-col>
        <el-col :span="5" style="text-align: end;">
          <el-button type="text" @click="getPwd">忘记密码？</el-button>
        </el-col>
        <el-col :span="5" style="text-align: end;">
          <el-button type="text" @click="goRegister">立即注册</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top:32px;margin-bottom:40px">
        <el-col :span='24'>
          <el-button size="large" style="width:100%" type="primary" :loading="this.$store.state.login.loading" @click="handleSubmit('formLogin')">
            {{ !this.$store.state.login.loading ? '登录' : '登录中...' }}
          </el-button>
        </el-col>
      </el-row>
      <!-- 使用第三方账户登录 -->
      <hr style="box-shadow: 0 0 1px #3333; height: 1px; border: 0px; background-color: #3333; color: #3333;" />
      <div class="title-container" style="margin-top:12px;margin-bottom:24px">
        <h3 style="text-align: center;cursor:default">使用第三方账户登录</h3>
      </div>
      <el-row type="flex" justify="center">
        <el-col :span='4' style="text-align: center;">
          <div class="qqpng" />
          <h5 style="color: #889aa4">QQ</h5>
        </el-col>
        <el-col :span='4' style="text-align: center;">
          <div class="blogpng" />
          <h5 style="color: #889aa4">微博</h5>
        </el-col>
        <el-col :span='4' style="text-align: center;">
          <div class="wechatpng" />
          <h5 style="color: #889aa4">微信</h5>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="24" style="text-align:center;margin-top:1%">
        <p style="cursor:default">京ICP备11017824号-4 / 京ICP证130164号 北京市公安局朝阳分局备案编号:110105000501</p>
        <p style="cursor:default">Copyright © 2016-2017 BigD 中文 English</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    //自定义用户名验证
    var user = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入您的手机号"));
      } else {
        const reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        // const reg1 = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        // if (!reg.test(value) && !reg1.test(value)) {
        if (!reg.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }
    };
    //密码自定义验证
    var pwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6) {
          callback(new Error("密码长度不能少于6位"));
        } else {
          callback();
        }
      }
    };
    return {
      activeName: "first",
      //自动登陆状态
      checked: false,
      //登陆表单字段
      formLoginValidate: {
        mobile: "",
        password: "",
        verificationCode: ""
      },
      //登陆表单验证
      ruleLogin: {
        mobile: [{ validator: user, trigger: "blur" }],
        password: [{ validator: pwd, trigger: "blur" }],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 跳转注册
    goRegister() {
      this.$router.push({ path: "/register" });
    },
    // 跳转找回密码
    getPwd() {
      this.$router.push({ path: "/getpwd" });
    },
    // 获取验证码
    getMa() {
      this.$refs["formRegister"].validateField("mobile", valid => {
        if (valid.length === 0) {
          this.$store
            .dispatch("GetMa", this.formLoginValidate.mobile)
            .then(response => {
              this.$message({
                message: "验证码已发送",
                type: "success"
              });
            })
            .catch(error => {
              this.$Notice.error({
                title: "获取验证码失败",
                desc: error
              });
            });
        }
      });
    },
    // 点击登陆
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.formLoginValidate.loginIp = returnCitySN["cip"];
          //手机密码登录
          if (this.activeName === "first") {
            this.$store
              .dispatch("SubmitLoginInfo", this.formLoginValidate)
              .then(response => {
                this.$router.push({ path: "/index" });
              })
              .catch(error => {
                this.$Notice.error({
                  title: "登录失败",
                  desc: error
                });
              });
          }
          //手机验证码登录
          if (this.activeName === "second") {
            this.$store
              .dispatch("LoginByVerificationCode", this.formLoginValidate)
              .then(response => {
                this.$router.push({ path: "/index" });
              })
              .catch(error => {
                this.$Notice.error({
                  title: "登录失败",
                  desc: error
                });
              });
          }
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #f4f4f4;
$dark_gray: #889aa4;
$light_gray: rgb(0, 0, 0);
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  // background: url("../../assets/gplus/login/gplusback.svg") center no-repeat;
  background-size: cover;
  overflow-x: scroll;
  .login-form {
    background-color: rgb(255, 255, 255);
    border-radius: 10px; // 边框圆角
    box-shadow: 0 0 10px rgb(255, 255, 255); // 边框阴影
    // position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 3% auto;
  }
  .qqpng {
    width: 33px;
    height: 33px;
    background: url(../../assets/login/qq.png) center no-repeat;
    background-size: 100% 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .qqpng:hover {
    width: 33px;
    height: 33px;
    background: url(../../assets/login/qqclick.png) center no-repeat;
    background-size: 100% 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .blogpng {
    width: 33px;
    height: 33px;
    background: url(../../assets/login/blog.png) center no-repeat;
    background-size: 100% 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .blogpng:hover {
    width: 33px;
    height: 33px;
    background: url(../../assets/login/blogclick.png) center no-repeat;
    background-size: 100% 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .wechatpng {
    width: 33px;
    height: 33px;
    background: url(../../assets/login/wechat.png) center no-repeat;
    background-size: 100% 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .wechatpng:hover {
    width: 33px;
    height: 33px;
    background: url(../../assets/login/wechatclick.png) center no-repeat;
    background-size: 100% 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 28px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 15px auto;
      text-align: center;
      // 粗体
      //   font-weight: bold;
    }
    .line {
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 50px;
      width: 120px;
      height: 3px;
      border: 0px;
      background-color: rgb(82, 80, 80);
      color: rgb(82, 80, 80);
    }
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>

