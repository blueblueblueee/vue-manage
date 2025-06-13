//项目所有的验证方法

export function validateName(rule, value, callback){
    if (value.length < 3 || value.length > 20) {
        callback(new Error('用户名必须在3-20位！'));
    }else {
        callback();
    }
}