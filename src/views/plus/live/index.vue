<template>
  <!--
    作者：luoyiming
    时间：2020-06-04
    描述：插件中心-直播
  -->
  <div>
    <!--直播房间-->
    <Room v-if="activeName == 'room'"></Room>

    <!--礼物设置-->
    <Gift v-if="activeName == 'gift'"></Gift>

    <!--直播设置-->
    <Setting v-if="activeName == 'setting'"></Setting>
    <!--订单列表-->
    <Order v-if="activeName == 'order'"></Order>
    <!--充值设置-->
    <Plan v-if="activeName == 'plan'"></Plan>
    <!--充值记录-->
    <Log v-if="activeName == 'log'"></Log>

  </div>
</template>
<script>
import bus from '@/utils/eventBus.js';
import Room from './room/index.vue';
import Gift from './gift/index.vue';
import Setting from './setting/index.vue';
import Order from './order/list.vue';
import Plan from './plan/setting.vue';
import Log from './plan/log.vue';

export default {
  components: {
    Room,
    Gift,
    Setting,
    Order,
    Plan,
    Log
  },
  data() {
    return {
      /*参数*/
      param: {},
      /*当前选中*/
      activeName: 'room',
      /*切换数组原始数据*/
      sourceList: [
        {
          key: 'room',
          value: '直播房间',

        },
        {
          key: 'gift',
          value: '礼物设置',

        },
        {
          key: 'setting',
          value: '直播设置',

        },
        {
          key: 'order',
          value: '直播订单',

        },
        {
          key: 'plan',
          value: '充值设置',

        },
        {
          key: 'log',
          value: '充值记录',

        }
      ],
      /*权限筛选后的数据*/
      tabList:[],
    };
  },
  created() {

    this.tabList=this.sourceList;//this.authFilter();

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
      tab_type: 'live'
    };
    bus.$emit('tabData', params);
  },
  beforeDestroy() {
    //发送类别切换
    bus.$emit('tabData', { active: null, tab_type: 'live', list: [] });
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
