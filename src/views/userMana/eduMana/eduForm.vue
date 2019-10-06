<template>
    <div>
        <el-form  label-width="120px" :rules="rules" :model="form" ref="eduForm" >
        <el-row>
            <el-col :span="span">
                <el-form-item label="教育局识别码" prop="code">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24-span">
                <el-form-item label="教育局名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>               
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="span">
                <el-form-item label="登录密码" prop="password">
                    <el-input v-model="form.passwd" type="password"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24-span">
                <el-form-item label="再次输入密码" prop="agapsd">
                    <el-input v-model="form.agapsd" type="password"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
         <el-row>
            <el-col :span="span">
                <el-form-item label="联系人" prop="contact">
                    <el-input v-model="form.contact" type="text"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24-span">
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="form.phone" type="text"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="span">
                <el-form-item label="教育局类型">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option
                        v-for="item in options1"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24-span">
                <el-form-item label="教育局归属地" v-if="form.type == 'COUNTY'">
                    <el-input v-model="belong" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="span" >
                <el-form-item label="所属市" >
                    <el-select v-model="form.cityId" placeholder="请选择">
                        <el-option
                        v-for="item in options2"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24-span">
                <el-form-item label="所属区/县" v-if="form.type == 'COUNTY'">
                    <el-select v-model="form.countyId" placeholder="请选择">
                        <el-option
                        v-for="item in options3"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
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
    name:'',
    code:'',
    type:'',
    cityId:'',
    countyId:'',
    passwd:'',
    agaPsd:'',
    contact:'',
    phone:''
}
const rules = {
    code:[
        {
            required:true,
        }
    ],
    name:[
        {
            required:true,
        }
    ],
    passwd:[
        {
            required:true,
        }
    ],
    type:[
        {
            required:true,
        }
    ],
    city:[
        {
            required:true,
        }
    ],
    contact:[
        {
            required:true,
        }
    ],
    phone:[
        {
            required:true,
        }
    ],
    agapsd:[
        {
            required:true,
        }
    ],
    
}
export default {
    name:'eduForm',
    mounted(){
        this.init()
    },
    computed:{
      cityId(){
          return this.form.cityId
      },
      belong(){
          let city;
          if(this.form.cityId == ''){
              return ''
          }
          this.options2.some(target=>{
              if(target.id == this.form.cityId){
                  city = target.name
              }
          });
          return '江苏省'+ city+ '教育局'
      }
    },
    watch:{
       cityId(cityId){
           this.$api.getCountyList({cityId:cityId}).then(res=>{
               this.options3 = res.data
            })
       } 
    },
    methods:{
        init(){
            this.$api.getCityList().then(res=>{
                this.options2 = res.data
            });
            this.$api.getDictList({type:'EDUINST_TYPE'}).then(res=>{
                this.options1 = res.data
            })
        },
        save(){
            let params = {
                ...this.form
            };
            delete params.agaPsd
            delete params.agapsd
            if(params.type !== 'COUNTY'){
                params.countyId  = ''
            }
            let api = this.type == 'add'? 'createEduinst' : 'updateEduinst'
            this.$api[api](params).then(res=>{
                console.log(res)
                this.$message({
                    type:'success',
                    message:res.msg
                })
                this.$emit('success')
                this.$emit('close')
            })
        },
        clear(){
            this.$refs.eduForm.resetFields()
            this.form = {
                ...defaultForm
            }
        },
        cancel(){
            this.$emit('close')
        }
    },
    data(){
        return {
            labelPosition: 'right',
            span:12,
            lspan:6,
            form:{
                ...defaultForm
            },
            options1: [],
            options2: [],
            options3: [],
            value: '',
            rules:{
                ...rules
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


