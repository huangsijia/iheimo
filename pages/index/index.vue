<template>
	<view class="content">
		<view class="">
			首页
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		computed: {},
		methods: {
			...mapMutations(['login']),
		},
		mounted(){
			var persion = uni.getStorageSync("persion");
			if(persion){
				this.login(persion);
			}
		}		
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
