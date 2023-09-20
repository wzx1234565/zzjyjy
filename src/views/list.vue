<template>
    <div class="list">
        <div class="btn">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/about/list' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="button">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="formInline.query" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item class="left">
                    <el-button class="el-icon-search" @click="search"></el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="add">添加用户</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="#" width="180">
                </el-table-column>
                <el-table-column prop="username" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="mobile" label="电话">
                </el-table-column>
                <el-table-column prop="role_name" label="角色">
                </el-table-column>
                <el-table-column prop="mg_state" label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state" active-color="#dcdfe6" inactive-color="#409eff"
                            :active-value="false" :inactive-value="true">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle @click="bj(scope.row)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle @click="del(index)"></el-button>
                        <el-button type="warning" icon="el-icon-setting" circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="this.pagenum" :page-sizes="[3, 6, 9, 10]" :page-size="this.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="this.total">
            </el-pagination>
        </div>
        <!-- 添加 -->
        <el-dialog title="添加" :visible.sync="dialogVisible" width="30%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <el-form-item class="right">
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 编辑 -->
        <el-dialog title="编辑" :visible.sync="dialogVisible1" width="30%">
            <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm1.username"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm1.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="ruleForm1.mobile"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm1('ruleForm')">取消</el-button>
                    <el-button type="primary" @click="submitForm1('ruleForm')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { getuser, getadd, getbj, getdel } from '@/api/index';
import { Message } from 'element-ui';
export default {
    data() {
        return {
            formInline: {
                query: ''
            },
            pagenum: 1,
            pagesize: 10,
            total: 0,
            tableData: [],
            dialogVisible: false,
            ruleForm: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                ],
            },
            dialogVisible1: false,
            ruleForm1: {
                username: '',
                email: '',
                mobile: ''
            },
            rules1: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                ],
            }
        }
    },
    created() {
        this.getlist();
    },
    methods: {
        add() {
            this.dialogVisible = true;
        },
        search() {
            this.getlist();
        },
        bj(row) {
            this.dialogVisible1 = true;
            this.ruleForm1.mobile = row.mobile;
            this.ruleForm1.username = row.username;
            this.ruleForm1.email = row.email;
            this.ruleForm1.id = row.id;
        },
        del(index) {
            // getdel({ id: id }).then((res) => {
            //     console.log(res);
            //     this.getlist();
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            this.tableData.splice(index, 1);

        },
        getlist() {
            getuser({ query: this.formInline.query, pagenum: this.pagenum, pagesize: this.pagesize }).then((res) => {
                console.log(res);
                this.tableData = res.data.data.users;
                this.total = res.data.data.total;
            })
        },
        handleSizeChange(val) {
            this.pagesize = val;
            this.getlist();
        },
        handleCurrentChange(val) {
            this.pagenum = val;
            this.getlist();
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    getadd(this.ruleForm).then((res) => {
                        console.log(res);
                        this.dialogVisible = false;
                        this.getlist();
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    })
                    this.ruleForm = {};
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.dialogVisible = false;
        },
        submitForm1(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    getbj(this.ruleForm1).then((res) => {
                        console.log(res);
                        this.dialogVisible1 = false;
                        this.getlist();
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm1() {
            this.dialogVisible1 = false;
        }
    },
    computed: {},
    filters: {},
    watch: {}
};
</script>

<style lang="scss" scoped>
.button {
    margin-top: 20px;
}
</style>