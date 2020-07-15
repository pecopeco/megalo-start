<template lang="pug">
  .home
    navigation(title="首页" :hideLeft="true")
    .card-wrap(@click="getData")
      card(:text="text")
    .time.theme {{time | formatTime('/', '/', '', true, true)}}
    button(@getuserinfo="getUserInfo" open-type="getUserInfo") 登录
    loading(v-if="loading")
</template>

<script>
import loading from '@/components/loading'
import navigation from '@/components/navigation'

export default {
  name: 'home',
  components: {
    loading,
    navigation
  },
  data () {
    return {
      text: '123',
      time: 1566274478,
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
  .main-wrap {
    .time {
      text-align center
    }
  }
}
</style>
