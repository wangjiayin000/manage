<template>
    <!--
          作者：luoyiming
          时间：2019-10-26
          描述：商品管理-商品编辑-规格/库存-多规格-表格
      -->
    <div class="mt16">
      <el-form>
          <el-form-item label="规格明细：" v-if="tableData.length > 0">
            <!--多规格表格-->
            <div >
              <el-table size="mini" :data="tableData" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
                <el-table-column label="序号" align="center" width="60">
                  <template v-if="scope.row" slot-scope="scope">
                    <!-- {{scope.$index}} -->
                    {{groupName(scope.row.group_name)}}
                  </template>
                </el-table-column>
                <el-table-column label="检测项目" align="center">
                    <template v-if="scope.row" slot-scope="scope">
                      {{scope.row.group_name}}
                    </template>
                </el-table-column>
                <el-table-column label="标准要求" align="center">
                    <template v-if="scope.row" slot-scope="scope">
                        <span>{{scope.row.spec_value}}</span> 
                    </template>
                </el-table-column>
                <el-table-column label="类型" align="center">
                    <template v-if="scope.row" slot-scope="scope">
                      <el-switch
                        v-model="scope.row.type"
                        active-text="数据"
                        inactive-text="文字">
                      </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="数据" align="center">
                    <template v-if="scope.row" slot-scope="scope">
                        <div v-show="scope.row.type">
                          <span v-show="scope.row.typeList.length>0">
                              <span v-for="(item,index) in scope.row.typeList" :key="index">{{item}}</span>
                          </span>
                          <el-button type="text" @click="addType(scope.row,scope.$index)">选择</el-button>
                        </div>        
                    </template>
                </el-table-column>
                <el-table-column label="单位" align="center">
                  <template v-if="scope.row" slot-scope="scope">
                    <el-select size="small" v-model="scope.row.items" placeholder="符号">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                
              </el-table>
            </div>
          </el-form-item>
      </el-form>
      <el-dialog title="添加范围" :visible.sync="dialogVisible" @close='dialogFormVisible' :close-on-click-modal="false"
        :close-on-press-escape="false" width="600px">
        <el-form size="small" :model="typeForm" ref="typeForm">
          <el-col :span="6">
            <el-form-item label="范围" prop="type1" label-width="40px">
              <el-input v-model="typeForm.type1" placeholder="请输入范围"></el-input>
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
            <el-form-item label="范围" prop="type4" label-width="45px" :rules="[{required: true,message: '请输入类型名称',trigger: ['blur', 'change']}]">
              <el-select size="small" v-model="typeForm.type4" placeholder="请选择范围">
                  <el-option v-for="item in arrList" :key="item.value" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="范围" prop="type5" label-width="45px" :rules="[{required: true,message: '请输入类型名称',trigger: ['blur']}]">
              <el-input v-model="typeForm.type5" placeholder="请输入范围"></el-input>
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
    import PorductApi from '@/api/product.js';
    import special from '@/assets/js/specialsymbol.js'
    import Upload from '@/components/file/Upload';
    export default{
      components:{
        Upload
      },
      data() {
        return {
          /*批量设置sku属性*/
          batchData: {
            product_price: '',
            line_price: '',
            stock_num: '',
            product_weight: ''
          },
          /*图片是否打开*/
          isupload: false,
          //上传图片选择的下标
          spec_index: -1,
          options: [...special],
          spanArr:[],
          pos:0,
          index:0,
          dialogVisible:false,
          submit_loading:false,
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
              label:'≤',
              value:2
            },
            {
              label:'=',
              value:3
            }
          ],
          strarrList:[
            {
              label:'<',
              value:1
            },
            {
              label:'≤',
              value:2
            },
            {
              label:'=',
              value:3
            },
            {
              label:'≥',
              value:4
            },
            {
              label:'>',
              value:5
            }

          ],
        };
      },
      inject: ['form'],
      mounted() {
      },
      computed:{
        tableData(){
          let self = this
          self.getSpanId(self.form.model.spec_many.spec_list)
          return self.form.model.spec_many.spec_list
        }
      },
      methods: {
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
                    if (data[i].group_name == data[i - 1].group_name) {
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
          if (columnIndex === 0 || columnIndex === 1) {            
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
        groupName(e){
          let a = 0;
          let self = this;
          self.form.model.spec_many.spec_attr.filter((item,index)=>{
            a= item.group_name==e?index+1:1
          })
          return a
        },
        addType(row,index){
          this.index = index;
          console.log(this.index)
          this.dialogVisible = true;
        },
        dialogFormVisible(){
          this.typeForm.type1 = '';
          this.typeForm.type2 = '';
          this.typeForm.type3 = '';
          this.typeForm.type5 = '';
          this.dialogVisible = false;
        },
        addTag(){
          let self = this;
          self.$refs.typeForm.validate((valid)=>{
            if (valid) {
              self.tableData[self.index].typeList = Object.values(self.typeForm)
              this.dialogFormVisible()
            }
          })
        }
      }
    }
  </script>
  
  <style>
  </style>
  