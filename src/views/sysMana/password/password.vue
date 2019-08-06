<template>
    <div class="container">
        <h3>密码修改</h3>
        <br>
        <el-form :label-position="labelPosition" ref="form" label-width="120px" :model="form" :rules="rules">
            <el-form-item label="当前登录账号" prop="name">
                <el-input v-model="form.name" class="input"></el-input>
            </el-form-item>
            <el-form-item label="当前密码" prop="oldPassword">
                <el-input v-model="form.oldPassword" class="input"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="form.newPassword" class="input"></el-input>
            </el-form-item>
            <el-form-item label="再次输入" prop="psd">
                <el-input v-model="form.psd" class="input"></el-input>
            </el-form-item>
            <el-form-item >
               <el-button type="primary" @click="submit">主要按钮</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>
<script>
const defaultForm = {
    oldPassword:'',
    newPassword:'',
    name:'',
    psd:''
}
export default {
    name:'password',
    data(){
        return {
            rules:{
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                ],
                oldPassword: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' },
                ],
                psd: [
                    { required: true, message: '请确认新密码', trigger: 'blur' },
                ],
            }    
            ,
            labelPosition: 'right',
            form:{
                ...defaultForm
            },
        }
    },
    methods:{
        submit(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    if(this.form.psd!==this.form.newPassword){
                        this.$message.error('两次密码不一致');
                        return;
                    }   
                    let params = {
                            oldPasswd:this.form.oldPassword,
                            newPassword:this.form.newPassword,
                    }
                    console.log(params);
                } else {
                    return false;
                }
            });

            
        }
    },
    mounted(){
        console.log(this.$route)
    }
}
</script>
<style lang="less" scoped>
.container{
    padding: 20px;
    display: flex;
     width:calc(100%-40px);
    flex-direction:column;
    justify-content: center;
    
    .input{
        width:300px;
    }
}
</style>


