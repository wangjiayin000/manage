<template>
  <!--
    	作者：luoyiming
    	时间：2020-06-20
    	描述：diy组件-模拟显示-顶部设置栏
    -->
  <div class="phone-top" v-if="diyData.page" @click.stop="$parent.onEditer(-1)"
    :style="'background:' + diyData.page.style.titleBackgroundColor">
    <div class="status-bar">
      <span class="icon iconfont icon-wifi" :style="'color:' + diyData.page.style.titleTextColor">
      </span>
      <span class="time" :style="'color:' + diyData.page.style.titleTextColor">19:00</span>
      <span class="icon iconfont icon-xinhao" :style="'color:' + diyData.page.style.titleTextColor">
      </span>
      <span class="ml4 icon iconfont icon-iconset0250" :style="'color:' + diyData.page.style.titleTextColor">
      </span>
    </div>
    <div class="navigation d-s-c" :style="'color:' + diyData.page.style.titleTextColor">
      <img style="width: 30px;height: 30px;" :src="diyData.page.style.toplogo" alt="">
      <div class="phone-top-search-box" :style="'color:' + diyData.page.style.titleBackgroundColor"><i
          class="el-icon-search"></i>搜索商品</div>
      <!-- <div style="width: 100px;" class=""></div> -->
    </div>
    <div  v-if="diyData.page.category.open" class="d-s-c" :style="'color:' +  diyData.page.category.color">
      <div class="f16 mr10">分类一</div>
      <div class="f16 mr10">分类二</div>
      <div class="f16 mr10">分类三</div>
      <div class="f16 mr10">分类四</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    props: {
      diyData: Object
    },
    methods: {
      getImg(src) {
        var img_url = src
        var img = new Image()
        img.src = img_url;
        return Math.ceil(img.width * 60 / img.height) + 'px'
      },
    }
  };
</script>

<style>
  .phone-top-search-box {
    flex: 1;
    height: 30px;
    line-height: 30px;
    background-color: #FFFFFF;
    border-radius: 3px;
    margin-left: 10px;
    color: #999999;
    font-size: 13px;
    text-align: left;
    padding-left: 10px;
    border-radius: 15px;
    font-weight: 800;
  }

  .phone-top-search-box .el-icon-search {
    font-weight: 800;
    margin-right: 4px;
  }

  .navigation>img {
    width: 30px;
    height: 30px;
  }
</style>
