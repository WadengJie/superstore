<template>
  <div id="category">
    <nav-bar class="navbar">
      <div slot="center">分类</div>
    </nav-bar>

    <div class="category-content">
      <scroll class="scroll-left">
        <category-left :left-list="leftList" @leftClick="leftClick"/>
      </scroll>
      <tab-control 
              :titles="['综合', '新品', '销量']" 
              @tabClick="tabClick" 
              class="tabControl"
              v-show="isTabFixed"
              ref="tabControl1"/>
      <scroll class="scroll-right"
              ref="scroll" 
              @scroll="contentScroll"
              :pull-up-load="true" 
              :probe-type="3">
        <category-right :right-list="rightList"/>
        <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick" ref="tabControl2"/>
        <good-list :goods="showGoods"/>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodsList'

import CategoryLeft from 'views/category/childComps/CategoryLeft'
import CategoryRight from 'views/category/childComps/CategoryRight'

import { itemListenerMixin } from 'common/mixin'

import { getCategory, getSubCategory, getCategoryDetail } from 'network/category'
export default {
  name: 'Category',
  data() {
    return {
      leftList: [],
      rightList: [],
      goods: {
        'new': [],
        'sell': [],
        'pop': []
      },
      currentType: 'pop',
      isTabFixed: false,
      tabOffsetTop: 0,
      saveY : 0
    }
  },
  components: {
    NavBar,
    Scroll,
    CategoryLeft,
    CategoryRight,
    TabControl,
    GoodList
  },
  mixins: [itemListenerMixin],
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType]
    }
  },
  activated() {
    console.log(111);
    this.$refs.scroll.refresh()
  },
  methods: {
    leftClick(index) {
      this.getSubCategory(index)
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
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
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      this.isTabFixed = (-pos.y) > this.tabOffsetTop
    },

    // 网络请求相关的
    getCategory() {
      getCategory().then(res => {
        this.leftList = res.data.category.list

      // 调用一次getSubCategory进入分类显示第一个数据
      this.getSubCategory(0)
      })
    },
    getSubCategory(index) {
      this.currentIndex = index
      const maitKey = this.leftList[index].maitKey;
      getSubCategory(maitKey).then(res => {
        this.rightList = res.data.list
      })

      // 一创建就调用三个数据
      this.getCategoryDetail('new')
      this.getCategoryDetail('sell')
      this.getCategoryDetail('pop')
    },
    getCategoryDetail(type) {
      const miniWallkey = this.leftList[this.currentIndex].miniWallkey
      getCategoryDetail(miniWallkey, type).then(res => {
        this.goods[type] = res
        // console.log(res);
      })
    }
  },
  created() {
    this.getCategory()
  }
}
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .navbar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .category-content {
    display: flex;
    height: calc(100% - 44px - 49px);
  }
  
  .scroll-left {
    width: 30%;
    height: 100%;
    /* background-color: pink; */
    background-color: #f6f6f4;
    overflow: hidden;
    font-size: 14px;
    text-align: center;
  }
  
  .scroll-right {
    width: 70%;
    height: 100%;
    /* background-color: pink; */
    overflow: hidden;
  }
  
  .tabControl{
    position: fixed;
    top: 44px;
    left: 30%;
    right: 0;
    z-index: 9;
  }
</style>
