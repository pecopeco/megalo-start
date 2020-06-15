<template lang="pug">
  .navigation-wrap(:style="{height: statusBarHeight + 44 + 'px'}")
    .navigation(:style="{paddingTop: statusBarHeight + 'px', height: '44px', lineHeight: '44px'}")
      .left
        image(v-if="!hideLeft" mode="widthFix" src="/static/images/left.png" @click="checkLeft")
      .center {{title}}
      .right
</template>

<script>
export default {
  props: {
    title: '',
    hideLeft: false,
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

.navigation {
  position fixed
  top 0
  left 0
  display flex
  align-items center
  justify-content space-between
  width 100%
  padding 0 10px
  background theme
  z-index 98
  .left {
    display flex
    align-items center
    width 30px
  }
  .center {
    color #fff
  }
  .right {
    width 30px
  }
}
</style>
