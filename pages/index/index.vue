<template> 
	<view class="index">
		<!-- #ifdef APP-PLUS -->  
		<view class="status_bar">  
			<view class="top_view"></view>  
		</view>  
		<!-- #endif --> 
		<div class="title">
			<h3>记事本</h3>
			<image src="../../static/img/icon-add.png" class="icon" @click='add'></image>
		</div>
		<ul class="" v-for="(item,$index) in indexList" :key="item">
			<li>
				<p>{{$index+1}}：{{item}}</p>
				<div class="date">
					<p>{{date}}</p>
					<p class="finish" @click="finishFun">已完成</p>
				</div>
			</li>
		</ul>
		<lvv-popup position="bottom" ref="addLvvpopref">
			<view class="lvvpopref addLvvpopref">
				<textarea v-model="addTxt" :focus="addFocus" />	
				<span class="addContent">添加</span>
			</view>
		</lvv-popup>
	</view>
</template>

<script>
	import lvvPopup from '../../components/lvv-popup/lvv-popup.vue'
	import {mapState,mapMutations} from 'vuex'
	export default {
		components: {
			lvvPopup
		},
		data() {
			return {
				date:"",
				addTxt:"",
				addFocus:false
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
			add(){
				this.$refs.addLvvpopref.show();
				this.addFocus = true;
			},
			finishFun(){
				uni.reLaunch({
					url: "/pages/home/home"
				})
			}
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
		.title{
			display: flex;
			justify-content: space-between;
			background: $bg;
			padding:0 24upx;
			padding-bottom: 20upx;
		}
		h3{
			color:$main;
			font-size: 40upx;
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
		.finish{
			text-align: center;
			text-decoration: underline;
			color:$main;
		}
		.lvvpopref{
			width: 100%;
			background: #FFFFFF;
			position: absolute;
			bottom:0;
			font-size: 30upx;
			padding:24upx;
			&.addLvvpopref{
				min-height:120upx;
				display: flex;
			}
			.addContent{
				height: 60upx;
				line-height: 60upx;
				display: inline-block;
				padding:0 24upx;
				background: $main;
				color:$white;
				border-radius: 60upx;
			}
		}
	}
</style>
