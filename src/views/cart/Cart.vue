<template>
  <div class="cart">
    <nav-bar class="cart-bar">
     <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <scroll class="content">
      <cart-list/>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import CartList from './childComps/CartList'

export default {
  components: {
    NavBar,
    Scroll,
    CartList
  },
  computed: {
    // ...mapGetters(['cartLength'])
    ...mapGetters({
      length: 'cartLength'
    })
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .cart-bar {
    position: relative;
    z-index: 9;
    background-color: var(--color-tint);
    color: #fff;
    /* font-weight: 700; */
  }
  .content {
    width: 100%;
    height: calc(100vh - 44px - 49px);
  }
</style>
