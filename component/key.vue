<template>
	<view class="key">	
		<view class="category">
			<view class="categoryView">
				<view class="calendar" @click="calendarFun()">
					{{date}}
				</view>
				<view class="payment" @click="paymentFun()">
					{{payMentTxt}}
				</view>
			</view>
			<view class="categoryView">
				<view class="remark"  @click="remarkFun()">
					<image src="../../static/img/icon-bianji1.png" v-if="remarkTxt" class="icon"></image>
					<image src="../../static/img/icon-bianji.png" v-else class="icon"></image>
				</view>
				<view class="address"  @click="addressFun()">
					<image src="../../static/img/icon-didian1.png" v-if="addressTxt" class="icon"></image>
					<image src="../../static/img/icon-didian.png" v-else class="icon"></image>
				</view>
			</view>
		</view>
		<view class="table">
			<view :class="[{'iconfont':3 == $index},{'finish':15 == $index},'td']" v-for="(item,$index) in keyList" :key="$index" @click="num(item,$index)">
				<image src="../../static/img/icon-dengluye-shanchu.png" class="icon" v-if="3 == $index"></image>
				<text class="txt" v-else>{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		props:['payMentTxt','remarkTxt','date','addressTxt'],
		computed:{...mapState(['keyList']),},
		data() {
			return {
				count:"0.00"
			};
		},
		methods:{
			num(item,index){
				this.$emit("amountEmit",{item,index});
			},
			paymentFun(){
				this.$emit("paymentEmit");
			},
			remarkFun(){
				this.$emit("remarkEmit");
			},
			calendarFun(){
				this.$emit("calendarEmit");
			},
			addressFun(){
				this.$emit("addressEmit");
			}
		}
	}
</script>

<style scoped="" lang="scss">
@import '../common/skin.scss';
.key{
	background: $bg;
	.category{
		padding: 25upx 0 25upx 25upx;
		display: flex;
		justify-content: space-between;
		.categoryView{
			display: flex;
			.calendar,.payment{
				padding:10upx;
				color:$main;
				border:1px solid $main;
				border-radius: 4px;
				&.calendar{
					margin-right: 20upx;
				}
			}
		}
		.remark,.address{
			margin-right: 20upx;
			display: flex;
			align-items: center;
			justify-content:center;
		}
	}
	.table{
		display: flex;
		flex-wrap: wrap;
		.td{width: 25%;
			height: 106upx;
			line-height: 106upx;
			text-align: center;
			border-top:1px solid $borderColor;
			border-left:1px solid $borderColor;
			box-sizing: border-box;
			color:$ft-333;
			font-size: 50upx;
			&.day,&.finish{
				font-size: 30upx;
			}
			&.finish{
				background: $main;
				color:$white;
			}
		}
	}
}
</style>
