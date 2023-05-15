<template>
    <div class="sampletypeadd">
        <div class="common-level-rail">
            <el-form size="small" :model="form" ref="form">
            <el-col :span="4">
              <el-button size="small" icon="el-icon-plus" @click="addClick">添加实验</el-button>
            </el-col>
            <el-col :span="8">
              <el-form-item label="样品名称" prop="sample_name" label-width="80px" required :rules="[{required: true,message: '请输入样品名称',trigger: ['blur']}]">
                <el-input v-model="form.sample_name" placeholder="请输入样品名称"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="pb50">
          <el-table size="small" :data="tableData" :span-method="objectSpanMethod" border>
            <el-table-column prop="item_name" label="检测项目"></el-table-column>
            <el-table-column prop="item_subclass_name" label="标准要求"></el-table-column>
            <el-table-column prop="type" label="类型">
              <template slot-scope="scope">
                  {{scope.row.type | typeItem}}
              </template>
            </el-table-column>
            <el-table-column prop="product_name" label="单位符号"></el-table-column>
            <el-table-column label="实验标准" width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.testing_standard&&scope.row.testing_standard.length!=0">
                  <span v-for="(item,index) in scope.row.testing_standard" :key="index">{{item}}</span>
                </div>
                <el-button size="small" type="text" @click="addType(scope.$index)">添加标准</el-button>
              </template>
            </el-table-column>
            <el-table-column label="A" width="100">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.a" false-label="0" true-label="1"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="B" width="100">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.b" false-label="0" true-label="1"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="C" width="100">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.c" false-label="0" true-label="1"></el-checkbox>
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
        <!-- 添加标准数据 -->
        <el-dialog title="添加标准数据" :visible.sync="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
        :close-on-press-escape="false" width="600px">
          <el-form size="small" :model="typeForm" ref="typeForm">
            <el-col :span="6">
              <el-form-item label="数据" prop="type1" label-width="40px">
                <el-input v-model="typeForm.type1" type="number" placeholder="请输入数据"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="范围" prop="type2" label-width="40px">
                <el-select size="small" v-model="typeForm.type2" placeholder="请选择范围">
                  <el-option v-for="item in arrList" :key="item.value" :label="item.label" :value="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="范围" prop="type4" label-width="45px" :rules="[{required: true,message: '请选择范围',trigger: ['blur', 'change']}]">
                <el-select size="small" v-model="typeForm.type4" placeholder="请选择范围">
                    <el-option v-for="item in arrList" :key="item.value" :label="item.label" :value="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="数据" prop="type5" label-width="45px" :rules="[{required: true,message: '请输入数据',trigger: ['blur']}]">
                <el-input v-model="typeForm.type5" type="number" placeholder="请输入数据"></el-input>
              </el-form-item>
            </el-col>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible">取 消</el-button>
            <el-button type="primary" @click="addTag()" :disabled="submit_loading">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import RecommendApi from '@/api/recommend.js';
import SampleApi from '@/api/Sample.js';
import sampletype from "@/components/sampletype/sampletype"
export default{
    components:{
        sampletype
    },
    data(){
        return{
            form: {
              id:'',
              sample_name: '',
              experiment_id:[],
              sample_list:[]
            },
            isproduct:false,
            loading:false,
            type: 10,
            num: 20,
            product_arr: [],
            tableData:[],
            pos:0,
            spanArr:[],
            dialogVisible:false,
            submit_loading:false,
            index:0,
            typeForm:{
            type1:'',
            type2:'',
            type3:'?',
            type4:'',
            type5:''
          },
          arrList:[
            {
              label:'<',
              value:1
            },
            {
              label:'<=',
              value:2
            },
            {
              label:'=',
              value:3
            }
          ],
        }
    },
    filters:{
      typeItem(e){
        if(e==1){
          return '数据'
        }else{
          return "文字"
        }
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
            if (e.type == 'success') {
                if (this.product_arr.indexOf(e.params.id) > -1) {
                  this.$message({
                      message: '你已选中该产品',
                      type: 'error'
                  });
                  return false;
                }
                let param = {
                  experiment_id: e.params.id,
                  page:1
                };
               this.getExperimentProjectLists(param);
            }
        },
        getExperimentProjectLists(params){
          this.loading = true;
          SampleApi.sampleGetExperimentProjectLists(params, true)
            .then(res => {
              this.loading = false;
              if (res.code == 1) {
                res.data.list.forEach(item => {
                   if(item.testing_standard&&item.testing_standard.length!=0){
                     item.testing_standard = JSON.parse(item.testing_standard)
                   }
                   return item;
                });
                this.tableData = [...this.tableData,...res.data.list];
                this.getSpanId(this.tableData);
                this.form.experiment_id = params.experiment_id
                this.product_arr.push(params.experiment_id);
              }
            })
            .catch(error => {
              this.loading = false;
            });
        },
        getSpanId(data) {
            // data就是我们从后台拿到的数据
            this.spanArr = []
            for (var i = 0; i < data.length; i++) {
                if (i === 0) {
                //spanArr 用于存放没一行记录的合并数
                    this.spanArr.push(1);
                    //pos是spanArr的索引
                    this.pos = 0;
                } else {
                    // 判断当前元素与上一个元素是否相同
                    if (data[i].item_id == data[i - 1].item_id) {
                        this.spanArr[this.pos] += 1;
                        this.spanArr.push(0);
                    } else {
                        this.spanArr.push(1);
                        this.pos = i;
                    }
                }
                // console.log(this.spanArr);
                // console.log(this.pos);
            }
        },
        /*表格跨行*/
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          if (columnIndex === 0) {            
              const _row = this.spanArr[rowIndex];
              //如果行号大于0 合并
              const _col = _row > 0 ? 1 : 0;
              // console.log(`rowspan:${_row} colspan:${_col}`);
              return {
                  // [0,0] 表示这一行不显示， 
                  rowspan: _row,
                  colspan: _col
              };
          }
        },
         /*删除商品*/
        deleteClick(e) {
            let index = this.product_arr.indexOf(e.id);
            this.product_arr.splice(index, 1);
            this.tableData.splice(index, 1);
        },
        //**打开添加标准弹框 */
        addType(index){
          this.index = index
          this.dialogVisible = true;
        },
        //**关闭添加标准弹框 */
        dialogFormVisible(){
          this.$refs['typeForm'].resetFields();
          // this.typeForm.type1 = '';
          // this.typeForm.type2 = '';
          // this.typeForm.type4 = '';
          // this.typeForm.type5 = '';
          this.dialogVisible = false;
        },
        //**添加标准数据 */
        addTag(){
          let self = this;
          self.$refs.typeForm.validate((valid)=>{
            if (valid) {
              self.tableData[self.index].testing_standard = Object.values(self.typeForm)
              self.dialogFormVisible()
            }
          })
        },
        /*提交*/
        onSubmit(){         
          let self = this;
          self.$refs.form.validate((valid)=>{
            if (valid) {
              self.form.experiment_id = self.product_arr;
              self.form.sample_list = self.tableData;
              self.loading = true;
              SampleApi.sampleAddSampleType(self.form, true)
              .then(res => {
                self.loading = false;
                if(res.code==1){
                  self.$message({
                    message: res.msg,
                    type: 'success'
                  });
                  self.$router.push('/sample/sampletype/index');
                }else{
                  self.$error({
                    message: res.msg,
                    type: 'success'
                  });
                }
                
              })
              .catch(error => {
                self.loading = false;
              });
            }
          })
        }

    }
}
</script>