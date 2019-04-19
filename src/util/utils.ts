function formatNumber(n: number | string): string {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}
function formatTime(date: any): string {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}
function formatDate(date: any, mark: string = '-'): string {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const t1 = [year, month, day].map(formatNumber).join(mark)

    return `${t1}`
}

function isTel(tel: string): boolean {
    var reg = /^1[2|3|4|5|6|7|8|9]\d{9}$/;
    if (reg.test(tel)) {
        return true;
    } else {
        return false;
    }
}
//深拷贝
function deepClone(obj: any) {
    let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
    return objClone
}
// dom相关
function hasClass(el: any, className: string): boolean {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

function addClass(el: any, className: string) {
    if (hasClass(el, className)) {
        return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}

function getData(el: any, name: string, val?: string) {
    const prefix = 'data-'
    if (val) {
        return el.setAttribute(prefix + name, val)
    }
    return el.getAttribute(prefix + name)
}

// let elementStyle = document.createElement('div').style

// let vendor = (() => {
//     let transformNames = {
//         webkit: 'webkitTransform',
//         Moz: 'MozTransform',
//         O: 'OTransform',
//         ms: 'msTransform',
//         standard: 'transform'
//     }

//     for (let key in transformNames) {
//         if (elementStyle[transformNames[key]] !== undefined) {
//             return key
//         }
//     }

//     return false
// })()

// function prefixStyle(style) {
//     if (vendor === false) {
//         return false
//     }

//     if (vendor === 'standard') {
//         return style
//     }

//     return vendor + style.charAt(0).toUpperCase() + style.substr(1)
// }

//状态提示相关方法
import Vue from 'vue'
function showLoad(self:	Vue){
    return self.$createToast({
        txt: '加载中...',
        time: 0,
        mask: true,
        type:'loading'
    })
}
function showToast(self:Vue,txt:string,type:string='txt'){
    return self.$createToast({
        txt: txt,
        time: 1500,
        type:type
    })
}
function findIndex(ary:any[], fn:any) {
    if (ary.findIndex) {
      return ary.findIndex(fn)
    }
    let index = -1
    ary.some(function (item, i, ary) {
      const ret = fn(item, i, ary)
      if (ret) {
        index = i
        return ret
      }
    })
    return index
}
export default {
    formatNumber,
    formatTime,
    formatDate,
    isTel,
    deepClone,
    hasClass,
    addClass,
    getData,
    showLoad,
    showToast,
    findIndex
}

