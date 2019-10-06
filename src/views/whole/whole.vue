<template>
    <div class="whole">
        <div class="top-menu">
           <div class='title'> <h2>江苏省义务教育优质均衡发展评估系统</h2> </div>
            <div class="avtor-box">
                <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link" style='color:white;'>
                     {{user.realName}}
                <i class="el-icon-platform-eleme avtor"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="editPsd">修改密码</el-dropdown-item>
                    <el-dropdown-item command="layout">退出</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </div>
            
        </div>
        <div class="b-box">
            <div class="left-menu">
                <el-menu  class="el-menu-vertical-demo" @select="selectMenu" :collapse="isCollapse" :unique-opened='true'>
                 
                    <el-submenu :index="String(item.url)" v-for="(item,index) in menus" :key='index'>
                        <template slot="title">
                            <i :class="[item.icon]"></i>
                            <span slot="title">{{item.name}}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(it,ind) in item.childMenu" :index="String(it.url)" :key="ind" @click='getId(it.id,it.rank)'>{{it.name}}
                                <span style='font-size:12px;' v-if='it.commit!==undefined && it.commit'>已提交</span><i class='el-icon-success' style='color:#5CBA33;' v-if='it.commit!==undefined && it.commit'></i>
                                <span style='font-size:12px;' v-if='it.commit!==undefined && !it.commit'>未填写</span><i class='el-icon-error' style='color:red' v-if='it.commit!==undefined && !it.commit'></i>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </div>
            <div class="view">
                <router-view></router-view>
            </div>
        </div>
        <!-- <router-view></router-view> -->
    </div>
    
</template>
<script>
function getUuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
}
export default {
    name:'whole',
    data(){
        return {
            isCollapse:false,
            menus:[],
            user:{},
            id:'',
            rank:''
        }
    },
    mounted(){
        let menuList = [];
        this.$api.getMenus().then(res=>{
            // this.menus = res.data;
            menuList = menuList.concat(res.data)
            if(JSON.parse(localStorage.getItem('user')).data.role.includes(1)){
                this.menus = menuList
                return;
            }
            this.$api.getMenuindexList({eduinstId:JSON.parse(localStorage.getItem('user')).data.eduinstId}).then(res=>{
                let data = JSON.parse(JSON.stringify(res.data))
                let arr1 = data.filter(target=>target.level==1).map(target=>{
                    target.childMenu = []
                    target.url = getUuid()
                    target.icon = 'el-icon-menu'
                    return target
                })
                data = JSON.parse(JSON.stringify(res.data))
                console.log(data)
                let arr2 = data.filter(target=>target.level==2).map(target=>{
                    target.url = 'collectionWrite'
                    return target
                })
                arr2.sort((a,b)=>{
                    return a.rank -b.rank
                })
                console.log(arr2)
                arr1.forEach(target=>{
                    arr2.forEach(tar=>{
                        if(tar.parentId == target.id){
                            target.childMenu.push(tar)
                        }
                    })
                })
                arr1.forEach(target=>{
                    target.childMenu.forEach((tar,index)=>{
                        tar.name = '指标'+ (tar.rank)
                    })
                })
                menuList = menuList.concat(arr1)
                this.menus = menuList
            })
        }).catch(err=>{
            console.log('222',err)
        })
        this.user = JSON.parse(localStorage.getItem('user')).data
    },
    methods:{
        getId(id,rank){
            this.id = id;
            this.rank = rank;
        },
        handleOpen(index){
            console.log(index)
        },
        selectMenu(index){
            this.$nextTick(()=>{
                if(index == 'collectionWrite'){
                    this.$router.push({name:'collect',query:{id:this.id,rank:this.rank}})
                }else{
                    this.$router.push({name:index})
                }
            })
            
            // 
        },
        handleCommand(command){
            console.log(command)
            switch (command){
                case 'editPsd':
                    break;
                case 'layout':
                    this.$router.push({name:'login'});
                    break;
                default:
                    break;
            }
        }
    }
}
</script>
<style lang="less" scoped>
@topH:62px;
.el-menu{
    background-color: #f5f5f5;
     border:none;
}
.left-menu{
     background-color: #f5f5f5;
     height:100%;
     overflow-y: scroll;
}
.whole{
    width:100%;
    height:100%;
    .top-menu{
        height:60px;
        width:100%;
        box-shadow: 0px 0px 2px #888888;
        -moz-box-shadow: 0px 0px 2px #888888; /* 老的 Firefox */
        position: relative;
        background-color: #1890FF;
        .title{
            position: absolute;
            top:13px;
            left:20px;
            color:white;
        }
        .avtor-box{
            cursor: pointer;
            position: absolute;
            height:100%;
            right:0;
            display: flex;
            // justify-content: center;
            align-items: center;
            margin: 0 30px 0 0;
        }
        .avtor{
            font-size: 30px;
        }
    }
    .b-box{
        width:100%;
        margin-top:2px;
        height:calc(100% - @topH);
        display: flex;
        .left-menu{
            width:210px;
            height:100%;
            border-right: 1px solid #E2E2E2;
        }
        .view{
            flex:1;
             height:100%;
             width:100%;
             overflow-y: scroll;
        }
    }
}
</style>


