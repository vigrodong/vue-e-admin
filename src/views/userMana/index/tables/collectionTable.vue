<template>
<div  class='container' v-loading='loading'>
    <h3 style='margin-bottom:10px;'>数据项采集</h3> 
    <div style='display:flex;align-items:center;'>
        <el-upload
        class="upload-demo"
        action="/api/import/importSchoolCollection"
        :on-success="handlerUploadSuccess"
        :show-file-list="false"
        :before-upload='beforeUpload'
        style="margin-right:20px;"
        >
          <el-button  type="primary">采集项导入</el-button>
    </el-upload>  
     <span style='cursor:pointer;color:#1585FF;' type="primary" @click='download'>采集项模版下载</span>
    </div>
    
    
    <div class='fixed' @click='submit'  v-show="isShow">
        <i class='el-icon-upload'></i><br>
         <span style='font-size:12px;'>提交数据</span> 
    </div>

    <div >
        <div class='box'>
            <div :class='["school-item",{isSelected:selectId == (item.schoolId+item.stage)}]' v-for='(item,index) in schoolIdList' :key='index' @click='edit_(item)'>
                <span>{{item.schoolName}} {{item.stageName}}</span>
                <div>
                <i class='el-icon-success' style='color:#5CBA33;' v-if='item.commit'></i><span style='font-size:12px;' v-if='item.commit'>已提交</span>
                <i class='el-icon-error' style='color:red' v-if='!item.commit'></i><span style='font-size:12px;' v-if='!item.commit'>未填写</span>
                </div>
                
            </div>
            <div style="clear:both"></div>
        </div>
        <div>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                @current-change='goPage'
                v-if='total>20'
                >
            </el-pagination>
        </div>
        <div class='form' v-show="isShow" >
            <div v-for='(item,index) in th' :key='index' class='tianbao'>
            <span>{{index+1}}.{{item.title}}</span><br>
            <input type="text" class='input' v-model='formData[index].content' v-if='formData[index].valueType!=="radio"'>
            <el-select v-model="formData[index].content" placeholder="请选择"
                 v-if='formData[index].valueType=="radio"'
                 style="width:300px;"
            >
                <el-option
                v-for="item in formData[index].valueOpt"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
            </div>
        </div>
    </div>  
</div>
</template>
<script>
import { Promise } from 'q';
import {baseURL} from '@/api'
import { Loading } from 'element-ui';
import { setTimeout } from 'timers';
console.log(baseURL);
export default {
    name:'collection',
    data(){
        return {
            schoolIdList:[],
            th:[],
            formData:[],
            schoolId:'',
            stage:'',
            selectId:'',
            isShow:false,
            pageSize:20,
            page:1,
            total:0,
            loading:false,
            xq:''
        }
    },
    //EEF8E8
    methods:{
        download(){
            window.open('/schoolC.xlsx','_blank')
        },
        handlerUploadSuccess(){
            this.loading = false
            this.$router.go(0)
        },
        beforeUpload(){
            this.loading = true
        },
        edit_(item){
            this.schoolId = item.schoolId
            this.stage = item.stage
            this.xq = item.xq
            this.selectId = item.schoolId+item.stage
            this.edit();
        },
         goPage(page){
            this.pageNum = page;
            this.getSchoolList();
        },
        edit(){
            // console.log(this.schoolId,this.stage)
            let loadingInstance = Loading.service({ fullscreen: true });
            this.formData.forEach(target=>{
                target.schoolId = this.schoolId;
                target.stage = this.stage
            })
            this.$api.schoolCollectionList({
               eduinstId: JSON.parse(localStorage.getItem('user')).data.eduinstId,
               schoolId:this.schoolId,
               stage:this.stage
            }).then(res=>{
                loadingInstance.close()
                if(res.data.length!==0){
                    res.data[0].collectionData.forEach(target=>{
                        this.formData.some(tar=>{
                            if(tar.collectionId == target.collectionId){
                                tar.content = target.content
                                return true
                            }
                        })
                    })
                }else{
                    this.formData.forEach(target=>{
                        target.content = ''
                    })
                }
                this.isShow = true
            })
            
        },
        submit(){
            let loadingInstance = Loading.service({ fullscreen: true });
            this.formData.forEach(target=>{
                target.xq = this.xq;
            })
            let params = {
                collectionData:[
                    this.formData
                ]
            }
            this.$api.schoolCollectionCreate(params).then(res=>{
                loadingInstance.close();
                this.$message({
                    type:'success',
                    message:res.msg
                })
            })
        },
        getSchoolList(){
            let params = {
                pageNum:this.page,
            }
            this.$api.getSchoolStagePage({eduinstId:JSON.parse(localStorage.getItem('user')).data.eduinstId}).then(res=>{
                this.schoolIdList = res.data.data
                this.page = res.data.pageNum;
                this.total = res.data.total;
                this.getSchoolListTab();
            })
        },
        getSchoolListTab(){
             let loadingInstance = Loading.service({ fullscreen: true });
             this.$api.getSchoolList().then(res=>{
                    this.options = res.data.data
                    loadingInstance.close()
                })
        }
    },

    mounted(){
        this.getSchoolList();
        this.getSchoolListTab();
        this.$api.getDictList({type:'STAGE_TYPE'}).then(res=>{
                this.stageOptions = res.data
                console.log(this.stageOptions );
            })
        this.$api.collectionList().then(res=>{
            this.th = res.data
            this.formData = this.th.map((target)=>{
                return {
                    collectionId:target.id,
                    valueType:target.valueType,
                    "content": "",
                    "eduinstId": JSON.parse(localStorage.getItem('user')).data.eduinstId,
                    "indexId": target.indexId,
                    "schoolId": '',
                    stage:'',
                    valueOpt:target.valueOpt?JSON.parse(target.valueOpt):{},
                    valueType:target.valueType
                }
            })
            console.log(this.formData)
        })
        
        
    }
}
</script>
<style lang="less" scoped>
.form{
    display:flex;
    flex-direction: column;
    align-items: center;

}
.fixed{
    position: fixed;
    width:60px;
    height:60px;
    right:60px;
    top:125px;
    text-align: center;
    color:#5CBA33;
    cursor: pointer;
    &:hover{
        color:#3794FF;
    }
    i{
        font-size: 36px;
    }
}
.container{
    width:calc(100% - 40px);
    height:calc(100% - 40px);
    padding: 20px;
    overflow: scroll;
    .tianbao{
        margin: 10px 0;
        width:400px
    }
    .box{
        .school-item{
            width:280px;
            height:45px;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #F4F3F4;
            border: 1px solid transparent;
            box-shadow: 0 1px 2px 0 hsla(0,0%,83.5%,.22);
            margin: 20px;
            padding: 0 10px ;
            float: left;
            cursor: pointer;
            // color:white;cursor:pointer;
        }
        .active{
            background-color: #5CBA33;
        }
        .isSelected{
            background-color: #EEF8E8;
            color:#5CBA33;
        }
    }
   
}
.input{
    border:1px solid #D7DAE2;;
    outline: none;
    width:300px;
    height:45px;;
    text-align: center;
    border-radius: 3px;
}
</style>


