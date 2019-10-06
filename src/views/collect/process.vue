<template>
<div class='process'>
    
    <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="eduinstName"
      label="教育局名称"
      width="240">
    </el-table-column>
    <el-table-column
      prop="contact"
      label="联系人"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="联系电话">
    </el-table-column>
    <el-table-column
      prop="finishIndex"
      label="已完成数据项">
    </el-table-column>
    <el-table-column
      prop="totalNum"
      label="联系数据项总数">
    </el-table-column>
    <el-table-column
      prop="address"
      label="数据填报完成度">
       <template slot-scope="scope">
        <el-tag
          :type="'primary'"
          disable-transitions>{{scope.row.finishNum}}/{{scope.row.totalNum}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
  
<div class='flex-right'>
    <el-pagination
  background
  layout="prev, pager, next"
  :total="total"
  @current-change='pageChange'>
</el-pagination>
</div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        pageNum:1,
        total:0,
      }
    },
    methods:{
        pageChange(num){
            this.pageNum = num;
            this.getProcess();
        },
        getProcess(){
            let params = {
                pageSize:20,
                pageNum:this.pageNum,
            }
            this.$api.getProcess(params).then(res=>{
                this.tableData = res.data.data
                this.total = res.data.total
            })
        }
    },
    mounted(){
        this.getProcess();
    }
  }
</script>
<style lang="less" scoped>
.process{
 padding: 30px;
 .flex-right{
     display: flex;
     flex-direction: row-reverse;
 }
}
</style>