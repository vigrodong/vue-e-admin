<template>
    <div class="container">
        <div class="form-box">
            <span class="title">江苏省义务教育优质均衡发展评估系统</span>
            <div class='m-input'>
                <i class="el-icon-s-custom" style="color:#46A0FC"></i>
                 <input type="text" class="s-input" v-model="admin">
            </div>
            <div class='m-input'>
                <i class="el-icon-lock" style="color:#46A0FC"></i>
                 <input type="password" class="s-input" v-model="psd" @keypress="keyPress($event)">
            </div>
            <el-button @click="submit" type="primary" style="width:428px;height:45px; margin-top:15px;">登录</el-button>
           
        </div>
        <footer class="footer">
            <p>技术支持:苏州码农云科技有限公司 监制:江苏省教育评估院</p>
            <p>版权所有:©江苏经贸职业技术学院(江苏商业管理干部学院) 苏ICP备05067739号-3</p>
            <p>江宁校区:江宁大学城龙眠大道180号 211168 光华校区:南京市光华路石门坎104号 21007</p>
        </footer>
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
            this.$api.login(params).then(res=>{
                localStorage.setItem('sid',res.data.sid)
                localStorage.setItem('user',JSON.stringify(res))
                this.$router.push({name:'about'})
            }).catch(err=>{

            })
            
        },
    }
}
</script>
<style lang="less" scoped>
.s-input{
            background:none;
            outline:none;
            border:none;
            color:#1788F8;
            height:100%;
            width:80%;
            margin-left: 20px;
}
.m-input{
    width:400px;
    padding: 0 15px;
    height:45px;
    margin: 15px 0;
    background-color: white;
    border:1px solid #363F4C;
    display: flex;
    align-items: center;
}
.container{
    width:100%;
    height:100%;
    background-color: #283342;
    background-image: url('../../bg.png');
    display: flex;
    justify-content: center;
    .form-box{
        width: 600px;
        height:400px;
        margin-top:100px;
        display: flex;
        justify-content: center;
        align-items: center;
        color:#EAEAEA;
        flex-direction:column;
        .title{
            color:white;
            font-size: 32px;
        }
    }
}
.footer{
    width:100%;
    position: fixed;
    color:white;
    left:0;
    bottom:0;
    display: flex;
    justify-content: center;
    flex-direction:column;
    align-items: center;
}
</style>


