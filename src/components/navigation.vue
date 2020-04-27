<template lang="pug">
  .navigation(:style="{paddingTop: statusBarHeight + 'px'}")
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
        this.go(this.backPath)
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
  height 45px
  padding 0 10px
  background theme
  z-index 98
  .left {
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
