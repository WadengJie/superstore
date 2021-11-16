<template>
  <div class="cart-list">
    <h2><div v-for="item in cartList" :key="item.id">{{item}}</div></h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['cartList'])
  }
}
</script>

<style scoped>

</style>