<template lang="pug">
  .home
    navigation(title="首页" :hideLeft="true")
    .time.theme {{time | formatTime('/', '/')}}
    button(@getuserinfo="getUserInfo" open-type="getUserInfo") 登录
    button.btn(@click="toast('发出的请求有错误发出的请求有错误，服务器没有进行新建或修改数据的操作，服务器没有进行新建或修改数据的操作')") toast
    loading(v-if="loading")
    toast(ref="toast")
</template>

<script>
import loading from '@/components/loading'
import navigation from '@/components/navigation'
import toast from '@/components/toast'

export default {
  name: 'home',
  components: {
    loading,
    navigation,
    toast
  },
  data () {
    return {
      text: '123',
      time: 1566274478000,
      loading: false
    }
  },
  computed: {
  },
  methods: {
    async getData () {
      console.log('start get')
      let data = await this.http.get('/search', { id: 1 })
      this.store.dispatch('setUser', data || '')
    },
    getUserInfo () {
      // 授权检测
      Megalo.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            Megalo.getUserInfo({
              success: (res) => {
                this.postUserInfo(res.userInfo)
              }
            })
          }
        }
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped lang="stylus">

.home {
  .time {
    text-align center
  }
  .btn {
    margin-top 30px
  }
}
</style>

<config>
{
  "navigationBarTitleText": "首页"
}
</config>
