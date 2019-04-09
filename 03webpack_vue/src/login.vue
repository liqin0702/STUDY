<template>
  <div>
    <h1>这是.vue文件中的组件</h1>
    <h2>{{msg}}</h2>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 456
      }
    },
    methods: {
      show() {
        console.log('调用了login.vue中的show方法')
      }
    }
  };
</script>

<style>

</style>
