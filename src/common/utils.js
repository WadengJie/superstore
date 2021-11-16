export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
      // console.log(this);
    }, delay)
  }
}

// export function formatDate(date, fmt) {
//   // 1.获取年份
//   // y
//   // 2019
//   // yyyy - 2019
//   // y - 9
//   // yyy - 019
//   if (/(y+)/.test(fmt)) {
//     fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
//   }

//   // 2.获取
//   let o = {
//     'M+': date.getMonth() + 1, // 月份
//     'd+': date.getDate(), // 日
//     'h+': date.getHours(), // 小时
//     'm+': date.getMinutes(), // 分
//     's+': date.getSeconds(), // 秒
//     'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
//     'S': date.getMilliseconds() // 毫秒
//   }
//   for (let k in o) {
//     if (new RegExp('(' + k + ')').test(fmt)) {
//       let str = o[k] + ''
//       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length ===1) ? str: padLeftZero(str))
//       // fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
//     }
//   }
//   return fmt
// }

// function padLeftZero(str) {
//   return ('00' + str.substr(str.length))
// }

export function formatDate(date, fmt) {
  if (typeof date == 'string') {
    return date;
  }

  if (!fmt) fmt = "yyyy-MM-dd hh:mm:ss";

  if (!date || date == null) return null;
  // 将传入的date准换为时间对象，*1000是为了将秒转成毫秒；
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      let str = o[k]
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt;
}

function padLeftZero(str) {
  // return ('00' + str.substr(str.length))
  return (('00' + str).substr(('' + str).length))
}
