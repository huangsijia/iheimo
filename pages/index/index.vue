<template> 
	<view class="index">
		<!-- #ifdef APP-PLUS -->  
		<view class="status_bar">  
			<view class="top_view"></view>  
		</view>  
		<!-- #endif --> 
		<h3>日记</h3>
		<ul class="" v-for="(item,$index) in indexList" :key="item">
			<li>
				<p>{{$index+1}}：{{item}}</p>
				<p class="date">{{date}}</p>
			</li>
		</ul>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				date:""
			}
		},
		onLoad() {

		},
		computed: {
			indexList() {
				return this.$store.state.indexList;
			},
		},
		methods: {
			...mapMutations(['login']),
		},
		mounted(){
			var persion = uni.getStorageSync("persion");
			if(persion){
				this.login(persion);
			}
			this.date=new Date().getFullYear()+"/"+(new Date().getMonth()+1)+"/"+new Date().getDate();
		}		
	}
</script>

<style scoped="" lang="scss">
	@import '../../common/skin.scss';
	.status_bar {  
		height: var(--status-bar-height);  
		width: 100%;  
		background-color: #F8F8F8;  
	}  
	.top_view {  
		height: var(--status-bar-height);  
		width: 100%;  
		position: fixed;  
		background-color: #F8F8F8;  
		top: 0;  
		z-index: 999;  
	}  
	.index{
		height: var(--status-bar-height);  
		width: 100%;  
		background: $bg;
		h3{
			height: 80upx;
			line-height: 80upx;
			color:$main;
			font-size: 40upx;
			padding:0 24upx;
			background: $bg;
		}
		ul{
			padding:0 24upx;
		}
		li{
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom:1px solid $borderColor;
			padding:24upx 0;
			.date{
				margin-left: 10upx;
			}
		}
	}
</style>
