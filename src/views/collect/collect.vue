<template>
    <div class='flex-center' v-loading='loading'>
        <one :params='params' :allData='allData' :tableHeader='tableHeader' :oneData='oneData' :Index='params.Index' :rank='rank'></one>
    </div>
</template>
<script>
import one from '@/views/userMana/index/tables/one'
export default {
    name:'collect',
    data(){
        return {
            tableData:[],
            allData:null,
            tableHeader:null,
            oneData:null,
            params:{},
            loading:false,
        }
    },
    computed:{
        id(){
            return this.$route.query.id
        },
        rank(){
            return this.$route.query.rank
        }
    },
    watch:{
        id(){
            this.init()
            window.scrollTo(0,0)
        }
    },
    components:{
        one
    },
    methods:{
        init(){
            this.loading = true
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
                    target.type6 = [];
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
                            tar.type6.push(target)
                        }
                    })
                })
                this.tableData = type
                type.some(target=>{
                    if(target.id == this.$route.query.id){
                        this.params = target
                        return true;
                    }
                })
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
                this.loading = false
            })
        }
    },
    mounted(){
        this.init()
    },
}
</script>
<style lang="less" scoped>
.flex-center{
    display: flex;
    justify-content: center;
}
</style>