<template>
    <div class="container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="义务教育优质均衡发展县（市、区）基本情况" name="first" style='margin-bottom:40px;'>
                <base1></base1> 
            </el-tab-pane>
            <el-tab-pane label="自评报告" name="second" style='margin-bottom:40px;'>
                <self></self>
            </el-tab-pane>
            <!-- <el-tab-pane label="评估指标自评结果" name="third" style='margin-bottom:40px;'>
                <selfResult :tableHeader='tableData'></selfResult>
            </el-tab-pane> -->
        </el-tabs>
        
        
        
        <!-- <div v-for='(item,index) in tableData' :key='index'>
            <one v-for='(ite,inde) in item.children' :key='inde' :params='ite' :orign='item' :Index="inde"></one>
        </div> -->
        <!-- <one v-for='(item,index) in tableData' :key='index' :params='item' :allData='allData' :tableHeader='tableHeader' :oneData = 'oneData' :Index='index'></one> -->
    </div>
</template>
<script>
import base1 from './tables/base1'
import self from './tables/self'
import selfResult from './tables/selfResult'
import one from './tables/one'
import collections from './tables/collectionTable'
export default {
    name:'index',
    data(){
        return {
            tableData:[],
            allData:null,
            tableHeader:null,
            oneData:null,
            activeName: 'first'
        }
    },
    mounted(){
        this.resData();
    },
    methods:{
        resData(){
            this.$api.indexTable().then(res=>{
                let data = res.data
                let type1 = data.filter(target=>{
                    return target.type == 1
                }).map(target=>{
                    target.children2 = [];
                    return target;
                });
                let type2 = data.filter(target=>{
                    return target.type == 2
                }).map(target=>{
                    target.children3 = [];
                    target.children4 = [];
                    return target;
                });
                let type3 = data.filter(target=>{
                    return target.type == 3
                })
                let type4 = data.filter(target=>{
                    return target.type == 4
                }).map(target=>{
                    target.children5 = [];
                    return target;
                });
                let type5 = data.filter(target=>{
                    return target.type == 5
                })
                let type6 = data.filter(target=>{
                    return target.type == 6
                })

                type5.forEach(target=>{
                    type4.some(tar=>{
                        if(target.parentId == tar.id){
                            tar.children5.push(target);
                            return true
                        }
                    })
                })
                type3.forEach(target=>{
                    type2.some(tar=>{
                        if(target.parentId == tar.id){
                            tar.children3.push(target);
                            return true
                        }
                    })
                })

                type2.forEach(target=>{
                    type1.some(tar=>{
                        if(target.parentId == tar.id){
                            tar.children2.push(target);
                            return true
                        }
                    })
                })
                type4.forEach(target=>{
                    type2.some(tar=>{
                        if(target.parentId == tar.id){
                            tar.children4.push(target);
                            return true
                        }
                    })
                })
                let type = []
                type1.forEach(target=>{
                    target.children2.forEach((tar,index)=>{
                        tar.bigName = target.name
                        tar.Index = index+1
                        type.push(tar)
                    })
                })

                type6.forEach(target=>{
                    type2.some(tar=>{
                        if(tar.id == target.parentId){
                            tar.type6 = target
                        }
                    })
                })
                this.tableData = type
                this.$nextTick(()=>{
                    this.$api.eduinstIndexList({eduinstId:JSON.parse(localStorage.getItem('user')).data.eduinstId}).then(res=>{
                       
                        this.allData =res.data
                    })
                    this.$api.collectionList({eduinstId:JSON.parse(localStorage.getItem('user')).data.eduinstId}).then(res=>{
                        
                        this.tableHeader = res.data
                    })
                    this.$api.schoolCollectionList({eduinstId:JSON.parse(localStorage.getItem('user')).data.eduinstId}).then(res=>{
                        this.oneData  = res.data
                    })
                })
            })
        }
    },
    components:{
        base1,
        self,
        selfResult,
        one,
        collections
    }
}
</script>
<style lang="less" scoped>
.container{
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>


