<template>
    <div class="container">
        <base1></base1> 
        <self></self>
        <selfResult></selfResult>
        <!-- <div v-for='(item,index) in tableData' :key='index'>
            <one v-for='(ite,inde) in item.children' :key='inde' :params='ite' :orign='item' :Index="inde"></one>
        </div> -->
        <one v-for='(item,index) in tableData' :key='index' :params='item' :allData='allData'></one>
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
                // console.log(type5)

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

                this.tableData = type
                this.$nextTick(()=>{
                    this.$api.eduinstIndexList({eduinstId:JSON.parse(localStorage.getItem('user')).data.eduinstId}).then(res=>{
                        console.log(res);
                        this.allData =res.data
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


