<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages" :key="item.id">
      <img :src="item" alt="" class="swiper-item-img">
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}

.swiper-item-img {
  width: 100%;
  height: 100%;
}
</style>