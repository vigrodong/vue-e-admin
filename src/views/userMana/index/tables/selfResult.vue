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
                <td>{{item.level}}</td>
                <td>{{item.content}}</td>
            </tr>
            <tr>
                <td>合计</td>
                <td colspan="2">
                    特色鲜明/一般/无特色（三选一）
                </td>
            </tr>
            <tr>
                <td>合计</td>
                <td colspan="2">
                    {{totalA}}条A/
                    {{totalB}}条B/
                    {{totalB}}条C/
                </td>
            </tr>
        </table>
        <span style="display:inline-block;width:800px;">
            注：1.根据实际情况按序号填写相应自评等级。
            <br>
            2.自评等级按照单项指标达标程度分达标（A），未完全达标（B）,不达标（C）三级。其中，13项指标达标程度仅分为达标（A），不达标（C）两级。
            <br>
            3.“达标（A）”是指该评估指标的所有评估要点达到评估细则中A级的标准要求；“未完全达标（B）”是指该评估指标的所有评估要点不完全符合评估细则中A级的标准要求；“未完全达标（B）”是指该评估指标的所有评估要点不完全符合评估细则中A级的标准要求又无C级所列任一一种情形，“不达标（C）”指该评估指标的所有评估要点中存在C级所列情形。
            <br>
            4.35条评估指标的评估要点确定，标准要求及内涵剖析参见《江苏省义务教育优质均衡发展县（市，区）评估细则》及《江苏省义务教育优质均衡发展县（市，区）评估指标内涵解读》。
        </span>
        <div class="flex-center">
        </div>
        
    </div>
</template>
<script>
export default {
    name:'selfResult',
    props:['tableHeader'],
    data(){
        return {
            tableList:[],
            totalA:0,
            totalB:0,
            totalC:0,
        }
    },
    methods:{
        
    },
    watch:{
       tableHeader:{
           handler:function(){
               if(this.tableHeader!=null){
                    this.tableList = this.tableHeader.map(target=>{
                        return {
                            id:target.id,
                            level:'',
                            content:''
                        }
                    })
                    this.$api.eduinstIndexList({eduinstId:JSON.parse(localStorage.getItem('user')).data.eduinstId}).then(res=>{
                        console.log(333,res)
                        this.tableList.forEach(target=>{
                            res.data.eduinstApgVoList.some(tar=>{
                                if(tar.indexId ==target.id){
                                    target.content = '主要实践和成效:'+tar.achievement +'主要不足和问题:'+tar.problem+'改进措施和目标'+tar.goal
                                    return true
                                }
                            })
                            res.data.eduinstIndexPoList.some(tar=>{
                                if(tar.indexId ==target.id){
                                    target.level = tar.content
                                    if(tar.content =='A'){
                                        this.totalA++
                                    }
                                    if(tar.content =='B'){
                                        this.totalB++
                                    }
                                    if(tar.content =='C'){
                                        this.totalC++
                                    }
                                    return true
                                }
                            })
                        })
                    })
               }
           },
           deep:true
       }, 
    },
    mounted(){

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
             width:225px;
         } 
         .t2{
             width:225px;
         }   
         .t3{
             width:400px;
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


