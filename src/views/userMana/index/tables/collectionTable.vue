<template>
<div  class='container'>
    <h3>数据项采集</h3>
    <div >
        <table class='table'>
            <tr>
                <td>学校</td>
                <td v-for='(item,index) in th' :key='index'>
                    {{index+1}}.{{item.title}}
                </td>
                <td >编辑</td>
            </tr>
            <tr v-for='(item,index) in tableData' :key='index'>
                <td>
                    <el-select placeholder="请选择" v-model="item.value" @change="changeSelect(item.value,index)">
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </td>
                <td v-for='(ite,inde) in tableData[index]' :key='inde' @click='getIndex(index,inde)'>
                    <input type="text" v-model='ite.content' v-if='ite.valueType !="file"' class='input' @blur='ite.content = ite.content.replace(/\D/g,"")'>
                    <el-upload
                        v-if='ite.valueType =="file"'
                        class="upload-demo"
                        :action="baseURL + '/file/'+ite.collectionId+'/upload'"
                        :on-success="handlerUploadSuccess"
                        :show-file-list="false"
                        :before-upload='beforeUpload'
                        >
                        <el-link type="primary">导入</el-link>
                    </el-upload>  
                    <div v-for='(x,y) in ite.files'><a :href='x.filePath' :index='y'>{{y+1}}.{{x.fileName}}</a>&nbsp;<span @click='deleteFile(y,ite.files)'> 删除</span></div>
                </td>
                <td><el-button  @click='deleteDate(index,inde)' type="danger">删除</el-button></td>
            </tr>
        </table>
        <el-button type="primary" plain @click='add'>新增</el-button>
        <el-button type="primary" plain @click='submit'>提交</el-button>
    </div>  
</div>
</template>
<script>
import { Promise } from 'q';
import {baseURL} from '@/api'
console.log(baseURL);
export default {
    name:'collection',
    data(){
        return {
            th:[],
            tableData:[],
            options: [],
            index:'',
            inde:'',
            api:'schoolCollectionCreate',
            load:null,
            baseURL:baseURL
        }
    },
    methods:{
        submit(){
            function isRepeat(arr) {
                var hash = {};
                for(var i in arr) {
                    if(hash[arr[i]]) {
                    return true;
                    }
                    // 不存在该元素，则赋值为true，可以赋任意值，相应的修改if判断条件即可
                    hash[arr[i]] = true;
                }
                return false;
                }
            let schoolIds = this.tableData.filter(target=>{
                return (target.value!==undefined)
            }).map(target=>{return target.value})
            if(schoolIds.length!==this.tableData.length){
                this.$message({
                    type:'warning',
                    message:'学校不能为空'
                })
                 return false;
            }
            if(isRepeat(schoolIds)){
                this.$message({
                    type:'warning',
                    message:'不许有重复的学校'
                })
                return false
            }

            let params = {
                collectionData:this.tableData.filter(target=>{return target.value!==undefined})
            }
            this.$api[this.api](params).then(res=>{
                this.$message({
                    type:'success',
                    message:res.msg
                })
            })
        },
        add(){
            this.tableData.push(this.createData())
        },
        changeSelect(v,index){
            this.tableData[index].forEach(target=>{
                target.schoolId = v
            })
        },
        handlerUploadSuccess(response){
            this.load.close();
            this.tableData[this.index][this.inde].files.push(response.data)
        },
        beforeUpload(){
            this.load = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
        },
        deleteDate(index,inde){
            if(this.tableData[index].value == undefined){
                this.tableData.splice(index,1);
                return;
            }
            let params = {
                schoolId:this.tableData[index].value
            }
            this.$api.schoolCollectionDelete(params).then(res=>{
                this.$message({
                    type:'success',
                    message:res.msg
                })
                this.tableData.splice(index,1);
            })
        },
        deleteFile(index,files){
            files.splice(index,1);
        },
        getIndex(index,inde){
            this.index = index;
            this.inde = inde;
        },
        createData(){
            return this.th.map((target)=>{
                return {
                    collectionId:target.id,
                    valueType:target.valueType,
                    "content": "",
                    "eduinstId": JSON.parse(localStorage.getItem('user')).data.eduinstId,
                    "indexId": target.indexId,
                    "schoolId": '',
                    "files": [
                    ]
                }
            })
        }
    },
    mounted(){
        this.$api.collectionList().then(res=>{
            this.th = res.data
            this.$api.schoolCollectionList({eduinstId:JSON.parse(localStorage.getItem('user')).data.eduinstId}).then(res=>{
            let data = res.data.map(target=>{
                target.collectionData.value = target.schoolId
                return target.collectionData
            })
            let dataCopy = []
            data.forEach(target=>{
                let x = [];
                this.th.forEach(tar=>{
                    target.forEach(t=>{
                        if(t.collectionId == tar.id){
                            x.push(t)
                        }
                    })
                })
                x.value = target.value
                dataCopy.push(x);
            })
            if(dataCopy.length == 0){
                this.api = 'schoolCollectionCreate'
                this.$nextTick(()=>{
                this.tableData.push(this.createData())  
                })
            }else{
                this.api = 'schoolCollectionUpdate'
                this.tableData = dataCopy
            }
            })
        })
        this.$api.getSchoolList().then(res=>{
            this.options = res.data.data
        })
        
    }
}
</script>
<style lang="less" scoped>
.container{
    width:100%;
    height:100%;
    padding: 20px;
    overflow: scroll;
    display: block;
    .table{
        border-collapse: collapse;
        border: 1px solid #747474;
        tr {background: #fff;font-size: 12px;color: #0a0a0a;}  
        td{min-width:150px;line-height:20px;text-align: center;height:40px;border: 1px solid #070707;} 
  
    }
}
.input{
    border:none;
    outline: none;
    width:100%;
    height:100%;
    text-align: center;
}
</style>


