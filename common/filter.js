export default {
	formatMoney(value) {
		/*处理金额,保留两位小数*/
		value = value == null ? 0 : value;
		return Number(Math.abs(value)).toFixed(2);
	},
	formatDate(value) {
		// 格式化年月
		var arr = value.split('T');
		return arr[0];
	},
}