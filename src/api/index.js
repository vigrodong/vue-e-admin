const axios = require('axios');
import qs from 'qs'
import { Message } from 'element-ui';
// export const baseURL = 'http://58.192.73.16:8080/yzjh'
// export const baseURL = 'http://10.108.3.124:8080/yzjh'
export const baseURL = 'http://10.20.31.184:8085/yzjh'
// export const baseURL = '/api'

const instance = axios.create({
    baseURL: baseURL,
    // baseURL: '/api',
    timeout: 300000,
});

/*
*
* 请求的预处理 by wzd
* */
instance.interceptors.request.use((config) => {
    config.headers['Accept'] = '';
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['sid'] =localStorage.getItem('sid')
    return config;
}, (error) => {
    return Promise.reject(error);
});

/*
*
* 返回的预处理 by wzd
* */
instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data;
}, function (error) {
    // console.log(error);

    return Promise.reject(error);
});


function fetch(url,params,methods='post'){
    return new Promise((resolve,reject)=>{
        if (methods == 'get') {
            url = url + '?' + qs.stringify(params);
        }
        instance[methods](url, params).then(res=>{
            if(res.code == 0){
                reject(res)
            }else if(res.code == 1){
                resolve(res)
            }else{
                Message({
                    type:'error',
                    message: res.code
                })
            }
        }).catch((err)=>{
            App.$router.push({name:'login'})
            let errCode = err.message.replace(/[^0-9]/gi, "");
            reject(err)
            if(errCode == '500'){
                console.log('success')
                App.$router.push({name:'login'})
            }
            
        })
    })
}

export default {
    baseURL:baseURL,
    //登录
    login(params){
        return fetch('/auth/login',params,'post')
    },
    //获取菜单列表
    getMenus(params){
        return fetch('/user/menus',params,'get')
    },
    //获取市列表
    getCityList(params){
        return fetch('/area/cityList',params,'get')
    },
    //获取曲线列表
    getCountyList(params){
        return fetch('/area/countyList',params,'get')
    },
    //教育局列表
    getEduList(params){
        return fetch('/eduinst/page',params,'get')
    },
    //新增教育局
    createEduinst(params){
        return fetch('/eduinst/create',params,'post')
    },
    //更新教育局
    updateEduinst(params){
        return fetch('/eduinst/update',params,'post')
    },
    deleteEduinst(params){
        return fetch('/eduinst/delete',params,'post')
    },
    //获取字典
    getDictList(params){
        return fetch('/dict/list',params,'get')
    },
    //获取学校列表
    getSchoolList(params){
        return fetch('/school/page',params,'get')
    },
    //新增学校
    addSchool(params){
        return fetch('/school/create',params,'post')
    },
    //更新学校
    upDateSchool(params){
        return fetch('/school/update',params,'post')
    },
    deleteSchool(params){
        return fetch('/school/delete',params,'post')
    },
    //获取学校类型
    getSchoolType(params){
        var params = params || {};
        params.pageSize = 10000;
        params.pageNum = 1
        return fetch('/school/typePage',params,'get')
    },
    //基本情况添加
    baseInfoCreate(params){
        return fetch('/baseInfo/create',params,'post')
    },
    baseInfoFind(params){
        return fetch('/baseInfo/find',params,'get')
    },
    baseInfoUpdate(params){
        return fetch('/baseInfo/update',params,'post')
    },

    //自评表
    baseEvaluationCreate(params){
        return fetch('/baseEvaluation/create',params,'post')
    },
    baseEvaluationFind(params){
        return fetch('/baseEvaluation/find',params,'get')
    },
    baseEvaluationUpdate(params){
        return fetch('/baseEvaluation/update',params,'post')
    },
    indexTable(params){
        return fetch('/index/table',params,'get')
    },
    //schoolCollection/schoolStagePage
    getSchoolStagePage(params){
        return fetch('/schoolCollection/schoolStagePage',params,'get')
    },
    //获取采集项
    collectionList(params){
        return fetch('/collection/list',params,'get')
    },
    schoolCollectionCreate(params){
        return fetch('/schoolCollection/create',params,'post')
    },
    schoolCollectionUpdate(params){
        return fetch('/schoolCollection/update',params,'post')
    },
    schoolCollectionDelete(params){
        return fetch('/schoolCollection/delete',params,'post')
    },
    schoolCollectionList(params){
        return fetch('/schoolCollection/list',params,'get')
    },
    eduinstIndexCreate(params){
        return fetch('/eduinstIndex/create',params,'post')
    },
    eduinstIndexList(params){
        return fetch('/eduinstIndex/list',params,'get')
    },
    
    getMenuindexList(params){
        return fetch('/index/menuIndexList',params,'get')
    },
    //eduinstIndex/submit
    collectionSubmit(params){
        return fetch('/eduinstIndex/submit',params,)
    },
    sjxgCreate(params){
        return fetch('/eduinstIndex/sjxgCreate',params,)
    },
    sjxgQuery(params){
        return fetch('/eduinstIndex/sjxgQuery',params,'get')
    },
    tscxCreate(params){
        return fetch('/eduinstIndex/tscxCreate',params,)
    },
    tscxQuery(params){
        return fetch('/eduinstIndex/tscxQuery',params,'get')
    },
    ghCreate(params){
        return fetch('/eduinstIndex/ghCreate',params,)
    },
    ghQuery(params){
        return fetch('/eduinstIndex/ghQuery',params,'get')
    },
    getProcess(params){
        return fetch('/eduinstIndex/process',params,'get')
    },

}