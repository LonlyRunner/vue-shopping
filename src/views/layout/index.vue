<template>
  <div>
    <router-view></router-view>
    <!-- 二级路由出口，二级组件展示区 -->

    <van-tabbar router  v-model="active"  active-color="#007AFF" inactive-color="#999">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: '/home'
    }
  }
}
</script>

<style>

</style>
