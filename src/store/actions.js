import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'
export default {
  // 判断再action，赋值再mutations
  addCart(context, payload) {
    // let oldProduct = null
    // for(let item of state.cartList) {
    //   if(item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    // if(oldProduct) {
    //   oldProduct.count += 1
    // } else {
    //   payload.count = 1
    //   state.cartList.push(payload)
    // }


    return new Promise((resolve, reject) => {
      // 1.判断是不是同一个商品，如果是就创建新的对象oldPrice, item就是原对象，把item赋给oldPrice
      let oldPrice = context.state.cartList.find(item => item.iid === payload.iid) 
      // console.log(oldPrice);

      // 2.判断oldProduct
      if(oldPrice) {
        // oldPrice.count += 1
        context.commit(ADD_COUNTER, oldPrice)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}