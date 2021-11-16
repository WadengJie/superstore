<template>
  <tar-bar>
    <tar-bar-item path="/home">
      <img src="~assets/img/tabbar/home.svg" alt="" slot="item-icon" />
      <img src="~assets/img/tabbar/home_active.svg" alt="" slot="item-icon-active" />
      <div slot="item-text">首页</div>
    </tar-bar-item>
    <tar-bar-item path="/category">
      <img src="~assets/img/tabbar/category.svg" alt="" slot="item-icon" />
      <img src="~assets/img/tabbar/category_active.svg" alt="" slot="item-icon-active" />
      <div slot="item-text">分类</div>
    </tar-bar-item>
    <tar-bar-item path="/cart">
      <img src="~assets/img/tabbar/shopcart.svg" alt="" slot="item-icon" />
      <img src="~assets/img/tabbar/shopcart_active.svg" alt="" slot="item-icon-active" />
      <div slot="item-text">购物车</div>
    </tar-bar-item>
    <tar-bar-item path="/profile">
      <img src="~assets/img/tabbar/profile.svg" alt="" slot="item-icon" />
      <img src="~assets/img/tabbar/profile_active.svg" alt="" slot="item-icon-active" />
      <div slot="item-text">我的</div>
    </tar-bar-item>
  </tar-bar>
</template>

<script>
import TarBar from "components/common/tarbar/TarBar";
import TarBarItem from "components/common/tarbar/TarBarItem";
export default {
  components: {
    TarBar,
    TarBarItem
  }
};
</script>

<style>
</style>
