<template>
  <ul>
    <li 
    v-for="(item, index) in leftList" 
    :class="{active: currentIndex === index}"
    @click="itemClick(index)">{{item.title}}</li>
  </ul>
</template>

<script>
export default {
  props: {
    leftList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  components: {
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('leftClick', index)
    }
  }
}
</script>

<style scoped>
  ul {
    height: 100%;
  }

  .content ul li {
    line-height: 40px;
  }

  .active {
    position: relative;
    color: var(--color-tint);
    background-color: #fff;
    font-weight: 700;
  }

  .active::before {
    content: '';
    position: absolute;
    left: 0;
    width: 3px;
    height: 40px;
    background-color: var(--color-tint);
  }
</style>