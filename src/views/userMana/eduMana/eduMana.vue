<template>
    <div class='container'>
        <h3>教育局管理</h3>
        <div class="form-box">
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
                        <el-select v-model="type" clearable placeholder="请选择">
                            <el-option
                            v-for="item in options1"
                            :key="item.id"
                            :label="item.name"
                            :value="item.code">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
            <div class="item-box">
                <el-row>
                    <el-col :span="7">所属市：</el-col>
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
                    <el-col :span="7">县/区：</el-col>
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
                         <el-button type="primary" icon="el-icon-search" @click="getEduList" plain>查询</el-button>
                       <el-button type="primary" icon='el-icon-plus' plain @click='add'>添加教育局</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="item-box">
                <el-row>
                    <el-col :span="0">
                       &nbsp;
                    </el-col>
                    <el-col :span="24">
                      <el-upload
                        class="upload-demo"
                        action="/api/import/importEduinstlUser"
                        :on-success="handlerUploadSuccess"
                        :show-file-list="false"
                        :before-upload='beforeUpload'
                        >
                        <el-button  type="primary">教育局导入</el-button>
                    </el-upload>   
                    </el-col>
                </el-row>
            </div>
            <div class="clear"></div>
        </div>
        <div class="table" :style="{width:tableWidth+'px'}">
        <el-table
            :data="tableData"
            border
            class="table-item"
            >
            <el-table-column
            prop="code"
            label="教育局标识码"
            align="center"
            header-align="center"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="教育局名称"
            align="center"
            header-align="center"
            >
            </el-table-column>
            <el-table-column
            prop="typeName"
            label="教育局类型"
            align="center"
            header-align="center"
            >
            </el-table-column>
            <el-table-column
            prop="cityName"
            label="教育局归属地"
            align="center"
            header-align="center"
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
            :total="total">
            </el-pagination>
        </div>
        
        </div>
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="800px">
            <eduFrom ref="eduFrom" @close="dialogVisible = false" @success="handlerSave"></eduFrom>
        </el-dialog>
    </div>
</template>
<script>
import eduFrom from './eduForm'
export default {
    name:'eduMana',
    components:{
       eduFrom 
    },
    computed:{
        tableWidth(){
            return (this.$store.getters.windowWidth - 210 -40)
        }
    },
    data(){
        return {
            load:null,
            input:'',
            tableData:[],
            pageSize:20,
            pageNum:1,
            total:0,
            code:'',
            name:'',
            type:'',
            cityId:'',
            countyId:'',
            options1: [],
            options2: [],
            options3: [],
            dialogVisible:false,
            title:'',
        }
    },
    watch:{
        cityId(cityId){
            this.$api.getCountyList({cityId:cityId}).then(res=>{
               this.options3 = res.data
            })
        }
    },
    mounted(){
        this.getEduList()
        this.init()
    },
    methods:{
        beforeUpload(){
            this.load = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
            this.getEduList();
        },
        init(){
            this.$api.getCityList().then(res=>{
                this.options2 = res.data
            });
            this.$api.getDictList({type:'EDUINST_TYPE'}).then(res=>{
                this.options1 = res.data
            })
        },
        add(){
            this.dialogVisible = true
            this.title = '新增教育局'
            this.$nextTick(()=>{
                this.$refs.eduFrom.type = 'add'
                this.$refs.eduFrom.clear();
            })
            
        },
        handlerSave(){
            this.getEduList();
        },
        handlerUploadSuccess(a,b){
            this.load.close();
            this.getEduList();
        },
        handleEdit(index, row){
            this.dialogVisible = true
            this.title = '编辑教育局'
            this.$nextTick(()=>{
                this.$refs.eduFrom.type = 'edit'
                this.$refs.eduFrom.form = {
                    ...row
                }
            })   
        },
        handleDelete(index,row){
            this.$api.deleteEduinst({id:row.id}).then(res=>{
                this.$message({
                    type:'success',
                    message:res.msg
                })
                this.getEduList();
            })
        },
        getEduList(){
            let params = {
               pageNum:this.pageNum,
               pageSize:this.pageSize,
               code:this.code,
               name:this.name,
               type:this.type,
               cityId:this.cityId,
               countyId:this.countyId
            }
            this.$api.getEduList(params).then(res=>{
                console.log(res)
                this.total = res.data.total
                this.tableData  = res.data.data
            })
        }
    }
}
</script>
<style lang="less" scoped>
.clear{
    clear: both;
}
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


