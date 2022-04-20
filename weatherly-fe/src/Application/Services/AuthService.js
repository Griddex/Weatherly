import { __assign } from "tslib";
import axios from "axios";
var baseHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Accept-Language": "en-US, en;q=0.8",
};
axios.interceptors.request.use(function (config) {
    var newConfig = __assign(__assign({}, config), { headers: __assign(__assign({}, config.headers), baseHeaders) });
    return newConfig;
}, function (err) {
    return Promise.reject(err);
});
export var post = function (url, data, config) {
    return axios.post(url, data, config);
};
