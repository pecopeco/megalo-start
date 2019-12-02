import App from './App'
import Vue from 'vue'
import VHtmlPlugin from '@megalo/vhtml-plugin'
import Vuex from 'vuex'
import mixin from './mixin'
import Fly from 'flyio/dist/npm/wx'
import MegaloRouterPatch from 'megalo-router-patch'

Vue.use(MegaloRouterPatch)
Vue.use(VHtmlPlugin)
Vue.use(Vuex)
Vue.mixin(mixin)

const store = require('./store.js').default
Vue.prototype.$store = store

let config = {
  api_url: 'https://mp.weixin.qq.com'
}

let requestUrl

// 重复请求延迟
function delayRequest () {
  setTimeout(() => {
    requestUrl = ''
  }, 300)
}

function request (url, form = {}, type) {
  // 拦截重复请求
  if (requestUrl === url) {
    return
  }
  requestUrl = url
  
  let compleForm = form
  // let presetForm = {
  //   orgName: 123456
  // }
  // Object.assign(compleForm, presetForm)
  let fly = new Fly()
  return fly.request(config.api_url + url, compleForm, {
    method: type,
    timeout: 5000
  }).then((res) => {
    delayRequest()
    if (type === 'delete' || res.status === 204) {
      return res.text()
    } else if (res.status === 200) {
      return res.data
    } else {
      wx.showToast({ title: JSON.parse(res.data).error.msg, icon: 'none', duration: 2000 })
    }
  }).catch((err) => {
    delayRequest()
    const codeMessage = {
      200: '服务器成功返回请求的数据.',
      201: '新建或修改数据成功.',
      202: '一个请求已经进入后台排队（异步任务）.',
      204: '删除数据成功.',
      400: '发出的请求有错误，服务器没有进行新建或修改数据的操作.',
      401: '用户没有权限（令牌、用户名、密码错误）.',
      403: '用户得到授权，但是访问是被禁止的.',
      404: '发出的请求针对的是不存在的记录，服务器没有进行操作.',
      406: '请求的格式不可得',
      410: '请求的资源被永久删除，且不会再得到的.',
      422: '当创建一个对象时，发生一个验证错误.',
      500: '服务器发生错误，请检查服务器.',
      502: '网关错误',
      503: '服务不可用，服务器暂时过载或维护.',
      504: '网关超时'
    }
    if (err.status === 401) {
      // 意外丢失skey
      store.dispatch('setSkeyStatus')
    }
    if (err.status >= 300) {
      const errortext = codeMessage[err.status] || err.response.statusText
      wx.showToast({ title: errortext, icon: 'none', duration: 2000 })
    }
  })
}

request.get = (url, form) => request(url, form, 'get')
request.post = (url, form) => request(url, form, 'post')
request.delete = (url, form) => request(url, form, 'delete')
request.put = (url, form) => request(url, form, 'put')

Vue.prototype.$http = request

const app = new Vue(App)

app.$mount()

export default {
  config: {
    pages: [
      'pages/home/index',
      'pages/my/index'
    ],
    tabBar: {
      color: '#333',
      selectedColor: '#007d37',
      list: [
        {
          pagePath: 'pages/home/index',
          text: 'home',
          iconPath: 'native/tabbar/home.png',
          selectedIconPath: 'native/tabbar/home_on.png'
        },
        {
          pagePath: 'pages/my/index',
          text: 'my',
          iconPath: 'native/tabbar/mine.png',
          selectedIconPath: 'native/tabbar/mine_on.png'
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'megalo project',
      navigationBarTextStyle: 'black'
    }
  }
}
