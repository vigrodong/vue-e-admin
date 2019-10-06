<template>
    <div class='gh' v-loading='loading'>
        <h3>七、县域义务教育发展规划及论证报告、上级教育部门批复</h3>
        <table class='table'>
            <tr>
                <td style="height:600px">
                    <textarea  class='textarea' style='resize:none; '></textarea>
                </td>
            </tr>
            <tr>
                <td>附件目录</td>
            </tr>
            <tr>
                <td style="height:200px">
                     <textarea  class='textarea' style='resize:none; '></textarea>
                </td>
            </tr>
        </table>
        <el-button type="primary" plain @click='submit'>确认保存</el-button>
    </div>
</template>
<script>
export default {
    name:'gh',
    data(){
        return {
            form:{
                eduinstId:JSON.parse(localStorage.getItem('user')).data.eduinstId,
                content:''
            },
            loading:false
        }
    },
    methods:{
        submit(){
            this.loading = true
            console.log(this.form)
            this.$api.ghCreate(this.form).then(res=>{
                this.loading = false
                this.$message({
                    type:'success',
                    message:res.msg
                })
            })
        }
    },
    mounted(){
        // this.loading = true
        // this.$api.ghQuery({ eduinstId:JSON.parse(localStorage.getItem('user')).data.eduinstId}).then(res=>{
        //     console.log(res)
        //     this.loading = false
        //     if(res.data){
        //         this.form.content = res.data.content;
        //         this.form.id = res.data.id;
        //     }
            
        // })
    }
}
</script>
<style lang="less" scoped>
.textarea{
        width:98%;
        height:96%;
        border:none;
        outline: none;
    }
.gh{
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
        td{min-width:60px;line-height:20px;text-align: center;height:40px;border: 1px solid #070707;} 
  
    }
}
</style>