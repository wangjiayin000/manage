<template>
    <div class="ceshi">
        <el-table :data="tableData">
            <el-table-column label="序号" align="center" type="index" width="50">
            </el-table-column>
            <el-table-column label="项目检测" align="center" width="150">
                <template slot-scope="scope">
                    <span>{{ scope.row.date}}</span>
                </template>
            </el-table-column>
            <el-table-column label="标准要求" align="center">
                <template slot-scope="scope">
                    <div class="na">
                        <el-table :data="scope.row.tab" :border="false"  :show-header="false">
                            <el-table-column label="" align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.name}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="检测结果">
                <el-table-column prop="name" align="center" label="短路实验前" width="100">
                    <template slot-scope="scope">
                        <div class="na">
                            <el-table :data="scope.row.tab" :border="false"  :show-header="false">
                                <el-table-column label="" align="center">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.name}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="name" align="center" label="短路实验后" width="100">
                    <template slot-scope="scope">
                        <div class="na">
                            <el-table :data="scope.row.tab" :border="false"  :show-header="false">
                                <el-table-column :class-name="'he'+scope.$index" label="" align="center">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.name}}{{scope.$index}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="结论" align="center" width="150">
                <template slot-scope="scope">
                    <span>{{ scope.row.date}}</span>
                </template>
            </el-table-column>
        </el-table>


    </div>
   
</template>
<script>
 export default{
    data(){
        return{

            tableData: [{
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            tab:[
                {
                    name:'1'
                },
                {
                    name:'2'
                },
                {
                    name:'3'
                },
                {
                    name:'4'
                },
                {
                    name:'5'
                }
            ],
            zip: 200333
            }, {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            tab:[
                {
                    name:'111'
                },
                {
                    name:'21111111111111111111111111111'
                },
                {
                    name:'3111'
                },
                {
                    name:'411'
                },
                {
                    name:'5111'
                }
            ],
            zip: 200333
            }, {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            tab:[
                {
                    name:'1'
                },
                {
                    name:'2'
                },
                {
                    name:'3'
                },
                {
                    name:'4'
                },
                {
                    name:'5'
                }
            ],
            zip: 200333
            }, {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            tab:[
                {
                    name:'1'
                },
                {
                    name:'2'
                },
                {
                    name:'3'
                },
                {
                    name:'4'
                },
                {
                    name:'5'
                }
            ],
            zip: 200333
            }, {
            date: '2016-05-08',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            tab:[
                {
                    name:'1'
                },
                {
                    name:'2'
                },
                {
                    name:'3'
                },
                {
                    name:'4'
                },
                {
                    name:'5'
                }
            ],
            zip: 200333
            }, {
            date: '2016-05-06',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            tab:[
                {
                    name:'1'
                },
                {
                    name:'2'
                },
                {
                    name:'3'
                },
                {
                    name:'4'
                },
                {
                    name:'5'
                }
            ],
            zip: 200333
            }, {
            date: '2016-05-07',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            tab:[
                {
                    name:'1'
                },
                {
                    name:'2'
                },
                {
                    name:'3'
                },
                {
                    name:'4'
                },
                {
                    name:'5'
                }
            ],
            zip: 200333
            }],
            tab:[
                {
                    name:'1'
                },
                {
                    name:'2'
                },
                {
                    name:'3'
                },
                {
                    name:'4'
                },
                {
                    name:'5'
                }
            ]

        }
    },
    mounted(){

    },
    methods:{
       
    }
 }
</script>
<style lang="scss">
.ceshi{
    .el-table td{
        padding: 0 ;
    }
    .el-table .cell{
        padding: 0 ;
    }
    .na{
        .el-table--border, .el-table--group{
            border: none;
        }
        .el-table .cell{
          height: 40px;
          line-height: 40px;
          margin: 0 10px;
          overflow: hidden;  
        }
       
    }
    .he{
        height: 100px;
    }
}

</style>