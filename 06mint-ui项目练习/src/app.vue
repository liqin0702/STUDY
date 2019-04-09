<template>
  <div>
    <h1>这是app组件</h1>
    <!-- 直接引用mint-ui组件标签 -->
    <mt-button type="primary" size="small" @click="show" slot='icon'>default</mt-button>
    <mt-button type="primary" size="large">default</mt-button>


    <router-link to="/account">account</router-link>
    <router-link to="/goodslist">GoodsList</router-link>
    <router-view></router-view>

  </div>
</template>

<script>
import {Toast} from 'mint-ui'
  export default {
    data() {
      return {

      }
    },
    methods: {
      show() {
        Toast({
          message: '这是消息',
          duration: -1,
          position: 'top',
          iconClass: 'glyphicon glyphicon-heart',
          className: 'mytoast'

        })
      }
    }
  };
</script>

<style>

</style>
