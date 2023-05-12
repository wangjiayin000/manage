<template>
    <div class="sampletypeadd">
        <div class="common-level-rail">
            <el-button size="small" icon="el-icon-plus" @click="addClick">添加实验</el-button>
        </div>
        <div class="pb50">
          <el-table size="small" :data="tableData" border>
            <el-table-column prop="product_name" label="检测项目"></el-table-column>
            <el-table-column prop="product_name" label="标准要求"></el-table-column>
            <el-table-column prop="product_name" label="类型"></el-table-column>
            <el-table-column prop="product_name" label="单位符号"></el-table-column>
            <el-table-column label="实验标准" width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.sort" type="number" :disabled="form.is_recommend == 0 ? true : false"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="A" width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.sort" type="number" :disabled="form.is_recommend == 0 ? true : false"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="B" width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.sort" type="number" :disabled="form.is_recommend == 0 ? true : false"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="C" width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.sort" type="number" :disabled="form.is_recommend == 0 ? true : false"></el-input>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="90">
              <template slot-scope="scope">
                <el-button @click="deleteClick(scope.row)" type="text" size="small" :disabled="form.is_recommend == 0 ? true : false">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
          <!--提交-->
        <div class="common-button-wrapper"><el-button type="primary" size="small" @click="onSubmit" :loading="loading">提交</el-button></div>
        <sampletype :isproduct="isproduct" @closeDialog="closeProductDialogFunc($event)"></sampletype>

    </div>
</template>
<script>
import RecommendApi from '@/api/recommend.js';
import sampletype from "@/components/sampletype/sampletype"
export default{
    components:{
        sampletype
    },
    data(){
        return{
            form: {
                is_recommend: 0,
                choice: 0,
                location: [],
                name: ''
            },
            isproduct:false,
            loading:false,
            type: 10,
            num: 20,
            product_arr: [],
            tableData:[]
        }
    },
    methods:{
         /*获取当前数据*/
    getData() {
      let self = this;
      let Params = {};
      RecommendApi.getData(Params, true)
        .then(data => {
          self.loading = false;
          self.form = data.data.vars.values;
          // 转成整数，兼容组件
          for(let i=0;i<self.form.location.length;i++){
            self.$set(self.form.location, i, parseInt(self.form.location[i]));
          }
          if (self.form.choice == 1) {
            self.product_arr = data.data.product_arr;
            self.tableData = self.form.product;
          } else {
            self.type = parseInt(self.form.type);
            self.num = parseInt(self.form.num);
          }
          self.form.is_recommend = parseInt(self.form.is_recommend);
          self.form.choice = parseInt(self.form.choice);
        })
        .catch(error => {
          self.loading = false;
        });
    },
        /*添加样品*/
        addClick(){
            this.isproduct = true;
        },
        /*关闭弹窗*/
        closeProductDialogFunc(e) {
            this.isproduct = e.openDialog;
            // console.log(e.params,'www')
            if (e.type == 'success') {
                if (this.product_arr.indexOf(e.params.id) > -1) {
                this.$message({
                    message: '你已选中该产品',
                    type: 'error'
                });
                return false;
                }
                let param = {};
                param.id = e.params.id;
                param.name = e.params.name;
                param.sort = 1;
                this.tableData.push(param);
                this.product_arr.push(e.params.id);
            }
        },
         /*删除商品*/
        deleteClick(e) {
            let index = this.product_arr.indexOf(e.id);
            this.product_arr.splice(index, 1);
            this.tableData.splice(index, 1);
        },
        /*提交*/
        onSubmit(){

        }
    }
}
</script>