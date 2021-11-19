<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navbar"/>
    <!-- <div>{{$store.state.cartList.length}}</div> -->
    <scroll class="content" ref="scroll" @scroll="scrollPos" :probe-type="3">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo" ref="param"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="showback"/>
    <!-- <toast :message="message" :isShow="isShow"/> -->
  </div>
</template>

<script>
import DetailNavBar from 'views/detail/childComps/DetailNavBar'
import DetailSwiper from 'views/detail/childComps/DetailSwiper'
import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo'
import DetailShopInfo from 'views/detail/childComps/DetailShopInfo'
import DetailGoodsInfo from 'views/detail/childComps/DetailGoodsInfo'
import DetailParamInfo from 'views/detail/childComps/DetailParamInfo'
import DetailCommentInfo from 'views/detail/childComps/DetailCommentInfo'
import DetailBottomBar from 'views/detail/childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
// import Toast from 'components/common/toast/Toast'


import { getDetail, getRecommend, Goods, Shop, GoodsParam } from 'network/detail'

import { itemListenerMixin, backTopMixin } from 'common/mixin'
import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      // message: '' ,
      // isShow: false
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then( res => {
      // console.log(res);
      const data = res.result
      // 1.获取顶部的图片轮播数据
      this.topImages = res.result.itemInfo.topImages

      // 2.获取商品信息 
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // console.log(this.goods);

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      // console.log(this.shop);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6.取出评论信息
      if(data.rate.cRate !== 0 ) {
        this.commentInfo = data.rate.list[0]
      }

      this.$nextTick(() => {
        
      }) 
    })

    // 3.请求推荐数据
    getRecommend().then( res => {
      this.recommends = res.data.list
    })
  },
  mounted() {
    
  },
  updated() {
    
  },
  mixins: [itemListenerMixin, backTopMixin],
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop || this.$refs.recommends.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs);
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
    },
    scrollPos(pos) {
      const posY = -pos.y
      let length = this.themeTopYs.length
      for(let i = 0;i < length - 1;i++) {
        // i 是个字符串
        // i = i * 1
        if(this.currentIndex !== i && (posY >= this.themeTopYs[i] && posY < this.themeTopYs[i+1])) {
          this.currentIndex = i
          console.log(this.currentIndex);
          this.$refs.navbar.currentIndex = this.currentIndex
        }
      }

      // 是否返回顶部
      this.listenShowBackTop(pos)
    },
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.detailInfo.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 将商品数据添加到购物车里
      // this.$store.cartList.push(product)
      // this.$store.commit('addCart', product)

      this.addCart(product).then(res => {
        // this.isShow = true
        // this.message = res

        // setTimeout(() => {
        //   this.isShow = false
        //   this.message = ''
        // }, 1500)
        this.$toast.show(res, 1500)
        console.log(this.$toast);
      })

      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    /* position: absolute;
    top: 44px;
    bottom: 49px; */
    height: calc(100% - 44px - 54px);
    overflow: hidden;
  }
</style>