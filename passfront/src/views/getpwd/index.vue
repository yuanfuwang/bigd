<template>
    <div class="register-container">
        <div class="register-steps">
            <!-- header -->
            <el-row type='flex' align="middle">
                <el-col :span='12'>
                    <h1>
                        BigD通行证
                    </h1>
                </el-col>
                <el-col :span='8' style="text-align:right">
                    <span>
                        已有帐号，
                        <a @click="returnLogin">马上登录</a>
                    </span>

                </el-col>
                <el-col :span='4' style="text-align:right">
                    <a @click="returnIndex">
                        返回站酷网
                    </a>
                </el-col>
            </el-row>
            <!-- title -->
            <el-row type='flex' align='middle' style="margin-top:24px">
                <el-col :span='24' style="text-align:center">
                    <div style="background:#ffd100;padding:24px 0px">
                        <h1>找回密码</h1>
                    </div>
                </el-col>
            </el-row>
            <!-- body -->
            <div style="background:#fff;padding:48px 0px">
                <el-steps :space="600" :active="active" finish-status="success" align-center>
                    <el-step title="手机验证">
                    </el-step>
                    <el-step title="重置密码">
                    </el-step>
                </el-steps>
                <div v-if="active===0" style="margin-top:24px">
                    <el-form class="getPwd-form" ref="formGetPwd" :model="formGetPwdValidate" :rules="ruleGetPwd">
                        <el-row type='flex' justify="center">
                            <el-col :span='12'>
                                <el-form-item prop='mobile'>
                                    <el-input v-model="formGetPwdValidate.mobile" size="large" type="text" placeholder="请输入您的手机号" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type='flex' justify="center">
                            <el-col :span='8'>
                                <el-form-item prop='verificationCode' style="margin:auto 0px">
                                    <el-input v-model="formGetPwdValidate.verificationCode" size="large" type="text" placeholder="请输入您的验证码" />
                                </el-form-item>
                            </el-col>
                            <el-col :span='4' style="text-align:right">
                                <el-button style="width:90%" size="large" type="primary" plain @click="getMa">获取验证码</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-row type='flex' justify="center" style="margin-top:24px">
                        <el-col :span='12'>
                            <el-button style="width:100%" size="large" type="primary" @click="clickGetPwd">找回密码</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="active===1" style="margin-top:24px">
                    <el-form class="getPwd-form" ref="formGetPwd" :model="formGetPwdValidate" :rules="ruleGetPwd">
                        <el-row type='flex' justify="center">
                            <el-col :span='12'>
                                <el-form-item prop='password'>
                                    <el-input v-model="formGetPwdValidate.password" size="large" type="text" placeholder="请输入您的新密码" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type='flex' justify="center">
                            <el-col :span='12'>
                                <el-form-item prop='checkPassword' style="margin:auto 0px">
                                    <el-input v-model="formGetPwdValidate.checkPassword" size="large" type="text" placeholder="请确认您的密码" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-row type='flex' justify="center" style="margin-top:24px">
                        <el-col :span='12'>
                            <el-button style="width:100%" size="large" type="primary" @click="submitGetPwd">重置密码</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <!-- Copyright -->
            <el-row>
                <el-col :span="24" style="text-align:center;margin-top:3%">
                    <p style="cursor:default">京ICP备11017824号-4 / 京ICP证130164号 北京市公安局朝阳分局备案编号:110105000501</p>
                    <p style="cursor:default">Copyright © 2016-2017 BigD 中文 English</p>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "register",
  data() {
    //用户名自定义验证
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
    //确认密码自定义验证
    var checkPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formGetPwdValidate.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      active: 0, //步骤条
      // 找回密码表单
      formGetPwdValidate: {
        mobile: "",
        password: "",
        checkPassword: "",
        verificationCode: ""
      },
      // 找回密码表单验证
      ruleGetPwd: {
        mobile: [{ validator: user, trigger: "blur" }],
        verificationCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ],
        password: [{ validator: pwd, trigger: "blur" }],
        checkPassword: [{ validator: checkPwd, trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    // 跳转主页
    returnIndex() {
      this.$router.push({ path: "/index" });
    },
    // 跳转登录
    returnLogin() {
      this.$router.push({ path: "/login" });
    },
    // 获取验证码
    getMa() {
      this.$refs["formGetPwd"].validateField("mobile", valid => {
        if (valid.length === 0) {
          this.$store
            .dispatch("GetMa", this.formGetPwdValidate.mobile)
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
    // 点击找回密码
    clickGetPwd() {
      this.$refs["formGetPwd"].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("CheckVerificationCode", this.formGetPwdValidate)
            .then(response => {
              this.active++;
            })
            .catch(error => {
              this.$Notice.error({
                title: "重置密码失败",
                desc: error
              });
            });
        }
      });
    },
    // 点击重置密码
    submitGetPwd() {
      this.$refs["formGetPwd"].validate(valid => {
        if (valid) {
          this.formGetPwdValidate.loginIp = returnCitySN["cip"];
          this.$store
            .dispatch("ChangePassword", this.formGetPwdValidate)
            .then(response => {
              //提示重置密码成功
              //5秒后跳回登录页面
            })
            .catch(error => {
              this.$Notice.error({
                title: "重置密码失败",
                desc: error
              });
            });
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
.register-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: $bg;
  background-size: cover;
  overflow-x: scroll;

  .register-steps {
    background-color: $bg;
    position: absolute;
    left: 0;
    right: 0;
    width: 60%;
    padding: 25px 15px 25px 15px;
    margin: 5% auto;
  }
}
</style>


