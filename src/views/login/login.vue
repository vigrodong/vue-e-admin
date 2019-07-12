<template>
    <div class="container">
        <div class="form-box">
            <span class="title">优质均衡</span>
            <div class='m-input'>
                <i class="el-icon-s-custom"></i>
                 <input type="text" class="s-input" v-model="admin">
            </div>
            <div class='m-input'>
                <i class="el-icon-lock"></i>
                 <input type="password" class="s-input" v-model="psd" @keypress="keyPress($event)">
            </div>
            <el-button @click="submit" type="primary" style="width:428px;height:45px; margin-top:15px;">登录</el-button>
           
        </div>
    </div>
</template>
<script>
export default {
    name:'login',
    data(){
        return {
            admin:'',
            psd:''
        }
    },
    methods:{
        keyPress(e){
            if(e.keyCode == 13){
                this.submit()
            }
        },
        submit(){
            let params = {
                username:this.admin,
                passwd:this.psd
            }
            console.log(params);
            this.$router.push({name:'about'})
        },
    }
}
</script>
<style lang="less" scoped>
.s-input{
            background:none;
            outline:none;
            border:none;
            color:white;
            height:100%;
            width:80%;
            margin-left: 20px;
}
.m-input{
    width:80%;
    padding: 0 15px;
    height:45px;
    margin: 15px 0;
    background-color: #242E3B;
    border:1px solid #363F4C;
    display: flex;
    align-items: center;
}
.container{
    width:100%;
    height:100%;
    background-color: #283342;
    display: flex;
    justify-content: center;
    .form-box{
        width: 500px;
        height:400px;
        margin-top:100px;
        display: flex;
        justify-content: center;
        align-items: center;
        color:#EAEAEA;
        flex-direction:column;
        .title{
            font-size: 32px;
        }
    }
}
</style>


