<template>
    <div class="container">
        <span class="title">江苏省义务教育优质均衡发展评估系统</span>
        <div class="form-box">
            <!--  -->
            <div class='div-title'>
               <span style='display:inline-block;margin-left:50px;'>用户登录</span> 
            </div>
            <div class='img-box'>
                <img src="@/assets/aiwrap.png" alt="">
            </div>
            <div class='m-input'>
                <i class="el-icon-s-custom" style="color:#46A0FC"></i>
                 <input type="text" class="s-input" v-model="admin">
            </div>
            <div class='m-input'>
                <i class="el-icon-lock" style="color:#46A0FC"></i>
                 <input type="password" class="s-input" v-model="psd" @keypress="keyPress($event)">
            </div>
            <el-button @click="submit" type="primary" style="width:332px;height:45px; margin-top:15px;">登录</el-button>
           
        </div>
        <footer class="footer">
            <!-- <p>技术支持:苏州码农云科技有限公司 监制:江苏省教育评估院</p> -->
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
@left:-136px;
.img-box{
    margin-left: @left;
    width:300px;
    margin-top: -8px;
}
.div-title{
    width:300px;
    height:50px;
    margin-left: @left;
    background: #1478EB;
    color:white;
    line-height: 50px;
}
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
    width:300px;
    padding: 0 15px;
    height:45px;
    margin: 15px 0;
    background-color: white;
    border:1px solid #DEE0E1;
    display: flex;
    align-items: center;
    color:#826F71;
}
.container{
    width:100%;
    height:100%;
    background-image: url('../../bg.png');
    .title{
            color:white;
            font-size: 32px;
            display: inline-block;
            width:100%;
            margin-top: 50px;
            text-align: center;
            font-weight: 700px;
        }
    // display: flex;
    // justify-content: center;
    .form-box{
        width: 400px;
        height:400px;
        margin-top:100px;
        margin: 50px auto 0 auto;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        color:#EAEAEA;
        flex-direction:column;
        
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


