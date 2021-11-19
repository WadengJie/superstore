<template>
  <div class="bottom-bar">
    <div class="bottom-bar-item">
      <check-button class="check-button"
      :is-checked="isSelectAll" 
      @click.native="checkClick" />
      <span class="check-all">全选</span>
      <span class="total-price">合计:￥{{totalPrice}}</span>
    </div>
    <div class="calculate" @click="calcClick"> 
      <span>去计算({{checkLength}})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isChecked: false
    }
  },
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      // console.log(this.$store.getters.cartList.find(item => item.checked));
      if(!this.$store.getters.cartList.find(item => item.checked)) {
        this.$toast.show('请选择购买的商品', 1000)
      } else {
        this.$toast.show('前往结算中·····', 1000)
        setTimeout(() => {
          this.$toast.show('还没做呢，老铁', 1000)
        }, 2000)
      }
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => {
        return item.checked
      }).length
    },
    isSelectAll() {  // 没有全选length不为0 不为0的取反为false
      // return !(this.cartList.filter(item => !item.checked).length)
      if(this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked)
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    justify-content: space-between;
    height: 40px;
    background-color: #efefef;
  }

  .bottom-bar-item {
    display: flex;
    height: 100%  ;
    align-items: center;
  }

  .check-button {
    display: block;
    width: 20px;
    height: 20px;
    margin: 0 5px 0 15px;
  }
  
  .check-all {
    color: #979797;
    font-size: 13px;
  }

  .total-price {
    margin-left: 10px;
    font-size: 14px;
  }

  .calculate {
    width: 100px;
    line-height: 40px;
    text-align: center;
    background-color: #ff4400;
    color: #fff;
    font-size: 13px;
  }
</style>