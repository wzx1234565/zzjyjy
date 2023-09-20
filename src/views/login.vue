<template>
    <div class="login">
        <img src="../../public/1.png" alt="">
        <div class="box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item prop="username">
    <el-input v-model="ruleForm.username"></el-input>
  </el-form-item>
  <el-form-item prop="password">
    <el-input type="password" v-model="ruleForm.password"></el-input>
  </el-form-item>
  <el-form-item class="right">
    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
  </el-form>
        </div>
    </div>
</template>

<script>
import {logins} from '@/api/index'
export default {
 data() {
     return {
        ruleForm:{
            username:'',
            password:''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }
     };
},
 methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
           logins(this.ruleForm).then((res)=>{
            console.log(res);
            localStorage.setItem('token',res.data.data.token);
             this.$router.push('/about');
           })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.ruleForm={};
      }
 },
 computed: {},
filters: {},
watch: {}
};
</script>

<style lang="scss" scoped>
.login{
    width: 100vw;
    height: 100vh;
    background-color:#244251;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
img{
  width: 100px;
  height: 100px;
  border-radius: 50%;  
}
.box{
    width:350px;
    height: 300px;
    background-color: #fff;
    border-radius: 12px;
     display: flex;
     justify-content:flex-start;
     align-items: center;
    
}
.right{
        float: right !important;
        margin-right: 20px;
    }
</style>