<template lang="pug">
  .navigation-wrap(:style="{height: statusBarHeight + 44 + 'px'}")
    .navigation(:style="{paddingTop: statusBarHeight + 'px', height: '44px', lineHeight: '44px'}")
      .left
        image(v-if="!hideLeft" mode="widthFix" src="/static/images/left.png" @click="checkLeft")
      .center
        span {{title}}
      .right
</template>

<script>

export default {
  name: 'navigation',
  components: {
  },
  props: {
    title: '',
    hideLeft: false,
    loading: {
      type: Boolean,
      default: false
    },
    back: {
      type: String,
      default: '#fff'
    },
    backPath: ''
  },
  methods: {
    checkLeft () {
      if (this.backPath) {
        let isTab = false
        if (this.backPath === '/pages/home/index' || this.backPath === '/pages/my/index') {
          isTab = true
        }
        this.go({ path: this.backPath, isTab: isTab })
      } else {
        this.goBack()
      }
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="stylus">

.navigation-wrap {
  .navigation {
    position fixed
    top 0
    left 0
    display flex
    align-items center
    justify-content space-between
    width 100%
    padding 0 10px
    z-index 98
    background #fff
    .left {
      display flex
      align-items center
      width 30px
    }
    .center {
      display flex
      align-items center
      justify-content center
      width 80px
      color #000
    }
    .right {
      width 30px
    }
  }
}
</style>
