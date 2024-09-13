import axios from 'axios';
import { Message } from 'element-ui';
// import JSONbig from 'json-bigint';
export default {
    $axios(obj) {
        // obj.transformResponse = [function (data) {
        //     return JSONbig.parse(data);
        // }];
        let map = obj.headers || {};
        obj.projectType = obj.projectType || '';
        obj.timeout = 10000;
        if (obj.data && obj.data.p && obj.data.p === 'chk_login') {
            obj.timeout = 20000;
        }
        obj.headers = Object.assign(
            {},
            {
                Authorization:
                    localStorage.getItem(obj.projectType + '-token') || ''
            },
            map
        );
        // obj.timeout = 1000;
        if (
            obj.url.includes('login') ||
            obj.url.includes('bepCertInfoDataReCheckOpen') ||
            !obj.headers.Authorization ||
            obj.projectType === 'project'
        ) {
            delete obj.headers.Authorization;
        }
        axios.defaults.timeout = obj.timeout || 45000;
        // axios.defaults.withCredentials = true;
        if (
            obj.headers['Content-Type'] === 'application/x-www-form-urlencoded'
        ) {
            obj.transformRequest = [
                function (data) {
                    if (obj.projectType === 'management') {
                        data.backendFlag = 1;
                    }
                    let str = '';
                    for (let k in data) {
                        str +=
                            encodeURIComponent(k) +
                            '=' +
                            encodeURIComponent(data[k]) +
                            '&';
                    }
                    return str;
                }
            ];
        }
        axios.interceptors.request.use(
            config => {
                // this.source.cancel('不想请求了');
                // apiLoading ? glo_loading.loadingShow() : ''//全局loading是否启用
                return config;
            },
            err => {
                return Promise.reject(err);
            }
        );
        axios.interceptors.response.use(
            response => {
                // const status = response.status;
                // apiLoading ? glo_loading.loadingShow() : ''//全局loading是否启用
                return response;
            },
            err => {
                // apiLoading ? glo_loading.loadingShow() : ''//全局loading是否启用
                return Promise.reject(err);
            }
        );
        let api = axios(obj)
            .then(res => {
                // console.log('res---res', res);
                // if (res.data.code !== 0) {
                //     Message.warning(
                //         res.data.error
                //             ? res.data.error
                //             : 'Operation failed, please try again'
                //     );
                // }
                if ([401].includes(res.data.code)) {
                    this.loginOut = true;
                    let str = '';
                    for (let k in obj.query) {
                        str +=
                            (str === '' ? '#' : '&') + k + '=' + obj.query[k];
                    }
                    obj.router &&
                        obj.router.push({
                            name: 'login',
                            query: { from: obj.routerName + str }
                        });
                    !document.getElementsByClassName('el-message')[0] &&
                        Message.warning('沙巴ip限制，更换网络');
                }
                return res;
            })
            .catch((err, a, b) => {
                if (err.message.includes('code 401')) {
                    !document.getElementsByClassName('el-message')[0] &&
                        Message.warning('沙巴ip限制，更换网络');
                    let str = '';
                    for (let k in obj.query) {
                        str +=
                            (str === '' ? '#' : '&') + k + '=' + obj.query[k];
                    }
                    obj.router &&
                        obj.router.push({
                            name: 'login',
                            query: { from: obj.routerName + str }
                        });
                    return;
                }
                // let s = err.message.includes('timeout')
                //     ? 'The system is busy, the request timed out, please try again'
                //     : 'The system is busy, please try again later';
                // Message.warning(s);
            });
        return api;
    },
    source: null
};
