<template>
    <div class="whole">
        <div class="top-menu">
            <div class="avtor-box">
                <el-dropdown>
                <span class="el-dropdown-link">
                     hello,树先生
                <i class="el-icon-platform-eleme avtor"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </div>
            
        </div>
        <div class="b-box">
            <div class="left-menu">
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @select="selectMenu" :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">导航一</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
                        </el-menu-item>
                        <el-menu-item index="3" disabled>
                            <i class="el-icon-document"></i>
                            <span slot="title">导航三</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
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
            isCollapse:false
        }
    },
    methods:{
        handleOpen(index){
            console.log(index)
        },
        selectMenu(index,path){
            console.log(index,path)
        }
    }
}
</script>
<style lang="less" scoped>
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
        height:calc(100% - 62px);
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
        }
    }
}
</style>


