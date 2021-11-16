import { debounce } from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'
import { BACK_POSITION } from 'common/const'
export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null
    }
  },
  mounted() {
    // 1.图片加载完成的事件监听
    const refresh =  debounce(this.$refs.scroll.refresh, 50)

    // 对监听的事件进行保存
    this.itemImageListener = () => {
      refresh()
    }
    
    this.$bus.$on('itemImageLoad', this.itemImageListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      showback: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenShowBackTop(pos) {
      this.showback = (-pos.y) > BACK_POSITION
    }
  }
}