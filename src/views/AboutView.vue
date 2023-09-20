<template>
  <div>
    <el-container>
  <el-header>
    <h1>电商后台管理系统</h1>
    <el-button type="primary" @click="tc">退出</el-button>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu
      router
      default-active="/about/list"
      class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
      <el-menu-item index="/about/list">
        <i class="el-icon-menu"></i>
        <span slot="title">用户列表</span>
      </el-menu-item>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">权限管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-menu"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-menu"></i>
        <span slot="title">数据统计</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <el-main> <router-view/></el-main>
  </el-container>
</el-container>

  </div>
</template>

<script>
export default {
 data() {
   return {};
},
 methods: {
  tc(){
     localStorage.removeItem('token');
     this.$router.go(-1);
  }
 },
 computed: {},
filters: {},
watch: {}
};
</script>

<style lang="scss" scoped>
.el-header{
    background-color:#2c3532;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
}
.el-aside{
  height: 100vh;
  background-color:#2c3532;
}
.el-menu{
   background-color:#2c3532;
}
span{
  color: white;
}
.el-menu-item{
  background-color:#2c3532;
}
h1{
  color: white;
}
</style>
