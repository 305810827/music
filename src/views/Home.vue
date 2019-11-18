<template>
  <div class="container">
  	<div class="box">
  		<div><span class="iconfont icon-wangyiyunyinle"></span></div>
  		<div class="btn">
  			<button @click="register">注册</button>
  			<button @click="login">登录</button>
  		</div>
  	</div>
  </div>
</template>

<script>

export default{
	name:'home',
	methods:{
	  login:function(){
	    this.$router.push({path:'/login'})
	    //  $router对路由的操作
	    // $route 获取路由信息
	  },
	  register(){
		  this.$router.push({path:'/register'})
	  }
	}
}

</script>
<style scoped>
	.container{
		background-color: red;
		height: 100%;
	}
	.box{
		display: flex;
		flex-direction: column;
	}
	.box>div{
		text-align: center;
		margin-top: 150px;
	}
	.box div span{
		background-color: #f83636;
		padding: 10px;
		border-radius: 50%;
		font-size: 50px;
		color: white;
	}
	.btn{
		margin-top: 150px;
	}
	button {
		padding: 7px;
		margin:7px auto;
		width: 85%;
		outline: none;
		border: none;
		background-color: white;
		color: red;
		font-size: 16px;
		border-radius: 15px;
	}
</style>
