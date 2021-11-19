<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control" 
      :titles="['流行', '新款', '精选']" 
      @tabClick="tabClick" 
      ref="tabControl1"
      v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" 
      :probe-type="3" 
      @scroll="contentScroll"     
      :pull-up-load="true"
      @pullingUp="loadMore"
      >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view></feature-view>
      <tab-control class="tab-control" 
      :titles="['流行', '新款', '精选']" 
      @tabClick="tabClick" 
      ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="showback"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { itemListenerMixin, backTopMixin } from 'common/mixin'

export default {
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY : 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  destroyed() {
    console.log('home destroy');
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 1.保存y值
    this.saveY = this.$refs.scroll.scroll.y

    // 2.取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    // console.log('home created');
  },
 mixins: [itemListenerMixin, backTopMixin],
  methods: {
    /*
    事件监听相关的方法 
     */
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    tabClick(index) {
      switch (index) {
        case 0: 
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll(pos) {
      // 1.判断返回顶部是否显示
      // if(pos < -2000) {
      //   this.showback = true
      // } else {
      //   this.showback = false
      // }
      // this.showback = Math.abs(pos.y) > 2000
      this.listenShowBackTop(pos)

      // 2.决定tabControl是否吸顶(posiiton: fixed)
      this.isTabFixed = (-pos.y) > this.tabOffsetTop

    },
    swiperImageLoad() {
      // 2.获取tabControl的offsetTop
      // 所有的组件都有一个属性$el: 用于获取组件中的元素
       this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /*
    网络请求相关的方法 
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      // console.log(res);
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1    // page = 1; this.goods[type].page = 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #home {
    position: relative;
    /* padding-top: 44px; */
    height: 100vh;
  }
  .home-nav {
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */
    background-color: var(--color-tint);
    color: #fff;
  }
  
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
  
  .tab-control {
    position: relative;
    z-index: 9;
  }

</style>
