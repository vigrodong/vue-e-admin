<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted(){
    let _this = this
    let timer = null;
    window.addEventListener('resize',function(){
      clearTimeout(timer);
      timer = setTimeout(()=>{
      _this.$store.dispatch('setWH',{
          width:window.innerWidth,
          height:window.innerHeight
        })
      
      },200)
     
    })
  }
}
</script>

<style lang="less">
html,body{
  width:100%;
  height:100%;
}
*{
  padding: 0;
  margin: 0;
}
#app {
  width:100%;
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #000000;
}


.el-menu{
  border:none;
}

</style>
