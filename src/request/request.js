import axios from "axios";
import { Message } from "element-ui";

const instance = axios.create({
    baseURL: "http://vue.ruoyi.vip",
    timeout: 10000
})

//请求拦截器
instance.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});

//响应拦截器
instance.interceptors.response.use(res => {

    let res_data = res.data;
    if (res_data.code !== 200) {
        Message.error(res_data.msg || '网络请求失败!');
        return false;
    }

    return res_data;
}, error => {
    return Promise.reject(error);
})

export default instance;