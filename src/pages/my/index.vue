<template lang="pug">
  .my
    navigation(title="我的" :hideLeft="true")
    .input-wrap
      .label 姓名
      input(
        v-model="name"
        placeholder="请输入姓名"
      )
    .input-wrap
      .label 手机号
      input(
        v-model="phone"
        placeholder="请输入手机号"
      )
    .input-wrap
      .label 验证码
      input(
        v-model="code"
        placeholder="请输入验证码"
      )
      .get.theme(:class="{'gray': timer !== 0}" @click="getCode") {{timer !== 0 ? timer : '获取验证码'}}
    button.btn(@click="submit") 提交
</template>

<script>
import navigation from '@/components/navigation'

export default {
  components: {
    navigation
  },
  data () {
    return {
      data: '',
      name: '',
      phone: '',
      code: '',
      timer: 0
    }
  },
  computed: {
  },
  methods: {
    async getCode () {
      if (this.timer > 0) return
      let err = this.validate([
        {
          key: this.phone,
          type: 'phone',
          name: '手机号'
        }
      ])
      if (err) {
        return this.toast(err)
      }
      const res = await this.$http.post('/code/send', {
        phone: this.phone
      })
      if (res) {
        this.timer = 60
        let setTimer = setInterval(() => {
          if (this.timer === 0) {
            clearInterval(setTimer)
          } else {
            this.timer -= 1
          }
        }, 1000)
      } else {
        this.toast(res.msg)
      }
    },
    async submit () {
      let err = this.validate([
        {
          key: this.name,
          type: 'name',
          name: '姓名'
        },
        {
          key: this.phone,
          type: 'phone',
          name: '手机号'
        },
        {
          key: this.code,
          name: '验证码'
        }
      ])
      if (err) {
        return this.toast(err)
      }
      this.loading = true
      const res = await this.http.post('/xxx', {
        name: this.name,
        phone: this.phone
      })
      this.loading = false
      if (res) {
        this.toast('提交成功')
      }
    }
  },
  onShow () {
  }
}
</script>

<style scoped lang="stylus">

.my {
  .main-wrap {
    .input-wrap {
      display flex
      padding 20px 20px 0
      .label {
        display flex
        align-items center
        width 70px
      }
      input {
        padding 10px
      }
      .get {
        display flex
        align-items center
        justify-content center
        width 86px
        height 25px
        border 1px solid theme
        border-radius 3px
        z-index 99
        font-size 13px
        text-align center
        color theme
      }
      .gray {
        color fontGray
      }
    }
    .btn {
      margin-top 20px
    }
  }
}
</style>
