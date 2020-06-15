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
      phone: ''
    }
  },
  methods: {
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
  computed: {
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
    }
    .btn {
      margin-top 20px
    }
  }
}
</style>
