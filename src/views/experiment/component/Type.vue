<template>
    <div class="experimentlist-type">
        <div class="spec-wrap">
            <div class="mb16 min-spc" :key="attr.group_name" v-for="(attr, index) in form.model.spec_many.spec_attr">
                <div class="spec-hd">
                <div class="input-box">{{ attr.item_name }}</div>
                <a href="javascript:void(0);" @click="onDeleteGroup(index)"><i class="el-icon-delete"></i></a>
                </div>
                <div class="spec-bd">
                <div class="item" v-for="(items, i) in attr.spec_items" :key="i">
                    <el-tag closable @close="onDeleteValue(index, i)">{{ items.item_subclass }}</el-tag>
                </div>
                <div class="item"><el-input size="small" v-model="attr.item_subclass" style="width: 160px;"></el-input></div>
                <div class="item"><el-button size="small" @click="onSubmitAddValue(attr)" :loading="attr.loading">添加</el-button></div>
                </div>
            </div>
             <!-- 添加试验 -->
            <div v-if="!form.isSpecLocked">
                <el-button size="small" class="el-icon-circle-plus" v-show="showAddGroupBtn" @click="onToggleAddGroupForm">添加规格</el-button>
            </div>
            <!-- 实验列表 -->
            <div class="add-spec mb16" v-show="!showAddGroupBtn">
                <div class="from-box">
                    <div class="item">
                        <span class="key">检测项目：</span>
                        <el-input size="small" v-model="addGroupFrom.specName" placeholder="请输入检测项目"></el-input>
                    </div>
                    <!-- <div class="item">
                        <span class="key">规格值：</span>
                        <el-input size="small" v-model="addGroupFrom.specValue" placeholder="请输入规格值"></el-input>
                    </div> -->
                    <el-button type="primary" size="small" :loading="groupLoading" @click="onSubmitAddGroup" plain>确定</el-button>
                    <el-button size="small" @click="onToggleAddGroupForm">取消</el-button>
                </div>
            </div>
        </div>      
    </div>
</template>
<script>
  import ExperimentApi from '@/api/Experiment.js';
  export default{
      inject:['form'],
        data(){
            return{
                showAddGroupBtn:true,
                showAddGroupForm: false,
                  /*新增规格组值*/
                addGroupFrom: {
                    specName: '',
                    specValue: ''
                },
                groupLoading: false
            }
        },
        methods:{
             /*显示/隐藏添加规则组 */
            onToggleAddGroupForm(){
                this.showAddGroupBtn = !this.showAddGroupBtn;
                this.showAddGroupForm = !this.showAddGroupForm;
            },
            onSubmitAddGroup(){
                let self = this;
                if (self.addGroupFrom.specName === '') {
                    self.$message('请填写实验项目');
                    return false;
                }
                // 添加
                self.groupLoading = true;
                let Params = {
                  item_name: self.addGroupFrom.specName,
                  item_subclass: ''
                };
                ExperimentApi.experimentAddItem(Params, true)
                .then(res => {
                  self.groupLoading = false;
                  // 记录规格数据
                  self.form.model.spec_many.spec_attr.push({
                    item_id: res.data['item_id'],
                    item_name: self.addGroupFrom.specName,
                    spec_items: [],
                    tempValue: '',
                    loading: false
                  });
                  // 清空输入内容
                  self.addGroupFrom.specName = '';
                  self.addGroupFrom.specValue = '';
                  // 隐藏添加规则组
                  self.onToggleAddGroupForm();
                  // 构建规格组合列表
                  self.buildSkulist();
                })
                .catch(error => {
                  self.groupLoading = false;
                });
            },
            /*新增规格值*/
            onSubmitAddValue: function(specAttr) {
              let self = this;
              if (!specAttr.hasOwnProperty('item_subclass') || specAttr.item_subclass === '') {
                self.$message('规格值不能为空');
                return false;
              }
              // 添加到数据库
              specAttr.loading = true;
              let Params = {
                item_id: specAttr.item_id,
                item_subclass: specAttr.item_subclass
              };
              ExperimentApi.experimentSubclass(Params, true)
              .then(data => {
                specAttr.loading = false;
                // 记录规格数据
                specAttr.spec_items.push({
                  item_subclass_id: data.data['item_subclass_id'],
                  items:'',
                  type:0,
                  typeList:[],
                  item_subclass: specAttr.item_subclass
                });
                // 清空输入内容
                specAttr.item_subclass = '';
                // 构建规格组合列表
                self.buildSkulist();
              })
              .catch(error => {
                specAttr.loading = false;
              });
            },
            /*构建规格组合列表*/
            buildSkulist() {
              let self = this;
              let spec_attr = self.form.model.spec_many.spec_attr;
              let specArr = [];
              spec_attr.forEach((item,index)=>{
                item.spec_items.forEach((val,i)=>{
                    specArr.push({
                      item_id: item.item_id,
                      item_name:item.item_name,
                        ...val
                     })
                 })
              })
              // 合并旧数据
              if (self.form.model.spec_many.spec_list.length > 0 && specArr.length > 0) {
                for (let i = 0; i < specArr.length; i++) {
                  let overlap = self.form.model.spec_many.spec_list.filter(function(val) {
                    return val.item_subclass_id == specArr[i].item_subclass_id;
                  });
                  if (overlap.length > 0) {
                    specArr[i].items = overlap[0].items;
                    specArr[i].type = overlap[0].type;
                    specArr[i].typeList = overlap[0].typeList;
                  }
                }
              }
              self.form.model.spec_many.spec_list = specArr;
              // console.log(self.form.model.spec_many.spec_list,'数据')
            },
            /*删除规格组事件*/
            onDeleteGroup(index) {
            var self = this;
            self.$confirm('删除后不可恢复，确认删除该记录吗?', '提示', {
                type: 'warning'
                })
                .then(() => {
                // 删除指定规则组
                self.form.model.spec_many.spec_attr.splice(index, 1);
                // 构建规格组合列表
                self.buildSkulist();
                });
            },
            /*删除规格值值事件*/
            onDeleteValue(index, itemIndex) {
            let self = this;

            if(self.form.isSpecLocked){
                self.$message({
                message: '本商品正在搞活动，不能删除规格！',
                type: 'warning'
                });
                return;
            }

            self.$confirm('删除后不可恢复，确认删除该记录吗?', '提示', {
                type: 'warning'
                })
                .then(() => {
                // 删除指定规则组
                self.form.model.spec_many.spec_attr[index].spec_items.splice(itemIndex, 1);
                // 构建规格组合列表
                self.buildSkulist();
                });
            }


        }
    }
</script>
<style lang="scss" scoped>
.experimentlist-type{
    margin-left: 180px;
    margin-top: 16px;
    padding: 20px;
    border: 1px solid #e5ecf4;
    background: #f6f9fc;
}
.spec-wrap .spec-hd {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  font-weight: bold;
}
.spec-wrap .spec-hd .el-icon-delete-solid {
  font-size: 16px;
  color: #999999;
}
.spec-wrap .min-spc {
  border: 1px solid #dfecf8;
}
.spec-wrap .spec-bd {
  padding: 5px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  border-top: 1px solid #dfecf8;
  background: #ffffff;
}
.spec-wrap .spec-bd .el-tag {
  color: #333333;
}
.spec-wrap .spec-bd .item {
  position: relative;
  padding: 5px;
}
.spec-wrap .spec-bd .item input {
  padding-right: 30px;
}
.spec-wrap .spec-hd a,
.spec-wrap .spec-hd .svg-icon,
.spec-wrap .spec-bd .item .svg-icon {
  display: block;
  width: 16px;
  height: 16px;
}
.spec-wrap .spec-bd .item a {
  position: absolute;
  top: 6px;
  right: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-spec .from-box {
  display: flex;
  justify-content: flex-start;
}
.add-spec .item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  margin-right: 20px;
}
.add-spec .item .key {
  display: block;
  white-space: nowrap;
}
</style>