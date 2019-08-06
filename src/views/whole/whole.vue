<template>
    <div class="whole">
        <div class="top-menu">
           <!-- <div style="position:absoulte;">江苏省义务教育优质均衡发展评估系统</div> -->
            <div class="avtor-box">
                <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
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
                <el-menu  class="el-menu-vertical-demo" @select="selectMenu" :collapse="isCollapse" :unique-opened="true">
                 
                    <el-submenu :index="String(item.url)" v-for="(item,index) in menus" :key='index'>
                        <template slot="title">
                            <i :class="[item.icon]"></i>
                            <span slot="title">{{item.name}}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(it,ind) in item.childMenu" :index="String(it.url)" :key="ind">{{it.name}}</el-menu-item>
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
export default {
    name:'whole',
    data(){
        return {
            isCollapse:false,
            menus:[],
            user:{},
        }
    },
    mounted(){
        this.$api.getMenus().then(res=>{
            this.menus = res.data;
        }).catch(err=>{
            console.log('222',err)
        })
        this.user = JSON.parse(localStorage.getItem('user')).data
    },
    methods:{
        handleOpen(index){
            console.log(index)
        },
        selectMenu(index,path){
            console.log(index)
            this.$router.push({name:index})
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
.whole{
    width:100%;
    height:100%;
    .el-menu{
    border:none;
    }
    .top-menu{
        height:60px;
        width:100%;
        box-shadow: 0px 0px 2px #888888;
        -moz-box-shadow: 0px 0px 2px #888888; /* 老的 Firefox */
        position: relative;
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


