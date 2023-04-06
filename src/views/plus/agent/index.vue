<template>
  <!--
      	作者：luoyiming
      	时间：2019-06-04
      	描述：插件中心-分销
      -->
  <div>
    <!--入驻申请-->
    <Apply v-if="activeName == 'apply'"></Apply>
    <!--分销商用户-->
    <User v-if="activeName == 'user'"></User>
    <!--分销商等级-->
    <Grade v-if="activeName == 'grade'"></Grade>
    <!--分销订单-->
    <Order v-if="activeName == 'order'"></Order>
    <!--提现申请-->
    <Cash v-if="activeName == 'cash'"></Cash>
    <!--分销设置-->
    <Setting v-if="activeName == 'setting'"></Setting>
    <!--分销海报-->
    <Poster v-if="activeName == 'poster'"></Poster>

  </div>
</template>
<script>
import bus from '@/utils/eventBus.js';
import PlusApi from '@/api/plus.js';
import Apply from './apply/Apply';
import User from './user/User';
import Grade from './grade/index';
import Order from './order/Order';
import Cash from './cash/Cash';
import Setting from './setting/Setting';
import Poster from './poster/Poster';

export default {
  components: {
    Apply,
    User,
    Grade,
    Order,
    Cash,
    Setting,
    Poster
  },
  data() {
    return {
      formInline: {
        nick_name: ''
      },
      /*参数*/
      param: {},
      /*当前选中*/
      activeName: 'apply',
      /*切换数组*/
      sourceList: [
        {
          key: 'apply',
          value: '入驻申请',
          path:'/plus/agent/apply/index'
        },
        {
          key: 'user',
          value: '分销商用户',
          path:'/plus/agent/user/index'
        },
        {
          key: 'grade',
          value: '分销商等级',
          path:'/plus/agent/grade/index'
        },
        {
          key: 'order',
          value: '分销订单',
          path:'/plus/agent/order/index'
        },
        {
          key: 'cash',
          value: '提现申请',
          path:'/plus/agent/cash/index'
        },
        {
          key: 'setting',
          value: '分销设置',
          path:'/plus/agent/setting/index'
        },
        {
          key: 'poster',
          value: '分销海报',
          path:'/plus/agent/setting/qrcode'
        }
      ],
      /*权限筛选后的数据*/
      tabList:[],
      /*判断third是否有参数*/
      is_third_param: false
    };
  },
  watch:{

    //监听路由
    $route(to, from) {
      this.init();
    }
  },
  created() {

    this.init();

  },
  beforeDestroy() {
    //发送类别切换
    bus.$emit('tabData', { active: null, tab_type:'agent',list: [] });
    bus.$off('activeValue');
  },
  methods: {

    /*初始化方法*/
    init(){
      this.tabList=this.authFilter();

      if(this.tabList.length>0){
        this.activeName=this.tabList[0].key;
      }

      if (this.$route.query.type != null) {
        this.activeName = this.$route.query.type;
      }

      /*监听传插件的值*/
      bus.$on('activeValue', res => {
        if (this.is_third_param) {
          this.param.user_id = '';
          this.is_third_param = false;
        }
        this.activeName = res;
      });

      //发送类别切换
      let params = {
        active: this.activeName,
        list: this.tabList,
        tab_type:'agent'
      };
      bus.$emit('tabData', params);
    },

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
    }

  }
};
</script>
