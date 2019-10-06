<template>
    <div class='container'>
        <h3>学校管理</h3>
        <div class='form-box'>
            <div class="item-box">
                <el-row>
                    <el-col :span="7">标识码：</el-col>
                    <el-col :span="17">
                        <el-input v-model="code" placeholder="请输入内容"></el-input>
                    </el-col>
                </el-row>
            </div>
            <div class="item-box">
                <el-row>
                    <el-col :span="7">名称：</el-col>
                    <el-col :span="17">
                        <el-input v-model="name" placeholder="请输入内容"></el-input>
                    </el-col>
                </el-row>
            </div>
            <div class="item-box">
                <el-row>
                    <el-col :span="7">类型：</el-col>
                    <el-col :span="17">
                          <el-select v-model="type" clearable  placeholder="请选择">
                            <el-option
                            v-for="item in options1"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
            <div class="item-box">
                <el-row>
                    <el-col :span="7">市：</el-col>
                    <el-col :span="17">
                        <el-select v-model="cityId" clearable placeholder="请选择">
                            <el-option
                            v-for="item in options2"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>   
                    </el-col>
                </el-row>
            </div>
            <div class="item-box">
                <el-row>
                    <el-col :span="7">区县：</el-col>
                    <el-col :span="17">
                       <el-select v-model="countyId" clearable placeholder="请选择">
                            <el-option
                            v-for="item in options3"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
            <div class="item-box">
                <el-row>
                    <el-col :span="0">
                       &nbsp;
                    </el-col>
                    <el-col :span="24">
                         <el-button type="primary" icon="el-icon-search" @click="getSchoolList" plain>查询</el-button>
                       <el-button type="primary" icon='el-icon-plus' plain @click='add'>添加学校</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="item-box">
                <el-row>
                    <el-col :span="12">
                      <el-upload
                        class="upload-demo"
                        action="/api/import/importSchool"
                        :on-success="handlerUploadSuccess"
                        :show-file-list="false"
                        :before-upload='beforeUpload'
                        >
                        <el-button  type="primary">学校导入</el-button>
                    </el-upload>   
                    </el-col>
                    <el-col :span="12">
                         <span style='cursor:pointer;color:#1585FF;' type="primary" @click='download'>模版下载</span>
                      <!-- <a target='_blank' @click='download' style="cursor:pointer;">模版下载</a> -->
                    </el-col>
                </el-row>
            </div>
        </div>
         <div class="table" :style="{width:tableWidth+'px'}">
              <el-table
                :data="tableData"
                border
                 v-loading="loading"
                style="width: 100%">
                <el-table-column
                prop="name"
                label="学校名称"
                align='center'
                >
                </el-table-column>
                <el-table-column
                prop="typeName"
                label="学校类型"
                align='center'
                >
                </el-table-column>
                <el-table-column
                prop="runByName"
                label="学校所属"
                align='center'
                >
                </el-table-column>
                <el-table-column
                prop="xq"
                label="校区"
                align='center'
                >
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="操作"
                    align="center"
                    width="180"
                    header-align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
            </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                @current-change='goPage'>
            </el-pagination>
            </div>
         </div>
         <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="800px">
            <schoolForm @close="dialogVisible = false" ref="schoolForm" @success='handlerSave'></schoolForm>
        </el-dialog>
    </div>
</template>
<script>

import schoolForm from './schoolForm'

export default {
    name:'schoolMana',
    components:{
        schoolForm
    },
    data(){
        return {
            title:'',
            code:'',
            pageSize:20,
            pageNum:1,
            name:'',
            type:'',
            cityId:'',
            countyId:'',
            total:0,
            tableData:[],
            options1:[],
            options2:[],
            options3:[],
            dialogVisible:false,
            loading:false
        }
    },
    computed:{
        tableWidth(){
            return (this.$store.getters.windowWidth - 210 -40)
        }
    },
    watch:{
       cityId(cityId){
           this.$api.getCountyList({cityId:cityId}).then(res=>{
               this.options3 = res.data
            })
       } 
    },
    methods:{
        download(){
            window.open('/school.xlsx','_blank')
        },
        handlerUploadSuccess(){
            this.loading = false
            this.getSchoolList();
        },
        beforeUpload(){
            this.loading = true
        },
        init(){
            this.getSchoolList();
            this.getSchoolType();
            this.getCityList();
        },
        goPage(page){
            this.pageNum = page
            this.getSchoolList();
        },
        getSchoolType(){
            this.$api.getSchoolType().then(res=>{
                this.options1 = res.data.data
            })
        },
        getCityList(){
            this.$api.getCityList().then(res=>{
                this.options2 = res.data
            });
        },
        handleEdit(index,row){
            this.dialogVisible = true;
            this.title = '编辑学校';
            this.$nextTick(()=>{
                this.$refs.schoolForm.type = 'edit';
                this.$refs.schoolForm.form = {
                    ...row
                }
            })
        },
        handleDelete(index,row){
            this.$api.deleteSchool({id:row.id}).then(res=>{
                 this.$message({
                    type:'success',
                    message:res.msg
                })
                this.getSchoolList();
            })
        },
        handlerSave(){
            this.getSchoolList();
        },
        add(){
            this.dialogVisible = true
            this.title = '新增学校'
            this.$nextTick(()=>{
                this.$refs.schoolForm.type = 'add';
                this.$refs.schoolForm.clear();
            })
        },
        getSchoolList(){
            this.loading = true
            let params = {
                code:this.code,
                pageSize:this.pageSize,
                pageNum:this.pageNum,
                name:this.name,
                type:this.type,
                cityId:this.cityId,
                countyId:this.countyId,
                eduinstId:JSON.parse(localStorage.getItem('user')).data.eduinstId
            }
            this.$api.getSchoolList(params).then(res=>{
                this.loading = false
                this.tableData = res.data.data;
                this.pageNum = res.data.pageNum;
                this.pageSize = res.data.pageSize;
                this.total = res.data.total
            })
        }
    },
    mounted(){
        this.init()
    }
}
</script>
<style lang="less" scoped>
.container{
    padding: 20px;
    display: flex;
    width:calc(100%-40px);
    flex-direction:column;
    justify-content: center;
    .form-box{
        margin-top: 20px;
        .item-box{
            width:240px;
            height:40px;
            float: left;
            margin: 3px 10px;
            align-items: center;
            line-height: 40px;
        }

    }
     .pagination{
        display: flex;
        flex-direction:row-reverse;
    }
    .table{
        margin-top: 20px;
    }
}
</style>


