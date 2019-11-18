<template>
	<div class="screen" v-if="isShow">
		<div class="load-box">
			<div class="loadImg"><span class="iconfont icon-dengdai" style="font-size:85px;color:white;"></span></div>
			<p>loading</p>
		</div>
	</div>
</template>

<script>
export default {
	name:'loading',
	props:{
		isShow:{
			type:Boolean,
			default:false
		}
	},
}
</script>

<style>
	.screen{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color:#fffefa;
		opacity: 0.5;
	}
	.load-box{
		width:180px;
		height:220px;
		background-color:rgba(89,89,89,1);
		border-radius:10px;
		position:absolute;
		top:50%;
		left:50%;
		margin-top: -110px;
		margin-left: -90px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.loadImg{
		animation:loading 2s linear infinite
	}
	
	.load-box p{
		font-size: 20px;
		color: #afafaf;
		-webkit-user-select: none;
	}
	@keyframes loading{
		from{transform: rotate(360deg)}to{transform: rotate(0deg)}
	}
	
</style>
