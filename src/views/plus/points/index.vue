<template>
  <!--
    作者：luoyiming
    时间：2020-06-04
    描述：插件中心-积分商城
  -->
  <div>
    <!--商品设置-->
    <Product v-if="activeName == 'product'"></Product>

    <!--兑换设置-->
    <Settings v-if="activeName == 'settings'"></Settings>

    <!--兑换记录-->
    <Record v-if="activeName == 'record'"></Record>

  </div>
</template>
<script>
import bus from '@/utils/eventBus.js';
import Product from './product/index';
import Settings from './product/Settings';
import Record from './product/Record';

export default {
  components: {
    Product,
    Settings,
    Record
  },
  data() {
    return {
      /*参数*/
      param: {},
      /*当前选中*/
      activeName: 'product',
      /*切换数组原始数据*/
      sourceList: [
        {
          key: 'product',
          value: '商品审核',
          path:'/plus/points/product/index'
        },
        {
          key: 'settings',
          value: '兑换设置',
          path:'/plus/points/product/settings'
        },
        {
          key: 'record',
          value: '兑换记录',
          path:'/plus/points/product/record'
        }
      ],
      /*权限筛选后的数据*/
      tabList:[],
    };
  },
  created() {

    this.tabList=this.authFilter();
    
    if(this.tabList.length>0){
      this.activeName=this.tabList[0].key;
    }

    if (this.$route.query.type != null) {
      this.activeName = this.$route.query.type;
    }

    /*监听传插件的值*/
    bus.$on('activeValue', res => {
      this.activeName = res;
    });

    //发送类别切换
    let params = {
      active: this.activeName,
      list: this.tabList,
      tab_type: 'points'
    };
    bus.$emit('tabData', params);
  },
  beforeDestroy() {
    //发送类别切换
    bus.$emit('tabData', { active: null, tab_type: 'points', list: [] });
    bus.$off('activeValue');
  },
  methods: {

    /*权限过滤*/
    authFilter(){
      let list=[];
      for(let i=0;i<this.sourceList.length;i++){
        let item=this.sourceList[i];
        if(this.$filter.isAuth(item.path)){
          list.push(item);
        }
      }
      return list;
    },

  }
};
</script>
