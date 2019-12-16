<template lang="pug">
  .my
    span my
    .content(v-if="data")
    .empty-tips(v-else-if="!loading") 暂无信息
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      data: ''
    }
  },
  methods: {
  },
  computed: {
  },
  mounted () {
  }
}
</script>

<style scoped lang="stylus">

.my {
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
