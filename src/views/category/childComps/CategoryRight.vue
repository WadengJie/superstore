<template>  
  <div class="top-content">
    <div v-for="item in rightList" class="img-list">
      <img :src="item.image" alt="">
      <div class="item-title">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rightList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
  }
}
</script>

<style scoped>
  .top-content {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    padding: 0 8px;
  }
  .img-list {
    width: 33.3%;
    margin-top: 15px;
  }

  .img-list img {
    width: 50px;
    height: 50px;
  }

  .item-title {
    margin-top: 10px;
    font-size: 12px;
  }
</style>