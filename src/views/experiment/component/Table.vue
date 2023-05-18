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
                    {{groupName(scope.row.item_id)}}
                  </template>
                </el-table-column>
                <el-table-column label="检测项目" align="center">
                    <template v-if="scope.row" slot-scope="scope">
                      {{scope.row.item_name}}
                    </template>
                </el-table-column>
                <el-table-column label="标准要求" align="center">
                    <template v-if="scope.row" slot-scope="scope">
                        <span>{{scope.row.item_subclass}}</span> 
                    </template>
                </el-table-column>
                <el-table-column label="类型" align="center">
                    <template v-if="scope.row" slot-scope="scope">
                      <div v-if="show">
                        <span>{{scope.row.type | typeItem}}</span>
                    </div>
                    <div v-else>
                      <el-switch
                        v-model="scope.row.type"
                        active-text="数据"
                        inactive-text="文字">
                      </el-switch>
                    </div>
                     
                    </template>
                </el-table-column>
                <el-table-column label="单位" align="center">
                  <template v-if="scope.row" slot-scope="scope">
                    <div v-if="show">
                        <span>{{scope.row.items}}</span>
                    </div>
                    <div v-else>
                      <el-select size="small" v-model="scope.row.items" placeholder="符号">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"></el-option>
                      </el-select>
                    </div>
                   
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
      filters:{
        typeItem(e){
          if(e==1){
            return '数据'
          }else{
            return "文字"
          }
        }
      },
      computed:{
        tableData(){
          let self = this
          if(self.$route.query.id) this.buildSkulist()
          self.getSpanId(self.form.model.spec_list)
          return self.form.model.spec_list
        },
        show(){
          let show = false
          if(this.$route.query.id) show = true
          return show
        }
      },
      methods: {
        buildSkulist() {
          let self = this;
          let spec_attr = self.form.model.spec_attr;
          let specArr = [];
          spec_attr.forEach((item,index)=>{
            item.sub_class.forEach((val,i)=>{
                specArr.push({
                  item_id: item.item_id,
                  item_name:item.name,
                  item_subclass_id:val.item_subclass_id,
                  items:val.items,
                  type:val.type,
                  item_subclass:val.item_subclass_name
                  })
              })
          })
          // 合并旧数据
          if (self.form.model.spec_list.length > 0 && specArr.length > 0) {
            for (let i = 0; i < specArr.length; i++) {
              let overlap = self.form.model.spec_list.filter(function(val) {
                return val.item_subclass_id == specArr[i].item_subclass_id;
              });
              if (overlap.length > 0) {
                specArr[i].items = overlap[0].items;
                specArr[i].type = overlap[0].type;
              }
            }
          }
          self.form.model.spec_list = specArr;
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
          self.form.model.spec_attr.filter((item,index)=>{
            a= item.item_id==e?index+1:1
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
          this.typeForm.type4 = '';
          this.typeForm.type5 = '';
          this.dialogVisible = false;
        },
        addTag(){
          let self = this;
          self.$refs.typeForm.validate((valid)=>{
            if (valid) {
              // self.tableData[self.index].typeList = Object.values(self.typeForm)
              this.dialogFormVisible()
            }
          })
        }
      }
    }
  </script>
  
  <style>
  </style>
  