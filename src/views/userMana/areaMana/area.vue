<template>
    <div class="container">
        <el-dialog
            :title="title"
            :visible.sync="centerDialogVisible"
            width="370px"
            center>
            <areaForm ref="areaForm" @close="centerDialogVisible = false"></areaForm>
        </el-dialog>
        <h3>地区管理</h3>
        <div class="form-box">
            <span>大市名称：</span>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="getCountyList" plain icon="el-icon-search" style="margin-left:20px;">查询</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="add" plain>新增区域</el-button>
        </div>
        <div class="table" :style="{width:tableWidth+'px'}">
        <el-table
            :data="tableData"
            border
            class="table-item"
            >
            <el-table-column
            prop="parentName"
            label="所属市"
            align="center"
            header-align="center"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="地区名称"
            align="center"
            header-align="center"
            >
            </el-table-column>
            <el-table-column
            prop="address"
            label="操作"
            align="center"
            header-align="center"
            >
                 <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <!-- <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        </div>
        
    </div>
</template>
<script>
import { setTimeout } from 'timers';
import areaForm from './areaForm'
export default {
    name:"areas",
    components:{
        areaForm
    },
    data() {
      return {
        options: [],
        value: '',
        tableData: [],
        centerDialogVisible:false,
        title:'新增区域'
      }
    },
    computed:{
        tableWidth(){
            return (this.$store.getters.windowWidth - 210 -40)
        }
    },
    methods:{
        init(){
            this.$api.getCityList().then(res=>{
                this.options = res.data.map(target=>{
                    return {
                        ...target,
                        label:target.name,
                        value:target.id
                    }
                })
            })
        },
        getCountyList(){
            if(this.value==''){
                this.$message.error('请选择大市名称')
                return;
            }
            this.$api.getCountyList({cityId:this.value}).then(res=>{
                let list = res.data;
                list.forEach(target=>{
                    this.options.some(tar=>{
                        if(tar.id == target.parentId){
                            target.parentName = tar.name
                            return true
                        }
                    })
                })
                this.tableData = list
            })
        },
        handleEdit(index,row){
            this.centerDialogVisible = true
            this.title = '修改区域'
            this.$nextTick(()=>{
            this.$refs.areaForm.value = row.parentId;
            this.$refs.areaForm.form.name = row.name;
            }) 
        },
        handleDelete(index,row){
             console.log(row)
             
        },
        add(){
            this.centerDialogVisible = true
            this.title = '新增区域'
             this.$nextTick(()=>{
            this.$refs.areaForm.value = '';
            this.$refs.areaForm.form.name = '';
            }) 
        }
    },
    mounted(){
        this.init();
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
    // // height:calc(100% - 40px);
    // height:100%;
    .form-box{
        // width:100%;
        margin-top: 20px;
        padding-left: 20px;

    }
    .table{
        margin-top: 20px;
    }
    
}
</style>


