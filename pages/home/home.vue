<template>
	<view>
		我的
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		computed: {
			...mapState(['hasLogin'])
		},
		data() {
			return {

			};
		},
		mounted() {},
		onLoad() {
			if (this.hasLogin) {
				console.log("已经登录")
			} else {
				uni.redirectTo({
					url: "/pages/login/login?redirect=/pages/home/home"
				})
			}
		}
	}
</script>

<style>

</style>
