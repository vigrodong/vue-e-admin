<template>
    <div class='container'>
         <h3>（三）评估指标自评结果</h3>
        <table class="xwtable">
            <tr>
                <td class="t1">指标序号</td>
                <td class="t2">自评等级（A/B/C）</td>
                <td class="t3">自评说明（紧扣评估细则）</td>
            </tr>
            <tr v-for='(item,index) in tableList' :key="index">
                <td>第{{index+1}}条</td>
                <td><input type="text" class="text" v-model="item.level"></td>
                <td><input type="text"  class="text" v-model="item.centent"></td>
            </tr>
            <tr>
                <td>共计</td>
                <td colspan="2">

                </td>
            </tr>
        </table>
        <div class="flex-center">
             <el-button type="primary" @click="addCol">添加新行</el-button>
             <el-button type="danger" @click="deleteCol">删除新行</el-button>
             <el-button type="primary" plain @click='submit'>提交</el-button>
        </div>
        
    </div>
</template>
<script>
export default {
    name:'selfResult',
    data(){
        return {
            tableList:new Array(30).fill('').map(target=>{
                return {
                    level:'',
                    centent:''
                }
            })
        }
    },
    methods:{
        addCol(){
            this.tableList.push({
                level:'',
                centent:''
            })
        },
        deleteCol(){
            this.tableList.pop(); 
        },
        submit(){}
    }
}
</script>
<style lang="less" scoped>
.flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
}
.container{
    .xwtable{
        // width:400px;
        border-collapse: collapse;
        border: 1px solid #747474;
         tr {background: #fff;font-size: 12px;color: #0a0a0a;}  
         td{width:200px;line-height:20px;text-align: center;height:40px;border: 1px solid #070707;}  
         .t1{
             width:160px;
         } 
         .t2{
             width:160px;
         }   
         .t3{
             width:320px;
         }       
    }
    .text{
        border:none;
        width:100%;
        height:100%;
        text-align: center;
    }
}
</style>


