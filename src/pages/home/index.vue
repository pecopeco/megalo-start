<template lang="pug">
  .home
    .card-wrap(@click="getData")
      card(:text="text")
    .time.theme {{time | formatTime('/', '/', '', true, true)}}
    van-loading.loading(type="circular" color="#1989fa")
    button(@getuserinfo="getUserInfo" open-type="getUserInfo") 登录
</template>

<script>
import card from '@/components/card'

export default {
  components: {
    card
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
      let data = await this.$http.get('/search', { id: 1 })
      this.$store.dispatch('setUser', data || '')
    },
    getUserInfo () {
      // 授权检测
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
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
    this.getData()
  }
}
</script>

<style scoped lang="stylus">

.home {
}
</style>

<config>
  {
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "title",
    "backgroundColor": "#eeeeee",
    "backgroundTextStyle": "light"
  }
</config>
