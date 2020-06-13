<template lang="pug">
  .home
    navigation(title="首页" :hideLeft="true")
    .main-wrap(:style="{paddingTop: statusBarHeight + 45 + 'px'}")
      .card-wrap(@click="getData")
        card(:text="text")
      .time.theme {{time | formatTime('/', '/', '', true, true)}}
      button(@getuserinfo="getUserInfo" open-type="getUserInfo") 登录
</template>

<script>
import card from '@/components/card'
import navigation from '@/components/navigation'

export default {
  components: {
    card,
    navigation
  },
  data () {
    return {
      text: '123',
      time: 1566274478
    }
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
  computed: {
  },
  mounted () {
    // this.getData()
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
