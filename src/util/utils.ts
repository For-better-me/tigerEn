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
import Vue from 'vue'
// import {createAPI} from 'cube-ui'
// import Home from '../views/Home.vue'

// // 创建 this.$createHello and $Hello.create API
// createAPI(Vue,Home, ['click'], true)
//状态提示相关方法
function showLoad(self:	Vue){
    console.log('self',self)
    return self.$createToast({
        txt: 'Timeout',
        time: 1000,
        $events: {
            timeout: () => {
                console.log('Timeout')
            }
        }
    })
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
    showLoad
}

