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
			console.log(this.hasLogin)
			if (this.hasLogin) {
				console.log(this.$store.state)
			} else {
				uni.redirectTo({
					url: "/pages/mobile/mobile?redirect=/pages/home/home"
				})
			}
		}
	}
</script>

<style>

</style>
