<template>
	<div class="container">
		<div class="top">
			<span class="iconfont icon-gj-mkf"></span>
			<input @click="toSearch" />
			<span class="iconfont icon-paihangbang"></span>
		</div>
		<div class="imgItem">
		    <img :src="imgUrl">
		    <ul>
		        <li></li>
		        <li></li>
		        <li></li>
		        <li></li>
		    </ul>
		</div>
		<div class="iconItem">
		    <ul>
		        <li><span class="iconfont icon-date"></span><p>每日推荐</p></li>
		        <li><span class="iconfont icon-musicapp"></span><p>歌单</p></li>
		        <li><span class="iconfont icon-paihangbangxuanzhong"></span><p>排行榜</p></li>
		        <li><span class="iconfont icon-music"></span><p>电台</p></li>
		        <li><span class="iconfont icon-zhibo"></span><p>直播</p></li>
		    </ul>
		</div>
		<div class="content">
			<div class="content-top">
				<p>推荐歌单</p>
				<div><span>歌单广场</span></div>
			</div>
			<ul class="content-list">
				<li class="content-box" v-for="(item,index) in songSheet" :key="index" @click="detailed(item.id)">
					<div class="sing-img">
						<img :src="item.picUrl+'?param=196y196'">
						<div class="play-count"><span class="iconfont icon-kongxinsanjiao-second"></span><span>{{item.playCount}}</span></div>
					</div>
					<p>{{item.copywriter}}</p>
				</li>
			</ul>
		</div>
		<div class="tabBox">
		    <div class="bottomTab">
		        <ul>
		            <li><span class="iconfont icon-music1"></span><p>发现</p></li>
		            <li><span class="iconfont icon-shipin"></span><p>视频</p></li>
		            <li><span class="iconfont icon-Musicnote"></span><p>我的</p></li>
		            <li><span class="iconfont icon-qunticopy"></span><p>云村</p></li>
					<li><span class="iconfont icon-yonghu"></span><p>账号</p></li>
		        </ul>
		    </div>
		</div>
		
	</div>
</template>

<script>
	export default{
		name:'index',
		data(){
			return{
				imgUrl:'',
				songSheet:[],
			}
		},
		methods:{
			detailed(id){
				console.log(id);
				this.$router.push({name:'songSheet',params:{ songSheet_id:id }})
			},
			toSearch(){
				this.$router.push({name:'searchBefore'})
			}
		},
		mounted(){
			this.$axios.get('/banner?type=2').then(res=>{
				this.imgUrl = res.data.banners[0].pic
			})
			this.$axios.get('/personalized').then(res=>{ 
				console.log(res) 
				this.songSheet = res.data.result;
				this.$loading.hide();
			}).catch(err=>{
				console.log(err);
			});
		},
		created(){
			this.$loading.show();
		}
	}
</script>

<style scoped>
	
	body{
		background-color: white;
	}
	/* 轮播图 */
	.imgItem{
	    position: relative;
		margin-top: 10px;
		padding: 2px;
		padding: 0px 10px;
	}
	.imgItem img{
	    width: 100%;
		border-radius: 10px;
	}
	.imgItem ul{
	    position: absolute;
	    bottom: 10px;
	    width: 76px;
	    left: 50%;
	    margin-left: -38px;
	    height: 20px;
	    text-align: center;
	}
	.imgItem ul li{
	    display: inline-block;
	    width: 10px;
	    height: 10px;
	    border-radius: 50%;
	    background-color: white;
	    opacity: 0.5;
	}
	/* 分类 */
	.iconItem{
		padding: 10px 0px;
	    background-color: white;
		border-bottom: 1px solid #e5e5e5;
	}
	.iconItem ul{
	    display: flex;
	    justify-content: space-around;
	}
	.iconItem ul li{
	    display: inline-block;
	    text-align: center;
	}
	.iconItem ul li span{
		display: inline-block;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: #ff4c42;
	    font-size: 20px;
		color: white;
		text-align: center;
		line-height: 40px;
	}
	.iconItem ul li p{
		font-size: 12px;
		color: #666666;
		padding: 5px;
		
	}
	/* 内容列表 */
	/* 内容顶部导航 */
	.content{
		padding: 10px 13px;
	}
	.content:after{
		height: 62px;
		display: block;
		content: "";
	}
	.content-top{
		height: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.content-top p{
	    font-size: 18px;
	    font-weight: bold;
	}
	.content-top div{
	    float: right;
	    border: 1px solid #e5e5e5;
		border-radius: 15px;
		padding: 2px 10px;
	}
	.content-top div span{
		font-size: 12px;
		font-weight: bold;
		line-height: 20px;
	}
	/* 内容歌单列表 */
	.content-list{
		width: 100%;
		/* display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap; */
	}
	.content-box{
		width: 32%;
		display: inline-block;
		margin-top: 10px;
	
	}
	.content-box:nth-child(3n-1){
		margin-left: 5px;
		margin-right: 5px;
	}
	.content-box p{
		overflow: hidden;
		font-size: 12px;
		color: #868686;
		-webkit-line-clamp: 2;/*用来限制在一个块元素显示的文本的行数。*/
		display: -webkit-box;/*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
		-webkit-box-orient: vertical;/*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
		height: 32px;
	}
	.sing-img img{
		width:100%;
		border-radius: 5px;
	}
	.sing-img{
		
		position: relative;
	}
	.play-count{
		position: absolute;
		top: 3px;
		right: 5px;
		color: white;
		font-size: 12px;
	}
</style>
