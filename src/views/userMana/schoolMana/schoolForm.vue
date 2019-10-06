<template>
    <div class="container">
        <el-form  label-width="100px" :model="form"  :rules="rules" ref="schoolForm">
            <el-row>
                <el-col :span="span">
                    <el-form-item label="名称" prop='name'>
                        <el-input v-model="form.name"></el-input>
                     </el-form-item>
                </el-col>
                <el-col :span="24-span">
                    <el-form-item label="标识码" prop='code'>
                        <el-input v-model="form.code"></el-input>
                     </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="span">
                    <el-form-item label="学校类型" prop='type'>
                        <el-select v-model="form.type" clearable  placeholder="请选择">
                            <el-option
                            v-for="item in options1"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                     </el-form-item>
                </el-col>
                <el-col :span="24-span">
                    <el-form-item label="市" prop='cityId'>
                        <el-select v-model="form.cityId" clearable placeholder="请选择">
                            <el-option
                            v-for="item in options2"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>  
                     </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="span">
                    <el-form-item label="区县" prop='countyId'>
                        <el-select v-model="form.countyId" clearable placeholder="请选择">
                            <el-option
                            v-for="item in options3"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                     </el-form-item>
                </el-col>
                <el-col :span="24-span">
                    <el-form-item label="所属教育局" prop='eduinstId'>
                        <el-select v-model="form.eduinstId" clearable placeholder="请选择">
                            <el-option
                            v-for="item in options5"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                     </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="span">
                    <el-form-item label="举办者类型" prop='runBy'>
                        <el-select v-model="form.runBy" clearable placeholder="请选择">
                            <el-option
                            v-for="item in options4"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                            </el-option>
                        </el-select>
                     </el-form-item>
                </el-col>
                <el-col :span="24-span">
                    <el-form-item label="班级数" prop='classCount'>
                        <el-input v-model="form.classCount"></el-input>
                     </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="span">
                    <el-form-item label="年级数" prop='gradeCount'>
                        <el-input v-model="form.gradeCount"></el-input>
                     </el-form-item>
                </el-col>
                <el-col :span="24-span">
                    <el-form-item label="学生数" prop='studentCount'>
                        <el-input v-model="form.studentCount"></el-input>
                     </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="span">
                    <el-form-item label="小学段学生数" prop='studentCountP'>
                        <el-input v-model="form.studentCountP" 
                        :disabled="!(form.type == 500020 || form.type == 500021 || form.type == 500024 || form.type == 500026)"
                        ></el-input>
                     </el-form-item>
                </el-col>
                <el-col :span="24-span">
                    <el-form-item label="初中段学生数" prop='studentCountM'>
                        <el-input v-model="form.studentCountM" 
                         :disabled="!(form.type == 500022 || form.type == 500024 || form.type == 500026 || form.type == 500042)"
                       
                        ></el-input>
                     </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="span">
                    <el-form-item label="高中段学生数" prop='studentCountH'>
                        <el-input v-model="form.studentCountH" 
                        :disabled="!(form.type == 500024 || form.type == 500022)"
                        ></el-input>
                     </el-form-item>
                </el-col>
                <el-col :span="24-span">
                   <el-form-item label="学区" prop='xq'>
                        <el-input v-model="form.xq" 
                        ></el-input>
                     </el-form-item>
                </el-col>
            </el-row>
        </el-form>
         <div class="flex-center">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="cancel">返回</el-button>
        </div>
    </div>
</template>
<script>
const defaultForm = {
    "cityId": '',
    "classCount": '',
    "code": "",
    "countyId": '',
    "eduinstId": '',
    "gradeCount": '',
    "name": "",
    "runBy": "",
    "studentCount": '',
    "studentCountP": '',
    "studentCountM": '',
    "studentCountH": '',
    "type": '',
    "xq":''
}
export default {
    name:'schoolForm',
    methods:{
        clear(){
            this.form = {...defaultForm};
            this.$refs.schoolForm.resetFields();
        },
        save(){
            let api = this.type =='add'?'addSchool':'upDateSchool'
            let params = {
                ...this.form
            }
            let obj ={
                "cityId": params.cityId,
                "classCount": params.classCount,
                "code": params.code,
                "countyId": params.countyId,
                "eduinstId": params.eduinstId,
                "gradeCount": params.gradeCount,
                "name": params.name,
                "runBy": params.runBy,
                "studentCount": params.studentCount,
                "studentCountP": params.studentCountP,
                "studentCountM": params.studentCountM,
                "studentCountH": params.studentCountH,
                "type": params.type,
                "xq": params.xq
            }
            if(this.type !='add'){
                obj.id = params.id
            }
            this.$api[api](obj).then(res=>{
                this.$message.success(res.msg)
                this.$emit('success')
                this.$emit('close')
            })
        },
        cancel(){
            this.$emit('close')
        },
        getDictRunBy(){
            this.$api.getDictList({type:'RUN_BY'}).then(res=>{
                this.options4 = res.data;
            })
        },
        getCityList(){
            this.$api.getCityList().then(res=>{
                this.options2 = res.data
            });
        },
        getEduinstList(){
            let params = {
                pageSize:10000,
                cityId:this.cityId,
                countyId:this.countyId
            };
            this.$api.getEduList(params).then(res=>{
                console.log(res)
                this.options5 = res.data.data
            })
        },
        getSchoolType(){
            this.$api.getSchoolType().then(res=>{
                this.options1 = res.data.data
            })
        },
    },
    computed:{
        cityId(){
            return this.form.cityId
        }
    },
    watch:{
        cityId(cityId){
            this.$api.getCountyList({cityId:cityId}).then(res=>{
               this.options3 = res.data
            })
        }
    },
    mounted(){
        this.getDictRunBy();
        this.getCityList();
        this.getSchoolType();
        this.getEduinstList();
        let user = JSON.parse(localStorage.getItem('user'))
        this.$nextTick(()=>{
             this.form = {
            ...this.form,
            ...user.data
        } 
        })
    },
    data(){
        return {
            type:'add',
            span:12,
            lspan:8,
            form :{
                ...defaultForm
            },
            options1:[],
            options2:[],
            options3:[],
            options4:[],
            options5:[],
            rules:{
                name:[{ required: true,}],
                code:[{ required: true,}],
                type:[{ required: true,}],
                cityId:[{ required: true,}],
                countyId:[{ required: true,}],
                runBy:[{ required: true,}],
                eduinstId:[{ required: true,}],
                gradeCount:[{ required: true,}],
                classCount:[{ required: true,}],
                studentCount:[{ required: true,}],
                xq:[{ required: true,}],
            }
        }
    }

}
</script>
<style lang="less" scoped>
.flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
