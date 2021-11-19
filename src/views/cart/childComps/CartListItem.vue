<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button @click.native="checkClick" :isChecked="itemInfo.checked"/>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price">￥{{itemInfo.price}}</div>
        <div class="item-count">×{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  data() {
    return {
      // isChecked: false
    }
  },
  components: {
    CheckButton
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked
    }
  }
}
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    padding: 5px;
    font-size: 0;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    display: flex;
    width: 20px;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    /* display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden; */
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    display: block;
    width: 80px;
    height: 100px;
    border-radius: 5px;
  }

  .item-info {
    flex: 1;
    font-size: 16px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 10px;
  }

  .info-bottom {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    margin-top: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>