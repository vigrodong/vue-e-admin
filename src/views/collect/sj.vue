<template>
    <div class='sj' v-loading='loading'>
        <h3>五、数据相关情况说明</h3>
        <table class='table'>
           <tr>
               <td style='height:1000px;'>
                   <textarea  class='textarea' v-model="form.content"></textarea>
               </td>
           </tr>
        </table>
        <span>
            注：1.请与督导室统一计算的差异系数进行对比，若计算结果与之不一致，请逐项简要陈述差异来源和数据拆分情况。
        </span>
        <span>2.其他需要说明的情况可按指标顺序依次陈述。</span>
        <el-button type="primary" plain @click='submit'>确认保存</el-button>
    </div>
</template>
<script>
export default {
    name:'sj',
    data(){
        return {
            form:{
                eduinstId:JSON.parse(localStorage.getItem('user')).data.eduinstId,
                content:''
            },
            loading:true
        }
    },
    methods:{
        submit(){
            this.loading = true
            console.log(this.form)
            this.$api.sjxgCreate(this.form).then(res=>{
                this.loading = false
                this.$message({
                    type:'success',
                    message:res.msg
                })
            })
        }
    },
    mounted(){
        this.loading = true
        this.$api.sjxgQuery({ eduinstId:JSON.parse(localStorage.getItem('user')).data.eduinstId}).then(res=>{
            console.log(res)
            this.loading = false
            if(res.data){
                this.form.content = res.data.content;
                this.form.id = res.data.id;
            }
            
        })
    }
}
</script>
<style lang="less" scoped>
.textarea{
        width:98%;
        height:96%;
        border:none;
        outline: none;
        resize: none;  
    }
.sj{
    padding-top: 30px;
    padding-bottom: 30px;
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    
    .table{
        width:853px;
        border-collapse: collapse;
        border: 1px solid #747474;
        tr {background: #fff;font-size: 12px;color: #0a0a0a;}  
        td{min-width:60px;line-height:20px;text-align: center;height:40px;border: 1px solid #070707;
        display: flex;
        justify-content: center;
        align-items: center;
        } 
  
    }
}
</style>