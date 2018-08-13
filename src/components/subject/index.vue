<template>
  <div class="subject" :style="{ width: width+'px'}">
    <h1 v-html="title"></h1>
    <slot name="main"></slot>
  </div>
</template>
<script>
  export default {
    name: 'Subject',
    props: ['title','width'],
    data () {
      return {

      }
    },
    created: function () {

    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/Subject.scss";
</style>