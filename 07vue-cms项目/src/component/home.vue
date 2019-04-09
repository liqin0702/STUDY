<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.imgUrl">
      </mt-swipe-item>
    </mt-swipe>

    <!-- 六宫格 -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../src/images/menu1.png">
          <div class="mui-media-body">新闻资讯</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../src/images/menu2.png">
          <div class="mui-media-body">图片分享</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../src/images/menu3.png">
          <div class="mui-media-body">商品购买</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../src/images/menu4.png">
          <div class="mui-media-body">留言反馈</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../src/images/menu5.png">
          <div class="mui-media-body">视频专区</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../src/images/menu6.png">
          <div class="mui-media-body">联系我们</div></a></li>
      </ul>
    </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        lunbotuList: [] //保存轮播图的数组
      }
    },
    created() { //一进入首页就加载
      this.getLunbotu()
    },
    methods: {
      getLunbotu() {
        this.$http.get("/home/banners?key=8eebf6c20a49415b83f63c2473042646").then(result =>{
          if(result.status === 200 ) {
            this.lunbotuList = result.body.result
          } else {
            Toast('获取加载轮播图失败')
          }
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .mint-swipe {
    height: 200px;
      .mint-swipe-item {
        &:nth-child(1){
          background-color: red;
        }
        &:nth-child(2){
          background-color: blue;
        }
        &:nth-child(3){
          background-color: cyan;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
  }

  .mui-content>.mui-table-view:first-child {
    margin-top: 0px;
  }

  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
      .mui-table-view-cell {
        border: none;
      }
      img {
        height: 60px;
        width: 60px
      }
      .mui-media-body {
        font-size: 13px;
      }

  }

</style>
