import Vue from "vue";
// import axios from 'axios';

import App from "./App.vue";
import router from "./router";
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
import axios from "./common/js/api";

Vue.use(ElementUI);
// Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios.$axios;

/* eslint-disable no-new */
const app = new Vue({
    ...App,
});
app.$mount("#root");

Date.prototype.Format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds(),
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, this.getFullYear() + "");
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                    ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length),
            );
    }
    return fmt;
};
