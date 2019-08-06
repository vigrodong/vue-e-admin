<template>
    <div class="container">
        <div>

        </div>
        <h3>{{params.bigName}}</h3>
        <table class="xwtable">
        <tr>
            <td colspan="2">主要指标</td>
            <td>评估要点</td>
            <td>数值或简要结论</td>
            <td>自评等级（A/B/C）</td>
        </tr>
        <tr v-for="(item,index) in params.children3" :key='index'>
            <td class='s1' :rowspan='params.children3.length' v-if="index==0">第{{params.Index}}条</td>
            <td class='b1' :rowspan='params.children3.length' v-if="index==0">{{params.name}}</td>
            <td>{{item.name}}</td>
            <td><textarea name="" id="" class='textarea' v-model="children3[index].content"></textarea></td>
            <td :rowspan='params.children3.length' v-if="index==0"><input type="text" class='input' v-model="children2.content"></td>
        </tr>
        <tr>
            <td colspan="5">自评说明（紧扣评估细则，逐项陈述）</td>
        </tr>
        <tr>
            <td colspan="5" class='left'>主要实践和成效</td>
        </tr>
        <tr>
            <td colspan="5" class='h1'>
                <textarea name="" class="textarea" v-model="form.achievement"></textarea>
            </td>
        </tr>
        <tr>
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
        </tr>
    </table>
    <br>
    <table class='xwtable'>
        <tr>
            <td class='t1'>评估要点</td>
            <td class='t2'>关键信息</td>
            <td class='t3'>数  据</td>
        </tr>
        <tr v-for='(item,index) in params.children4[0].children5' :key='index'>
            <td :rowspan='params.children4[0].children5.length' v-if='index==0'>{{params.children4[0].name}}</td>
            <td>{{item.name}}</td>
            <td><input type="text" class='input' v-model="children5[index].content"></td>
        </tr>
        
    </table>
    <table class='table'>
        
    </table>

    <el-button type="primary" plain @click="submit">提交</el-button>
    </div>
    
</template>
<script>
export default {
    name:'one',
    props:['params','allData'],
    data(){
        return {
            children3:[],
            children5:[],
            children2:{
                "content": "string",
                "eduinstId": 0,
                "id": 0,
                "indexId": 0
            },
            form:{
                "achievement": "string",
                "apgId": "string",
                "eduinstId": 0,
                "goal": "string",
                "indexId": 0,
                "problem": "string"
            },
        }
    },
    watch:{
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

                }
            },
            deep:true,
            immediate:true
        },
        params:{
            handler:function(){
                if(this.params){
                let eduinstId = JSON.parse(localStorage.getItem('user')).data.eduinstId
                this.children3 = this.params.children3.map(target=>{
                    return {
                        "content": "string",
                        "eduinstId": eduinstId,
                        "id": 0,
                        "indexId":  target.id
                    }
                })
                this.children2 = {
                    "content": "",
                    "eduinstId": eduinstId,
                    "id": 0,
                    "indexId": this.params.id
                }
                this.form = {
                    "achievement": "string",
                    "apgId": "string",
                    "eduinstId": 0,
                    "goal": "string",
                    "indexId": this.params.id,
                    "problem": "string"
                }
                if(this.params.children4.length!==0){
                    this.children5 = this.params.children4[0].children5.map(target=>{
                        return {
                            "content": "string",
                            "eduinstId": eduinstId,
                            "id": 0,
                            "indexId":  target.id
                        }
                    })
                }
                }
            },
            deep:true,
            immediate: true
        }
    },
    methods:{
        submit(){
            let eduinstIndexPoList = [];
            eduinstIndexPoList = eduinstIndexPoList.concat(this.children2)
            eduinstIndexPoList = eduinstIndexPoList.concat(this.children3)
            eduinstIndexPoList = eduinstIndexPoList.concat(this.children5)
            let params = {
                 "eduinstIndexPoList": eduinstIndexPoList,
                ...this.form
            }
            this.$api.eduinstIndexCreate(params).then(res=>{
                console.log(res);
                this.$message({
                    type:'success',
                    message:res.msg
                })
            })
        }
    },
    mounted(){
    }
}
</script>
<style lang="less" scoped>
.table{
        border-collapse: collapse;
        border: 1px solid #747474;
        tr {background: #fff;font-size: 12px;color: #0a0a0a;}  
        td{min-width:150px;line-height:20px;text-align: center;height:40px;border: 1px solid #070707;} 
  
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


