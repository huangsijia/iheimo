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
	formatPay(value){
		switch (value) {
			case "Alipay":
				return "支付宝";
				break;
			case "WePay":
				return "微信";
				break;
			case "BankCard":
				return "银行卡";
				break;
			case "Cash":
				return "现金";
				break;
			case "CreditCard":
				return "信用卡";
				break;
			default:
				break;
		}
	}
}