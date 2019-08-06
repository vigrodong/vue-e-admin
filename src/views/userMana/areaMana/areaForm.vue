<template>
    <div class="container">
        <el-form label-width="130px" >
            <el-form-item label="所属市">
                 <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="新添加县的名字">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            </el-form>
            <div class="flex-center">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="cancel">返回</el-button>
            </div>
    </div>
</template>
<script>
const defaultForm = {
    name:'',
}
export default {
    name:"areaForm",
    mounted(){
        this.$api.getCityList().then(res=>{
                this.options = res.data.map(target=>{
                    return {
                        ...target,
                        label:target.name,
                        value:target.id
                    }
                })
            })
    },
    methods:{
        save(){
            this.$emit('close')
        },
        cancel(){
            this.$emit('close')
        },
    },
    data(){
        return {
            form:{...defaultForm},
            options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
                }],
            value: ''
        }
    }
}
</script>
<style lang="less" scoped>
.flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>


