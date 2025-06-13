import instance from "@/request/request";

export const GetCaptchaCodeApi = () => instance.get('/prod-api/captchaImage');

export const LoginApi = (params) => instance.post('/prod-api/login',params);