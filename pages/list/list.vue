<template>
	<view class="list">
		<view class="sum">
			<view class="sumPart1">
				<text>2019年</text>
				<text>03月</text>
			</view>
			<view class="sumPart2">
				<text>收入</text>
				<text>80.00</text>
			</view>
			<view class="sumPart3">
				<text>支出</text>
				<text>120.00</text>
			</view>
		</view>
		<view class="today">
			<view class="todayLeft">
				03年14日 星期四
			</view>
			<view class="todayRight">
				<text>收入：80</text>
				<text>支出：80</text>
			</view>
		</view>
		<view class="li" v-for="(item,index) in li" :key="index">
			<view class="liLeft">
				<view class="liLeftBorder">
					<text class="iconfont">{{item.img}}</text>
				</view>
			</view>
			<view class="liRight">
				<text class="remark">{{item.msg}}</text>
				<text class="amount">{{item.amount}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				li:[
					{
						img:"\ue640",
						msg:'面包，东方大厦，九点四十五，全家',
						amount:"-4.50"
					},
					{
						img:"\ue7fc",
						msg:'球鞋',
						amount:"-65"
					}
				]
			};
		},
		methods:{
			listFun(){
				this.$public.API_GET({
					url:"list",
					type:"GET",
					success:res=>{
						console.log(res)
					}
				})
			}
		},
		mounted() {
			this.listFun()
		}
	}
</script>

<style scoped="" lang="scss">
	@import '../../common/skin.scss';
.list{
	.sum{
		padding:30upx 24upx;
		background: $main;
		display: flex;
		color:$white;
		.sumPart2,.sumPart3{
			margin-left:80upx; 
		}
		text{
			line-height: 1.6;
			display: flex;
			font-size:40upx;
			&:first-child{
				color:#cbe2e2;
				font-size:30upx;
			}
		}
	}
	.today{
		color:$ft-999;
		padding:24upx;
		display: flex;
		justify-content: space-between;
		border-bottom:1upx solid $borderColor;
		.todayRight{
			text{
				margin-right: 20upx;
			}
		}
	}
	.li{
		display: flex;
		align-items: center;
		padding-left:24upx;
		.liLeft{			
			.liLeftBorder{
				width: 80upx;
				height: 80upx;
				line-height: 80upx;
				margin-right:15upx;
				background: $bg;
				border-radius: 50%;
				text-align: center;
			}
		}
		.liRight{
			padding:40upx 24upx;
			width: 100%;
			display: flex;
			justify-content: space-between;
			border-bottom:1upx solid $borderColor;
		}
	}
}
</style>
