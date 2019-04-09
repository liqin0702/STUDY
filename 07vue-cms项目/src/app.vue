<template>
  <div class="app-container">
    <!-- 头部固定区域 -->
    <mt-header fixed title="黑马程序员"></mt-header>

    <!-- 组件渲染 -->
    <transition>
      <router-view></router-view>
    </transition>
    <!-- 底部Tabbar区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/customer">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="shoppingcart">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">9</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>



  </div>
</template>

<script>

  export default {
    data() {
      return {

      }
    },
    methods: {

    }
  };
</script>

<style lang="scss" scoped>
  .app-container {
    padding-top: 40px;
    overflow-x: hidden;
  }

  .v-enter {
    opacity: 0;
    transform: translateX(100%);  //从右边进来
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);  // 从左边出去
    position: absolute;  //解决动画时从下往上飘的问题
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }

</style>
