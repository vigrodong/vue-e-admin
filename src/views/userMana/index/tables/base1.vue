<template>
    <div class="container">
    <h3>（一）义务教育优质均衡发展县（市、区）基本情况</h3>
        <table  cellspacing="1" class="xwtable">
            <tr>
                <td rowspan='4'>自然状况</td>
                <td>人口总数（万人）</td>
                <td><input type="text" class='text' v-model="form.population" @blur='form.population = parseFloat(form.population.replace(/[^\d\.]/g,"")).toFixed(2) || 0'></td>
                <td rowspan='4'>经济情况</td>
                <td>年人均国内生产总值（元）</td>
                <td><input type="text" class='text' v-model="form.pergdp" @blur='form.pergdp = parseInt(form.pergdp.replace(/[^\d\.]/g,"")) || 0'></td>
            </tr>
            <tr>
                <td>农业人口数（万人）</td>
                <td> <input type="text" class='text' v-model="form.feamPopulation" @blur='form.feamPopulation = parseFloat(form.feamPopulation.replace(/[^\d\.]/g,"")).toFixed(2) || 0'></td>
                <td>年人均地方财政收入（元）</td>
                <td><input type="text" class='text' v-model="form.perlocalgdp" @blur='form.perlocalgdp = parseInt(form.perlocalgdp.replace(/[^\d\.]/g,"")) || 0'></td>
            </tr>
            <tr>
                <td>乡镇数（个）</td>
                <td> <input type="text" class='text' v-model="form.town" @blur='form.town = parseInt(form.town.replace(/[^\d\.]/g,"")) || 0'></td>
                <td>农民年人均纯收入（元）</td>
                <td><input type="text" class='text' v-model="form.farmin" @blur='form.farmin = parseInt(form.farmin.replace(/[^\d\.]/g,"")) || 0'></td>
            </tr>
            <tr>
                <td>行政村数（个）</td>
                <td><input type="text" class='text' v-model="form.village" @blur='form.village = parseInt(form.village.replace(/[^\d\.]/g,"")) || 0'></td>
                <td>城镇居民年人均可支配收入（元）</td>
                <td><input type="text" class='text' v-model="form.residentin" @blur='form.residentin = parseInt(form.residentin.replace(/[^\d\.]/g,"")) || 0'></td>
            </tr>
            <tr>
                <td rowspan='5'>普通中小学校数（所）</td>
                <td>小学</td>
                <td><input type="text" class='text' v-model="form.primarySchool" @blur='form.primarySchool = parseInt(form.primarySchool.replace(/[^\d\.]/g,"")) || 0'></td>
                <td rowspan='3'>小学教学点数（个）</td>
                <td>50人以下</td>
                <td><input type="text" class='text' v-model="form.primarySchoolPointThen0" @blur='form.primarySchoolPointThen0 = parseInt(form.primarySchoolPointThen0.replace(/[^\d\.]/g,"")) || 0'></td>
            </tr>
            <tr>
                <td>九年一贯制学校</td>
                <td><input type="text" class='text' v-model="form.nineSchool" @blur='form.nineSchool = parseInt(form.nineSchool.replace(/[^\d\.]/g,"")) || 0'></td>
                <td>50-100人（含50人）</td>
                <td><input type="text" class='text' v-model="form.primarySchoolPointThenFifty" @blur='form.primarySchoolPointThenFifty = parseInt(form.primarySchoolPointThenFifty.replace(/[^\d\.]/g,"")) || 0'></td>
            </tr>
            <tr>
                <td>初中</td>
                <td><input type="text" class='text' v-model="form.middleSchool" @blur='form.middleSchool = parseInt(form.middleSchool.replace(/[^\d\.]/g,"")) || 0'></td>
                <td>100人以上（含100人）</td>
                <td><input type="text" class='text' v-model="form.primarySchoolPointThen100" @blur='form.primarySchoolPointThen100 = parseInt(form.primarySchoolPointThen100.replace(/[^\d\.]/g,"")) || 0'></td>
            </tr>
            <tr>
                <td>完全初中</td>
                <td><input type="text" class='text' v-model="form.fullMiddleSchool" @blur='form.fullMiddleSchool = parseInt(form.fullMiddleSchool.replace(/[^\d\.]/g,"")) || 0'></td>
                <td rowspan='2'>教学班数（个）</td>
                <td>小学</td>
                <td><input type="text" class='text' v-model="form.primarySchoolClass" @blur='form.primarySchoolClass = parseInt(form.primarySchoolClass.replace(/[^\d\.]/g,"")) || 0'></td>
            </tr>
            <tr>
                <td>十二年一贯制学校</td>
                <td><input type="text" class='text' v-model="form.twentySchool" @blur='form.twentySchool = parseInt(form.twentySchool.replace(/[^\d\.]/g,"")) || 0'></td>
                <td>初中</td>
                <td><input type="text" class='text' v-model="form.middleSchoolClass" @blur='form.middleSchoolClass = parseInt(form.middleSchoolClass.replace(/[^\d\.]/g,"")) || 0'></td>
            </tr>
            <tr>
                <td colspan="2">特殊教育学校数（所）</td>
                <td><input type="text" class='text' v-model="form.specialSchool" @blur='form.specialSchool = parseInt(form.specialSchool.replace(/[^\d\.]/g,"")) || 0'></td>
                <td rowspan="4">教职工数（人）</td>
                <td>小学合计</td>
                <td><input type="text" class='text' v-model="form.primarySchoolTeacher" @blur='form.primarySchoolTeacher = parseInt(form.primarySchoolTeacher.replace(/[^\d\.]/g,"")) || 0'></td>
            </tr>
            <tr>
                <td rowspan="2">在校学生数（人）</td>
                <td>小学</td>
                <td><input type="text" class='text' v-model="form.primarySchoolStudent" @blur='form.primarySchoolStudent = parseInt(form.primarySchoolStudent.replace(/[^\d\.]/g,"")) || 0'></td>
                <td>小学专任教师</td>
                <td> <input type="text" class='text' v-model="form.primarySchoolSpecialTeacher" @blur='form.primarySchoolSpecialTeacher = parseInt(form.primarySchoolSpecialTeacher.replace(/[^\d\.]/g,"")) || 0'></td>
            </tr>
            <tr>
                <td>初中</td>
                <td><input type="text" class='text' v-model="form.middleSchoolStudent" @blur='form.middleSchoolStudent = parseInt(form.middleSchoolStudent.replace(/[^\d\.]/g,"")) || 0'></td>
                <td>初中合计</td>
                <td><input type="text" class='text' v-model="form.middleSchoolTeacher" @blur='form.middleSchoolTeacher = parseInt(form.middleSchoolTeacher.replace(/[^\d\.]/g,"")) || 0'></td>
            </tr>
            <tr>
                <td colspan="2">
                    <!-- 职业学校是否附设普通小学班或初中班（是/否） -->
                    </td>
                <td>
                    <!-- <input type="text" class='text' v-model="form.isSet" > -->
                    <!-- <el-select v-model="form.isSet" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select> -->
                </td>
                <td>初中专任教师</td>
                <td><input type="text" class='text' v-model="form.middleSchoolSpecialTeacher" @blur='form.middleSchoolSpecialTeacher = parseInt(form.middleSchoolSpecialTeacher.replace(/[^\d\.]/g,"")) || 0'></td>
            </tr>
            <tr>
                <td rowspan="3">
                    按义务教育基本均衡规定测算的小学初中差异系数是否分别不高于0.6，0.5（是/否）
                </td>
                <td>2016年</td>
                <td>小学</td>
                <td>
                    <!-- <input type="text" class='text' v-model="form.cy2016primary" @blur='form.cy2016primary = parseInt(form.cy2016primary.replace(/[^\d\.]/g,"")) || 0'> -->
                    <el-select v-model="form.cy2016primary" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </td>
                <td>初中</td>
                <td>
                    <!-- <input type="text" class='text' v-model="form.cy2016middle" @blur='form.cy2016middle = parseInt(form.cy2016middle.replace(/[^\d\.]/g,"")) || 0'> -->
                    <el-select v-model="form.cy2016middle" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td>2017年</td>
                <td>小学</td>
                <td>
                    <!-- <input type="text" class='text' v-model="form.cy2017primary" @blur='form.cy2017primary = parseInt(form.cy2017primary.replace(/[^\d\.]/g,"")) || 0'> -->
                    <el-select v-model="form.cy2017primary" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </td>
                <td>初中</td>
                <td>
                    <!-- <input type="text" class='text' v-model="form.cy2017middle" @blur='form.cy2017middle = parseInt(form.cy2017middle.replace(/[^\d\.]/g,"")) || 0'> -->
                    <el-select v-model="form.cy2017middle" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td>2018年</td>
                <td>小学</td>
                <td>
                    <!-- <input type="text" class='text' v-model="form.cy2018primary" @blur='form.cy2018primary = parseInt(form.cy2018primary.replace(/[^\d\.]/g,"")) || 0'> -->
                    <el-select v-model="form.cy2018primary" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </td>
                <td>初中</td>
                <td>
                    <!-- <input type="text" class='text' v-model="form.cy2018middle" @blur='form.cy2018middle = parseInt(form.cy2018middle.replace(/[^\d\.]/g,"")) || 0'> -->
                    <el-select v-model="form.cy2018middle" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    按义务教育基本均衡规定测算的小学初中差异系数是否分别不高于0.50，0.45（是/否）
                </td>
                <td>小学</td>
                <td>
                    <!-- <input type="text" class='text' v-model="form.cy2Primary" @blur='form.cy2Primary = parseInt(form.cy2Primary.replace(/[^\d\.]/g,"")) || 0'> -->
                    <el-select v-model="form.cy2Primary" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </td>
                <td>初中</td>
                <td>
                    <!-- <input type="text" class='text' v-model="form.cy2Middle" @blur='form.cy2Middle = parseInt(form.cy2Middle.replace(/[^\d\.]/g,"")) || 0'> -->
                    <el-select v-model="form.cy2Middle" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </td>
            </tr>
            <!-- <tr>
                <td colspan="5">
                    本年度我县教育系统未发生重大安全事故或严重违法违纪违规事件，未发生“校闹”，社会舆论关注或人民群众反映强烈的突出问题（是/否）
                </td>
                <td>
                     <el-select v-model="form.wj" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </td>
            </tr> -->
        </table>
        <!-- <table  cellspacing="1" class="xwtable">
            <tr>
                <td rowspan="4">项目</td>
                <td colspan='4'>自然情况</td>
                <td colspan='4'>经济情况</td>
                <td colspan='5'>普通中小学校数(所)</td>
                <td rowspan="3">特殊教育学校(所)</td>
                <td colspan='2'>小学教育点数(个)</td>
                <td colspan='2'>教学班数(个)</td>
                <td colspan='2'>在校学生数(人)</td>
                <td colspan='4'>教职工数(人)</td>
            </tr>
            <tr>
                <td rowspan="2">人口总数（万人）</td>
                <td rowspan="2">农业人口数（万人）</td>
                <td rowspan="2">乡镇数（个）</td>
                <td rowspan="2">行政村数（个）</td>
                <td rowspan="2">年人均国内生产总值（元）</td>
                <td rowspan="2">年人均地方财政收入（元）</td>
                <td rowspan="2">农民年人均纯收入（元）</td>
                <td rowspan="2">城镇居民年人均可支配收入(元)</td>
                <td rowspan="2">小学</td>
                <td rowspan="2">九年一贯制学校</td>
                <td rowspan="2">初中</td>
                <td rowspan="2">完全中学</td>
                <td rowspan="2">十二年一贯制学校</td>
                <td rowspan="2">合计</td>
                <td rowspan="2">其中:50人及以上</td>
                <td rowspan="2">小学</td>
                <td rowspan="2">初中</td>
                <td rowspan="2">小学</td>
                <td rowspan="2">初中</td>
                <td colspan="2">小学</td>
                <td colspan="2">初中</td>
            </tr>
            <tr>
                <td>合计</td>
                <td>其中:专任教师</td>
                <td>合计</td>
                <td>其中:专任教师</td>
            </tr>
            <tr>
                <td>L1</td>
                <td>L2</td>
                <td>L3</td>
                <td>L4</td>
                <td>L5</td>
                <td>L6</td>
                <td>L7</td>
                <td>L8</td>
                <td>L9</td>
                <td>L10</td>
                <td>L11</td>
                <td>L12</td>
                <td>L13</td>
                <td>L14</td>
                <td>L15</td>
                <td>L16</td>
                <td>L17</td>
                <td>L18</td>
                <td>L19</td>
                <td>L20</td>
                <td>L21</td>
                <td>L22</td>
                <td>L23</td>
                <td>L24</td>
            </tr>
            <tr>
                <td>全县统计</td>
                <td >
                <input type="text" class='text' v-model="form.population" @blur='form.population = parseFloat(form.population.replace(/[^\d\.]/g,"")).toFixed(2) || 0'>
                </td>
                <td>
                <input type="text" class='text' v-model="form.feamPopulation" @blur='form.feamPopulation = parseFloat(form.feamPopulation.replace(/[^\d\.]/g,"")).toFixed(2) || 0'>
                </td>
                <td>
                <input type="text" class='text' v-model="form.town" @blur='form.town = parseInt(form.town.replace(/[^\d\.]/g,"")) || 0'>
                </td> 

                <td>
                <input type="text" class='text' v-model="form.village" @blur='form.village = parseInt(form.village.replace(/[^\d\.]/g,"")) || 0'>
                </td> 
                <td>
                    <input type="text" class='text' v-model="form.pergdp" @blur='form.pergdp = parseInt(form.pergdp.replace(/[^\d\.]/g,"")) || 0'>
                </td>   
                <td><input type="text" class='text' v-model="form.perlocalgdp" @blur='form.perlocalgdp = parseInt(form.perlocalgdp.replace(/[^\d\.]/g,"")) || 0'></td> 
                <td> <input type="text" class='text' v-model="form.farmin" @blur='form.farmin = parseInt(form.farmin.replace(/[^\d\.]/g,"")) || 0'></td> 
                <td> <input type="text" class='text' v-model="form.residentin" @blur='form.residentin = parseInt(form.residentin.replace(/[^\d\.]/g,"")) || 0'></td>  
                <td> <input type="text" class='text' v-model="form.primarySchool" @blur='form.primarySchool = parseInt(form.primarySchool.replace(/[^\d\.]/g,"")) || 0'></td> 
                <td><input type="text" class='text' v-model="form.nineSchool" @blur='form.nineSchool = parseInt(form.nineSchool.replace(/[^\d\.]/g,"")) || 0'></td>
                <td><input type="text" class='text' v-model="form.middleSchool" @blur='form.middleSchool = parseInt(form.middleSchool.replace(/[^\d\.]/g,"")) || 0'></td>
                <td> <input type="text" class='text' v-model="form.fullMiddleSchool" @blur='form.fullMiddleSchool = parseInt(form.fullMiddleSchool.replace(/[^\d\.]/g,"")) || 0'></td>
                <td> <input type="text" class='text' v-model="form.twentySchool" @blur='form.twentySchool = parseInt(form.twentySchool.replace(/[^\d\.]/g,"")) || 0'></td> 
                <td><input type="text" class='text' v-model="form.specialSchool" @blur='form.specialSchool = parseInt(form.specialSchool.replace(/[^\d\.]/g,"")) || 0'></td>
                <td><input type="text" class='text' v-model="form.primarySchoolPoint" @blur='form.primarySchoolPoint = parseInt(form.primarySchoolPoint.replace(/[^\d\.]/g,"")) || 0'></td>
                <td><input type="text" class='text' v-model="form.primarySchoolPointThenFifty" @blur='form.primarySchoolPointThenFifty = parseInt(form.primarySchoolPointThenFifty.replace(/[^\d\.]/g,"")) || 0'></td>
                <td><input type="text" class='text' v-model="form.primarySchoolClass" @blur='form.primarySchoolClass = parseInt(form.primarySchoolClass.replace(/[^\d\.]/g,"")) || 0'></td>
                <td> <input type="text" class='text' v-model="form.middleSchoolClass" @blur='form.middleSchoolClass = parseInt(form.middleSchoolClass.replace(/[^\d\.]/g,"")) || 0'></td>
                <td><input type="text" class='text' v-model="form.primarySchoolStudent" @blur='form.primarySchoolStudent = parseInt(form.primarySchoolStudent.replace(/[^\d\.]/g,"")) || 0'></td> 
                <td><input type="text" class='text' v-model="form.middleSchoolStudent" @blur='form.middleSchoolStudent = parseInt(form.middleSchoolStudent.replace(/[^\d\.]/g,"")) || 0'></td>
                <td> <input type="text" class='text' v-model="form.primarySchoolTeacher" @blur='form.primarySchoolTeacher = parseInt(form.primarySchoolTeacher.replace(/[^\d\.]/g,"")) || 0'></td>
                <td> <input type="text" class='text' v-model="form.primarySchoolSpecialTeacher" @blur='form.primarySchoolSpecialTeacher = parseInt(form.primarySchoolSpecialTeacher.replace(/[^\d\.]/g,"")) || 0'></td>
                <td><input type="text" class='text' v-model="form.middleSchoolTeacher" @blur='form.middleSchoolTeacher = parseInt(form.middleSchoolTeacher.replace(/[^\d\.]/g,"")) || 0'></td>
                <td><input type="text" class='text' v-model="form.middleSchoolSpecialTeacher" @blur='form.middleSchoolSpecialTeacher = parseInt(form.middleSchoolSpecialTeacher.replace(/[^\d\.]/g,"")) || 0'></td>
                   
            </tr>
        </table> -->
        注：“人口总数”和“农业人口数”按常住人口统计，数字保留两位小数。L5-L8列数字保留整数。
        <el-button type="primary" plain @click='submit'>确认保存</el-button>
    </div>
</template>
<script>
const defForm = {
    "cy2016middle": '',
  "cy2016primary": '',
  "cy2017middle": '',
  "cy2017primary": '',
  "cy2018middle": '',
  "cy2018primary": '',
  "cy2Middle": '',
  "cy2Primary": '',
  "eduinstId": '',
  "farmin": '',
  "feamPopulation": "",
  "fullMiddleSchool": '',
  "middleSchool": '',
  "middleSchoolClass": '',
  "middleSchoolSpecialTeacher": '',
  "middleSchoolStudent": '',
  "middleSchoolTeacher": '',
  "nineSchool": '',
  "pergdp": '',
  "perlocalgdp": '',
  "population": "",
  "primarySchool": '',
  "primarySchoolClass": '',
  "primarySchoolPoint": '',
  "primarySchoolPointThenFifty": '',
  "primarySchoolPointThen0": '',
  "primarySchoolPointThen100": '',
  "primarySchoolSpecialTeacher": '',
  "primarySchoolStudent": '',
  "primarySchoolTeacher": '',
  "residentin": '',
  "specialSchool": '',
  "town": '',
  "isSet":'',
  "twentySchool": '',
  "village": '',
  "wj": ''
}
export default {
    name:'base1',
    data(){
        return {
            form:{
                ...defForm,
            },
            api:'',
            options:[
                {
                    label:'是',
                    value:'0',
                },
                {
                    label:'否',
                    value:'1',
                },
            ]
        }
    },
    mounted(){
        this.$api.baseInfoFind({eduinstId:JSON.parse(localStorage.getItem('user')).data.eduinstId}).then(res=>{
            if(res.data === null){
                this.api = 'baseInfoCreate'
            }else{
                this.api = 'baseInfoUpdate'
                this.form = {
                ...this.form,
                ...res.data
            }
            }
            
        })
    },
    methods:{
        parseFloat(n){
            return parseFloat(n)
        },
        parseInt(n){
            return parseInt(n)
        },
        submit(){
            let res = JSON.parse(localStorage.getItem('user'))
            this.form.eduinstId = res.data.eduinstId;
            this.$api[this.api](this.form).then(res=>{
                this.$message({
                    type:'success',
                    message:res.msg
                })
                this.$router.go(0)
            })
        }
    }
}
</script>
<style lang="less" scoped>
.container{
    .xwtable{
        // width:400px;
        border-collapse: collapse;
        border: 1px solid #747474;
         tr {background: #fff;font-size: 12px;color: #0a0a0a;}  
         td{width:140px;line-height:20px;text-align: center;height:40px;border: 1px solid #070707;}       
    }
    .text{
        border:none;
        width:100%;
        height:100%;
        text-align: center;
    }
}
</style>


