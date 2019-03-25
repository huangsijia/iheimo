import Vue from 'vue';
// 处理小数，返回小数部分
Vue.filter('formatDecimals', function (value) {
    if (!value) {
        return ".00";
    }

    var arr = (value + "").split('.'),
        val = arr[1];

    if (val) {
        val = val.length > 1 ? val : val + "0";
    } else {
        val = "00";
    }

    return '.' + val;
})