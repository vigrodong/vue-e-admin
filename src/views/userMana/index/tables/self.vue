<template>
    <div class='container'>
        <h3>（二）自评报告</h3>
        <div class='top'>
            内容：重点评估县级人民政府及职能部门主动履职、落实国家相关政策、高标准均衡配置义务教育资源、整体提高义务教育质量等方面的举措和成效，以及存在的问题和对策。
            <textarea class='area' v-model="form.content"></textarea>
            <div class="t1">
                <div class="per flex-center">负责人签字<input type="text" class="time" v-model="form.contentName"></div>
                <div class="per flex-center"> 县（市、区）人民政府（盖章）</div>
            </div>
            <div class="t2 flex-center"><input type="text" class="time" v-model="cy">年<input type="text" class="time" v-model="cm">月 <input type="text" class="time" v-model="cd">日</div>
        </div>
        <div class='botm'>
            <div class='left'>
                市
                级
                复
                核
                意
                见
            </div>
            <div class='right '>
                 <textarea class='area1' v-model="form.note"></textarea>
                    <div class="r">
                        <div class="rc flex-center">
                            负责人签字<input type="text" class="time" v-model="form.noteName">
                        </div>
                        <div class="rc flex-center">
                             市教育局（盖章）
                        </div>
                    </div> 
                    <div class="r-t flex-center">
                       <input type="text" class="time" v-model="ny">年<input type="text" class="time" v-model="nm">月 <input type="text" class="time" v-model="nd">日 
                    </div> 
            </div>
        </div>
        <el-button type="primary" plain @click='submit'>确认保存</el-button>
    </div>
</template>
<script>
const defForm  = {
  "content": "",
  "contentName": "",
  "createTime": 0,
  "eduinstId": 0,
  "note": "",
  "noteTime": 0,
  "noteName": "",
}
export default {
    mounted(){
        this.$api.baseEvaluationFind({eduinstId:JSON.parse(localStorage.getItem('user')).data.eduinstId}).then(res=>{
            console.log(res);
            if(res.data ===null){
                this.api = 'baseEvaluationCreate'
            }else{
                let time1 = new Date(res.data.createTime);
                let time2 = new Date(res.data.noteTime);
                this.cy = time1.getFullYear();
                this.cm = time1.getMonth()+1;
                this.cd = time1.getDate();
                this.ny = time2.getFullYear();
                this.nm = time2.getMonth()+1;
                this.nd = time2.getDate();
                this.form = {
                    ...this.form,
                    ...res.data
                }
                this.api = 'baseEvaluationUpdate'
            }
            
        })
    },
    name:'self',
    data(){
        return {
            api:'baseEvaluationCreate',
            cy:'',
            cm:'',
            cd:'',
            ny:'',
            nm:'',
            nd:'',
            form:{
                ...defForm
            }
        }
    },
    methods:{
        submit(){
            let params = this.form;
            params.eduinstId = JSON.parse(localStorage.getItem('user')).data.eduinstId
            params.createTime = new Date(new Date(new Date().setYear(this.cy)).setMonth(this.cm-1)).setDate(this.cd)
            params.noteTime = new Date(new Date(new Date().setYear(this.ny)).setMonth(this.nm-1)).setDate(this.nd)
            this.$api[this.api](params).then(res=>{
                this.$message({
                    type:'success',
                    message:res.msg
                })
                this.$router.go(0)
            })
        }
    }
}
</script>
<style lang="less" scoped>
textarea{
    resize: none;
}
.flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
}
.time{
        border: none;
        width:50px;
        height:30px;
        text-align: right;
        font-size:14px;
    }
.container{
    font-size:14px;
    
    .top{
        width:850px;
        height:500px;
        border: 1px solid #747474;
        position: relative;
        .area{
            display: inline-block;
            margin: 0 0 0 3px;
            width:840px;
            height:370px;
            border:none;
            outline: none;
        }
        .t1{
            width:100%;
            height:45px;
            position: absolute;
            left:0;
            bottom: 45px;
            display: flex;
            .per{
                width:50%;
                height:100%;
            }
        }
        .t2{
            width:100%;
            height:45px;
            position: absolute; 
            left:0;
            bottom: 0;
            
        }
    }
    .botm{
        display: flex;
        .left{
           border-left: 1px solid #747474; 
           border-right: 1px solid #747474; 
           border-bottom: 1px solid #747474; 
           width:211px;
           height:300px;
           writing-mode:tb-rl;
           text-align: center;
           line-height: 211px;
        }
        .right{
           border-right: 1px solid #747474; 
           border-bottom: 1px solid #747474; 
           width:639px;
           height:300px; 
           position: relative;
           .r{
               width:100%;
               height:38px;
               position: absolute;
               left:0;
               bottom: 40px;
               display: flex;
               .rc{
                   width:50%;
                   height:100%;
               }
           }
           .r-t{
               position: absolute;
                width:100%;
               height:38px;
               left:0;
               bottom: 0px;
           }
           .area1{
               width:596px;
               border:none;
               outline:none;
               height:220px;
           }
        }
    }
}
</style>


