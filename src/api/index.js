const axios = require('axios');
import qs from 'qs'


const instance = axios.create({
    baseURL: '/api',
    timeout: 10000,
});


/*
*
* 请求的预处理 by wzd
* */
instance.interceptors.request.use((config) => {
    config.headers['Accept'] = '';
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
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
            console.log(res)
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export default {
    login(params){
        return fetch('/auth/login',params,'post')
    }
}