<template>
	<view class="detail">
		<view class="title">
			<view class="titleLeft">
				<view class="img">
					<image :src="'../../static/img/'+initData.consumptionTypeIcon+'.png'" class="icon"></image>
				</view>
				<text>{{initData.consumptionTypeName}}</text>
			</view>
			<view class="amount">{{initData.amount}}</view>
		</view>
		<view class="cont">
			<view>
				<text>时间：</text>
				<text>{{initData.date}}</text>
			</view>
			<view>
				<text>支付方式：</text>
				<text>{{initData.paymentName}}</text>
			</view>
			<view>
				<text>用途：</text>
				<text>{{initData.name}}</text>
			</view>
			<view>
				<text>作者：</text>
				<text>{{initData.createBy}}</text>
			</view>
			<view>
				<text>描述：</text>
				<text>{{initData.description}}</text>
			</view>
			<view>
				<text>地址：</text>
				<text>{{initData.location}}</text>
			</view>
		</view>
		<view class="btnBottom">
			<text @click="modifyDetail()">编辑</text>
			<text @click="deleteDetail()">删除</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				initData:{
					amount:"251.00",
					code:"c3f0bf7b-34be-40ce-a02b-9b09c797d1f9",
					consumptionTypeCode:"41ab3f17-7ba6-46ca-aa8b-6eb35b78ee80",
					consumptionTypeIcon:"icon-haizi",
					consumptionTypeName:"子女",
					createBy:"思嘉",
					createDate:"2019-05-30T14:49:55.667",
					date:"2019-05-30",
					description:"当当网",
					id:4067,
					location:"淘宝",
					name:"恩榕六一礼物",
					note:null,
					paymentMethodCode:"Alipay",
					updateBy:null,
					updateDate:"1900-01-01T00:00:00",
					paymentName:""
				}
			}
		},
		methods: {
			init(data){
				// let sendData = data;
				// this.$public.API_GET({
				// 	url:"add",
				// 	type:"PUT",
				// 	data:sendData,
				// 	success:res=>{
				// 		if (!res.data.success) {
				// 			uni.showToast({
				// 				icon: 'none',
				// 				title: res.data.message,
				// 				duration: 2000
				// 			});
				// 			return false;
				// 		}
				// 		console.log(res)
				// 	}
				// })
			},
			modifyDetail(){},
			deleteDetail(){
				this.$public.API_GET({
					url:"add",
					type:"DELETE",
					data:{id:this.initData.id},
					success:res=>{
						if (!res.data.success) {
							uni.showToast({
								icon: 'none',
								title: res.data.message,
								duration: 2000
							});
							return false;
						}
						console.log(res)
					}
				})
			}
		},
		onLoad(e){
			this.init(JSON.parse(e.params))
			this.initData.paymentName=this.$filter.formatPay(this.initData.paymentMethodCode);
		}
	}
</script>


<style scoped="" lang="scss">
	@import '../../common/skin.scss';
.detail{
	color:$ft-333;
	.title{
		height: 120upx;
		border: 1px solid $borderColor;
		padding:0 24upx;
		display: flex;
		justify-content: space-between;
		background: $white;
		align-items: center;
		font-size: 30upx;
		.titleLeft{
			display: flex;
			height: 80upx;
			line-height: 80upx;
		}
		.img {
			width: 80upx;
			height: 80upx;
			line-height: 80upx;
			margin-right:15upx;
			background: $bg;
			border-radius: 50%;
			text-align: center;
		}
		.amount{
			font-size: 40upx;
			color:$main;
		}
	}
	.cont{
		padding:24upx;
		view{
			display: flex;
			justify-content: space-between;
			padding:12upx 0;
			text{
				&:first-child{
					color:$ft-999;
				}
			}
		}
	}
	.btnBottom{
		width: 100%;
		height: 40upx;
		line-height: 40upx;
		padding: 30upx 0;
		position: fixed;
		bottom:0;
		left:0;
		border-top:1px solid $borderColor;
		text-align: center;
		display: flex;
		color: $main;
		text{
			width: 50%;
			&:first-child{
				border-right:1px solid $borderColor;
			}
		}
	}
}
</style>
