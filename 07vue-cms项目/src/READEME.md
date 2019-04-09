# my first Vue project,for study

## 1.制作首页App组件
1. 完成Header区域，使用mint-ui组件
2. 制作底部Tabber区域，使用mui组件
    - 2.1修改Tabber图标
    + 2.2制作车购物车小图标，需要拷贝扩展图标的css样式和字体库文件到项目库中，尔后为购物车图标添加‘mui-icon-extra mui-icon-extra-cart’样式 
3. 设置App组件底部四个路由及其高亮
    - 通过linkActiveClass: mui-active设置高亮
4. 在home组件里面设置轮播图
    - 使用vue-resource 获取数据
    - 如果跨域了，那么要在webpack.config.js中，在devServer下设置proxy代理
5. 在home组件里面设置六宫格
    - 使用mui组件中的gird-defauil代码段
    - 将图片和文字进行替换
    - nihao12345678
6. 给组件间切换设置动画
    - 把router-view用transition包裹起来,此时存在四个问题：
        - ①横向有滚动条的问题，用overflow-x:hidden解决
        - ②顶部和底部往外跑的问题，上面的命令即可同时解决
        - ③右进右出的问题，将.v-enter与.v-leave-to分开写
        - ④切换时从下往上飘的问题，设置position:absolute 
