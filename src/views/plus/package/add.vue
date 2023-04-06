<template>
    <div class="user">
        <div class="common-form">新增活动会场</div>
        <div class="product-content">
            <el-form ref="form" :model="form" label-width="150px">
                <el-form-item label="活动标题" prop="name" :rules="[{required: true,message: ' '}]">
                    <el-input type="text" v-model="form.name" placeholder="请输入活动标题" class="max-w460"></el-input>
                </el-form-item>
                <el-form-item label="活动日期">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker 
                          v-model="form.value1" 
                          type="datetimerange" 
                          value-format="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <div class="common-form">礼包设置</div>
                <el-form-item label="优惠券 ">
                    <el-checkbox v-model="form.is_coupon"> 只能选择不限等级、不限数量、不限领取数量的优惠券</el-checkbox>
                </el-form-item>
                <el-form-item label="" v-if="form.is_coupon">
                    <el-button type="primary" @click="addCoupon()">添加</el-button>
                    <el-table :data="tableData" style="width: 40%">
                        <el-table-column prop="name" label="优惠券">
                        </el-table-column>
                        <el-table-column prop="name" label="数量">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="form.coupon_num" placeholder=""></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small"> 删除 </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item label="积分 ">
                    <el-checkbox v-model="form.is_point"> 不受每人每日限领规则限制</el-checkbox>
                </el-form-item>
                <el-form-item label=" " v-if="form.is_point">
                    <!--:disabled="true"-->
                    <el-input type="number" v-model="form.point" class="max-w460">
                        <template slot="append">积分</template>
                    </el-input>
                </el-form-item>
                <div class="common-form">购买设置</div>
                <el-form-item label="购买金额" prop="money" :rules="[{required: true,message: ' '}]">
                    <el-input type="number" v-model="form.money" class="max-w460">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="会员购买等级 ">
                    <el-radio-group v-model="form.is_grade">
                        <el-radio :label="0">不限</el-radio>
                        <el-radio :label="1">指定等级</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="会员等级 ">
                    <el-select v-model="form.grade_ids" multiple placeholder="请选择">
                        <el-option v-for="(item,index) in Grade" :key="index" :label="item.name"
                                   :value="item.grade_id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="购买次数 ">
                    <el-radio-group v-model="form.is_times">
                        <el-radio :label="0">不限</el-radio>
                        <el-radio :label="1">限购</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="">
                    <el-input type="number" v-model="form.times" class="max-w460">
                        <template slot="prepend">每人限购</template>
                        <template slot="append">次</template>
                    </el-input>
                </el-form-item>

            </el-form>
            <!--提交-->
            <div class="common-button-wrapper">
                <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
            </div>
        </div>
        <!--选择优惠券-->
        <GetCoupon v-if="open_add" :open_add="open_add" @closeDialog="closeProductDialogFunc($event)">选择优惠券弹出层</GetCoupon>
    </div>
</template>
<script>
    import UserApi from '@/api/user.js';
    import GiftPackageApi from '@/api/giftpackage.js';
    import GetCoupon from '@/components/coupon/GetCoupon';
    export default {
        components: {
            /*选择优惠券件*/
            GetCoupon
        },
        data() {
            return {
                form: {
                    is_coupon: false,
                    coupon: [],
                    coupon_num: 1,
                    is_point: false,
                    point: 0,
                    is_times: 0,
                    times: 0,
                    is_grade: 0,
                    grade_ids: '',
                    value1: [],
                    name: '',
                },
                /*等级*/
                Grade: {},
                /*优惠券*/
                tableData: [],
                loading: false,
                open_add: false,
            };
        },
        created() {
            /*获取等级*/
            this.getGradeList();
        },
        methods: {
            /*获取等级*/
            getGradeList(){
                let self = this;
                let Params = {};
                Params.page = self.curPage;
                Params.list_rows = self.pageSize;
                UserApi.gradelist(Params, true)
                    .then(data =>
                    {
                        self.Grade = data.data.list.data;

                    }).catch(error =>
                {

                });
            },
            /*添加优惠券*/
            addCoupon() {
                this.open_add = true;
//                this.coupon_index = e;
            },

            /*关闭优惠券*/
            closeProductDialogFunc(e) {
                let self = this;
                self.open_add = e.openDialog;
                if (e.type == 'success') {
                    self.form.coupon.push(e.params.coupon_id);
                    self.tableData.push(e.params);
                }
            },
            /*提交表单*/
            onSubmit() {
                let self = this;
                let form = self.form;
                self.$refs.form.validate((valid) =>
                {
                    if (valid) {
                        self.loading = true;
                        GiftPackageApi.SavePackage(form, true).then(data =>
                        {
                            self.loading = false;
                            if (data.code == 1) {
                                self.$message({
                                    message: data.msg,
                                    type: 'success'
                                });
                                self.$router.push('/plus/package/index');
                            } else {
                                self.loading = false;
                            }
                        })
                            .catch(error =>
                            {
                                self.loading = false;
                            });
                    }
                });

            },

        }
    };
</script>
