export default {
	encryption(params) {
		let data = params || {};
		var timeStamp = new Date().getTime() + "";
		//签名数据
		var sigData = {
		  accessToken: appKey(),
		  signatureMethod: SIGNATURE_METHOD, 
		  timestamp: timeStamp,
		  signatureVersion: SIGNATURE_VERSION,
		  appVersion: "appVersion",
		  parameter: encodeURIComponent(JSON.stringify(data))
		}
		//传送数据
		var sendData = {
		  accessToken: appKey(),
		  signatureMethod: SIGNATURE_METHOD,
		  timestamp: timeStamp,
		  signatureVersion: SIGNATURE_VERSION,
		  appVersion: "appVersion",
		  parameter: JSON.stringify(data),
		  signature: sig(POST, sigData, ACCESS_SECRET)
		}
		return sendData
	  },
}