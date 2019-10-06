<template>
    <div class="container">
         
        <div class='big-title'>
            <h3>{{params.bigName}}</h3>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="自评说明" name="first">
                <div class='big-title'>
            
            <span>
            （1）自评说明
            </span>
        </div>
        <br>
        
        <table class="xwtable">
        <tr>
            <td colspan="2">主要指标</td>
            <td>评估要点</td>
            <td>数值或简要结论</td>
            <td>自评等级（A/B/C）</td>
        </tr>
        <tr v-for="(item,index) in params.children3" :key='index'>
            <td class='s1' :rowspan='params.children3.length' v-if="index==0">第{{rank}}条</td>
            <td class='b1' :rowspan='params.children3.length' v-if="index==0">{{params.name}}</td>
            <td>{{item.name}}</td>
            <td><textarea name="" id="" class='textarea' v-model="children3[index].content"></textarea></td>
            <td :rowspan='params.children3.length' v-if="index==0"><input type="text" class='input' v-model="children2.content"  @blur="children2.content = String(children2.content)[0].replace(/[^ABC]/gi,'').toLocaleUpperCase()"></td>
        </tr>
        <tr>
            <td colspan="5">自评说明（紧扣评估细则，逐项陈述，限200字左右）</td>
        </tr>
        <tr>
            <td colspan="5" class='h1'>
                <textarea name="" class="textarea" v-model="form.achievement"></textarea>
            </td>
        </tr> 
        <!-- <tr>
            <td colspan="5">自评说明（紧扣评估细则，逐项陈述）</td>
        </tr>
        <tr>
            <td colspan="5" class='left'>主要实践和成效</td>
        </tr>
        <tr>
            <td colspan="5" class='h1'>
                <textarea name="" class="textarea" v-model="form.achievement"></textarea>
            </td>
        </tr> -->
        <!-- <tr>
            <td colspan="5" class='left'>主要不足和问题</td>
        </tr>
        <tr>
            <td colspan="5" class='h1'>
                <textarea name="" class="textarea"  v-model="form.problem"></textarea>
            </td>
        </tr>
        <tr>
            <td colspan="5" class='left'>改进措施和目标</td>
        </tr>
        <tr>
            <td colspan="5" class='h1'>
                <textarea name="" class="textarea"  v-model="form.goal"></textarea>
            </td>
        </tr> -->
    </table>
    <div class='flex-center'>
        <el-button type="primary" plain @click='submit'>确认保存</el-button>
    </div>
    <br>
    <div style='width:850px;margin-bottom:40px;'>
        <span class='tip' v-for='(item,index) in params.indexNote' :key='index'>
        {{item}}
        </span> 
    </div>
            </el-tab-pane>
            <el-tab-pane label="关键数据" name="second">
                <div class='big-title' v-if='params.children4 && params.children4.length!=0'>
        <span>
        （2）关键数据
    </span>
    </div>
    <br>
    
    <table class='xwtable' v-if='params.children4 && params.children4.length!=0'>
        <tr>
            <td class='t1'>评估要点</td>
            <td class='t2'>关键信息</td>
            <td class='t3'>数  据</td>
        </tr>
        <tbody v-if='params.children4 && params.children4.length!=0'>
            <tr v-for='(item,index) in params.children4[0].children5' :key='index' >
            <td :rowspan='params.children4[0].children5.length' v-if='index==0'>{{params.children4[0].name}}</td>
            <td>{{item.name}}</td>
            <td><input type="text" class='input' v-model="children5[index].content"></td>
            </tr>
        </tbody>
        <!-- <tbody v-if='params.children4 && params.children4.length!=0'>
            <tr v-for='(item,index) in params.children4[0].children5' :key='index' >
            <td :rowspan='params.children4[0].children5.length' v-if='index==0'>{{params.children4[0].name}}</td>
            <td>{{item.name}}</td>
            <td><input type="text" class='input' v-model="children5[index].content"></td>
            </tr>
        </tbody> -->
    </table>
    <div class='flex-center'>
        <el-button type="primary" plain @click='submit'>确认保存</el-button>
    </div>
    <br>
    
     
    <table class='table'  v-if = 'Index!==7 &&Index!==8 &&Index!==13  &&Index!==16 &&Index!==17 &&Index!==18 &&Index!==20 &&Index!==16 &&Index!==21 &&Index!==22 &&Index!==23 &&Index!==24 &&Index!==25 &&Index!==26 &&Index!==27 && Index!==29 && Index!==30 && Index!==31 && Index!==32 && Index!==33 && Index!==34 && Index!==35 && Index!==36'>
        <tr>
            <td>序号</td>
            <td>名称</td>
            <td>举办者类型</td>
            <td>在校生数目</td>
            <td>年级数</td>
            <td>班级数</td>
            <td v-for="(item,index) in tableH" :key='index'>
                {{item.title}}
            </td>
            <td v-if='tableH.length==1'>该校到达目标值的比例</td>
            <td>该校达标情况（达标/基本达标/不达标）</td>
        </tr>
        <tr v-for='(item,index) in tableData' :key='index'>
            <td>{{index+1}}</td>
            <td>{{item.collectionData[0].schoolName }}</td>
            <td>{{item.collectionData[0].runByName}}</td>
            <td>{{item.collectionData[0].studentCount}}</td>
            <td>{{item.collectionData[0].gradeCount}}</td>
            <td>{{item.collectionData[0].classCount}}</td>
            <td v-for="(ite,inde) in item.collectionData" :key='inde'>
                {{ite.content}}
            </td>
            <td v-if='tableH.length==1'>{{item.collectionData[0].result}}</td>
            <td>{{item.isSuccess?'合格' :'不合格'}}</td>
        </tr>
    </table>
    <!-- -->
    
    <div class='flex-center' style='margin-bottom:20px;'>
        <el-button type="primary" plain @click='submit'>确认保存</el-button>
    </div>
    <div style='width:850px;margin-bottom:40px;'>
        <span class='tip' v-for='(item,index) in params.indexNote' :key='index'>
        {{item}}
        </span> 
    </div>
            </el-tab-pane>
            <el-tab-pane label="佐证材料目录" name="third">
                <div class='big-title' v-if='params.type6'><span>（3）佐证材料目录</span></div>
    
    <table class='table' v-if='params.type6'>
        <tr>
            <td>序号</td>
            <td>资料名称</td>
            <td>归档方式</td>
            <td>文件上传</td>
        </tr>
        <tr v-for='(item,index) in fileList' :key='index'>
            <td>{{index+1}}</td>
            <td><input type="text" class='input' v-model="item.fileName"></td>
            <td style="width:160px;">
                 <el-select v-model="item.fileType" placeholder="请选择" style="width:100%;">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </td>
            <td @click='uploadIndex = index'>
                <el-upload
                        class="upload-demo"
                        :action="uploadUrl"
                        :on-success="handlerUploadSuccess"
                        :show-file-list="false"
                        :before-upload='beforeUpload'
                        >
                        <el-link type="primary">导入文件</el-link>
                        <br>
                        <a :href="item.filePath" target='_blank'>{{item.fileName}}</a>
                </el-upload>  
            </td>
        </tr>
    </table>
    <!-- <div class='big-title'  v-if='params.type6' >
        <span class='small-title'>按照评估要点顺序，编号上传自评说明支撑材料。如无相关支撑材料，可不上传。</span>
    </div> -->
    <div class='flex-center'>
        <el-button type="primary" plain @click='addFlie' v-if='params.type6'>新增文件</el-button>
    </div>
    <div class='flex-center'>
        <el-button type="primary" plain @click='submit'>确认保存</el-button>
    </div>
    <div style='width:850px;margin-bottom:40px;'>
        <span class='tip' v-for='(item,index) in params.fileNote' :key='index'>
        {{item}}
        </span> 
    </div>
    
            </el-tab-pane>
        </el-tabs>
        
    
    <div class='fixed' @click='submitAll'>
        <i class='el-icon-upload'></i><br>
         <span style='font-size:12px;'>提交数据</span> 
    </div>
    <!-- <div class='flex-center;'>
         <el-button type="primary" plain @click="submit">提交</el-button>
    </div> -->
   </div>
    
</template>
<script>
import {baseURL} from '@/api'
import { Loading } from 'element-ui';
export default {
    name:'one',
    props:['params','allData','tableHeader','oneData','Index','rank'],
    data(){
        return {
            uploadUrl:baseURL+'/file/'+JSON.parse(localStorage.getItem('user')).data.eduinstId+'/upload',
            children3:[],
            children5:[],
            tableH:[],
            type6:{},
            options:[
                {
                    value:'0',
                    label:'提交到评估院'
                },
                {
                    value:'1',
                    label:'留校备查'
                },
            ],
            tableData:[],
            fileList:[],
            uploadIndex:0,
            children2:{
                "content": "",
                "eduinstId": 0,
                "id": 0,
                "indexId": 0
            },
            form:{
                "achievement": "",
                "apgId": "",
                "eduinstId": 0,
                "goal": "",
                "indexId": 0,
                "problem": ""
            },
            activeName: 'first'
        }
    },
    computed:{
        
        isFile(){
            let bool = false;
            if(this.tableData[0].collectionData!==undefined){
               bool = (this.tableData[0].collectionData[0].valueType ==  'file')
            }
            return bool;
        }
    },
    watch:{
        oneData:{
            handler:function(){
                if(this.oneData!==null && this.oneData.length!==0){
                    let one  = JSON.parse(JSON.stringify(this.oneData))
                    one.forEach(target=>{
                        let data = target.collectionData.filter(tar=>{
                            return tar.indexId == this.params.id
                        })
                        target.collectionData = data
                        let bool = true;
                        target.collectionData.forEach(tar=>{
                            if(tar.result2 !=='合格'){
                               bool = false 
                            }
                        })
                        target.isSuccess = bool
                    })
                    this.tableData =one
                }
            },
            deep:true,
            immediate:true
        },
        tableHeader:{
            handler:function(){
                if(this.tableHeader!==null){
                    this.tableH = this.tableHeader.filter(target=>{
                        return target.indexId == this.params.id
                    })
                }
            },
            deep:true,
            immediate:true
        },
        allData:{
            handler:function(data){
                if(this.allData!==null){
                    this.children3.forEach(target=>{
                        data.eduinstIndexPoList.some(tar=>{
                            if(tar.indexId == target.indexId){
                                target.content = tar.content
                                target.id = tar.id
                                return true
                            }
                        })
                    });
                    this.children5.forEach(target=>{
                        data.eduinstIndexPoList.some(tar=>{
                            if(tar.indexId == target.indexId){
                                target.content = tar.content
                                target.id = tar.id
                                return true
                            }
                        })
                    })
                    data.eduinstIndexPoList.some(target=>{
                        if(target.indexId == this.children2.indexId){
                            this.children2.content = target.content;
                            this.children2.id = target.id;
                            return true
                        }
                    })
                    data.eduinstApgVoList.some(target=>{
                        if(target.indexId == this.form.indexId){
                            this.form = target;
                            return true
                        }
                    })
                    let filesList = data.eduinstFileVoList.filter(target=>{
                        return  target.indexId == this.params.id
                    })
                    if(filesList.length!==0 && filesList[0].files instanceof Array){
                        this.fileList = filesList[0].files
                    }

                }
            },
            deep:true,
            immediate:true
        },
        params:{
            handler:function(){
                if(this.params){
                    console.log(this.params)
                let eduinstId = JSON.parse(localStorage.getItem('user')).data.eduinstId
                this.children3 = this.params.children3.map(target=>{
                    return {
                        "content": "",
                        "eduinstId": eduinstId,
                        "indexId":  target.id
                    }
                })
                this.children2 = {
                    "content": "",
                    "eduinstId": eduinstId,
                    "indexId": this.params.id
                }
                this.form = {
                    "achievement": "",
                    "apgId": "",
                    "goal": "",
                    "indexId": this.params.id,
                    "problem": ""
                }
                if(this.params.children4.length!==0){
                    this.children5 = this.params.children4[0].children5.map(target=>{
                        return {
                            "content": "",
                            "eduinstId": eduinstId,
                            "indexId":  target.id
                        }
                    })
                }
                console.log(1)
                this.fileList = this.params.type6.map((target,index)=>{
                    return {
                        "fileName": target.name,
                        "filePath": target.filePath,
                        // note:''
                        "fileType":String(target.fileType),
                    }
                })
                }
            },
            deep:true,
            immediate: true
        }
    },
    methods:{
        handlerUploadSuccess(res){
            // this.fileList[this.uploadIndex].fileName = res.data.fileName
            this.fileList[this.uploadIndex].filePath = res.data.filePath
        },
        addFlie(){
            this.fileList.push({
            "fileName": "",
            "filePath": "",
            // note:''
            "fileType":"",
        })
        },
        beforeUpload(){},
        submitAll(){
            let params = {
                 "eduinstId": JSON.parse(localStorage.getItem('user')).data.eduinstId,
                 "indexId":this.params.id
            }
            this.$api.collectionSubmit(params).then(res=>{
                this.$message({
                    type:'sucess',
                    message:res.msg
                })
            }).catch(err=>{
                this.$message({
                    type:'error',
                    message:err.msg
                })
            })
        },
        submit(){
            let loadingInstance1 = Loading.service({ fullscreen: true });
            let eduinstIndexPoList = [];
            eduinstIndexPoList = eduinstIndexPoList.concat(this.children2)
            eduinstIndexPoList = eduinstIndexPoList.concat(this.children3)
            eduinstIndexPoList = eduinstIndexPoList.concat(this.children5)
            let params = {
                 "eduinstIndexPoList": eduinstIndexPoList,
                 "eduinstId": JSON.parse(localStorage.getItem('user')).data.eduinstId,
                ...this.form,
                files:this.fileList.map(target=>{
                    return {
                        ...target,
                         "eduinstId": JSON.parse(localStorage.getItem('user')).data.eduinstId,
                         "indexId": this.params.id
                    }
                })
            }
            this.$api.eduinstIndexCreate(params).then(res=>{
                this.$message({
                    type:'success',
                    message:res.msg
                })
                loadingInstance1.close();
                this.$router.go(0)
            }).catch(err=>{
                loadingInstance1.close();
            })
        }
    },
    mounted(){
        // this.fileList.push({
        //     "fileName": "",
        //     "filePath": "",
        //     note:''
        // })
    }
}
</script>
<style lang="less" scoped>
Button{
    margin: 10px 0 10px 0;
}
.tip{
    display: inline-block;
    font-size: 12px;
    // width:50%;
}
.fixed{
   position: fixed;
    width:60px;
    height:60px;
    right:30px;
    bottom:80px;
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
.small-title{
    font-size:12px;
}
.flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
}
.big-title{
    width:100%;
    display: flex;
    justify-content: space-between;
}
.note{
    border:none;
    outline: none;
    width:100%;
    height:100%;
    text-align: center;
}
.table{
        width:853px;
        border-collapse: collapse;
        border: 1px solid #747474;
        tr {background: #fff;font-size: 12px;color: #0a0a0a;}  
        td{min-width:60px;line-height:20px;text-align: center;height:40px;border: 1px solid #070707;} 
  
    }
.xwtable{
    border-collapse: collapse;
    border: 1px solid #747474;
    tr {background: #fff;font-size: 12px;color: #0a0a0a;}  
    td{width:150px;line-height:20px;text-align: center;height:40px;border: 1px solid #070707;} 
    .s1{
        width:100px;
    }
    .b1{
        width:300px;
        height:120px;
    } 
    .h1{
        height:200px;
    }
    .left{
        text-align: left;
    }
    .t1{width:280px;}
    .t2{width:340px;}
    .t3{width:230px;}
    .td2{
       
        height:120px;
    }
    
}
.std{
        td{
            width:100px;
        }
    }
.textarea{
    width:90%;
    height:80%;
    border:none;
    outline: none;
    resize:none;
}
.input{
     width:80%;
    height:80%;
    border:none;
    outline: none;
    text-align: center;
}

</style>


