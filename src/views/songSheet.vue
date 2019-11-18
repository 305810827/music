<template>
	<div class="container">
		<div class="top">
			<span class="iconfont icon-back" @click="back"></span>
			<p>歌单</p>
			<div><span class="iconfont icon-sandianshuzhuode"></span><span class="iconfont icon-paihangbang"></span></div>
		</div>
		<div class="sheet-title">
			<div class="song-img">
				<img :src="songSheetInfo.coverImgUrl+'?param=200y200'">
				<div class="play-count"><span class="iconfont icon-kongxinsanjiao-second"></span><span>{{songSheetInfo.playCount}}</span></div>
			</div>
			<div class="sheet-dec">
				<p>{{songSheetInfo.name}}</p>
				<div><img :src="creator.avatarUrl"><span>{{creator.nickname}}</span></div>
			</div>
		</div>
		<div class="func-item">
		    <ul>
		        <li><span class="iconfont icon-pinglun" @click="toCommit"></span><p>{{songSheetInfo.commentCount}}</p></li>
		        <li><span class="iconfont icon-fenxiang"></span><p>{{songSheetInfo.shareCount}}</p></li>
		        <li><span class="iconfont icon-xiazai"></span><p>下载</p></li>
		        <li><span class="iconfont icon-huaban"></span><p>多选</p></li>
		    </ul>
		</div>
		<div class="song-sheet">
			<div class="sheet-top">
				<div @click="playAll">
					<span class="iconfont icon-bofang-"></span>
					<span >播放全部</span>
					<span>共{{songList.length}}首</span>
				</div>
				<div>
					<span class="iconfont icon-socre_active" v-if="songSheetInfo.subscribed" @click="cancel"></span>
					<span class="iconfont icon-xinaixin" v-else @click="collected"></span>
				</div>
				
			</div>
			<ul class="sheet">
				<li v-for="(item,index) in songList" :key="index" @click="toPlay(item.id)">
					<div class="song-box">
						<span class="song-id">{{index+1}}</span>
						<div class="song-dec">
							<p>{{item.name}}</p>
							<span class="iconfont icon-dagou1"></span>
							<span v-for="(songer,songerIndex) in item.ar" :key="songerIndex">
								{{songer.name}}
								<span v-if="songerIndex !== (item.ar.length-1)">/</span>
							</span>
							<span>&nbsp;-&nbsp;{{item.al.name}}</span>
						</div>
					</div>
					<div class="song-icon"><span class="iconfont icon-shipin"></span><span class="iconfont icon-sandianshuzhuode"></span></div>
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
	import {mapState} from 'vuex';
	import {mapMutations} from 'vuex';
	export default{
		name:'songSheet',
		data(){
			return{
				songList:[],
				songSheetInfo:{},
				creator:{},
			}
		},
		computed:{
			...mapState(['playList']),
		},
		methods:{
			...mapMutations(['setPlayList','setPlayIndex','playSong']),
			back(){
				this.$router.go(-1);
			},
			//收藏
			collected(){
				this.$axios.get('/playlist/subscribe',{
					params:{
						t:1,
						id:this.songSheetInfo.id,
						timestamp:Date.now()
					}
				}).then(res=>{
					this.songSheetInfo.subscribed=true;
					console.log(res);
				}).catch(err=>{
					console.log(err);
				})
			},
			//取消收藏
			cancel(){
				this.$axios.get('/playlist/subscribe',{
					params:{
						t:2,
						id:this.songSheetInfo.id,
						timestamp:Date.now()
					}
				}).then(res=>{
					console.log(res);
					this.songSheetInfo.subscribed=false;
				}).catch(err=>{
					console.log(err);
				})
			},
			//播放歌曲并且跳转到播放页面
			toPlay(id){
				this.setPlayList(this.songList);
				//判断当前歌曲在歌单的索引
				let nextFlag = 0;
				for (var i = 0; i < this.playList.length; i++) {
					if (id === this.playList[i].id) {
						nextFlag = i;
						break;
					} else {
						nextFlag = 0;
					}
				}
				this.setPlayIndex(nextFlag);
				this.playSong();
				this.$router.push({name:'play'});
			},
			playAll(){
				this.setPlayList(this.songList);
				this.setPlayIndex(0);
				this.playSong();
				this.$router.push({name:'play'});
			},
			toCommit(){
				this.$router.push({name:'commit',params:{ 
						songSheet_id:this.songSheetInfo.id,
						songSheet_img:this.songSheetInfo.coverImgUrl,
						songSheet_name:this.songSheetInfo.name,
						author:this.creator.nickname,
					},
				});
			}
		},
		mounted() {
			this.$axios.get('/playlist/detail',{params:{id:this.$route.params.songSheet_id}})
			.then(res=>{
				console.log(res);
				this.songSheetInfo.id = res.data.playlist.id;
				this.songSheetInfo.coverImgUrl = res.data.playlist.coverImgUrl;
				this.songSheetInfo.playCount = res.data.playlist.playCount;
				this.songSheetInfo.name = res.data.playlist.name;
				this.songSheetInfo.shareCount = res.data.playlist.shareCount;
				this.songSheetInfo.commentCount = res.data.playlist.commentCount;
				this.songSheetInfo.subscribed = res.data.playlist.subscribed;
				this.creator = res.data.playlist.creator;
				this.songList = res.data.playlist.tracks;
				this.$loading.hide();
			}).catch(err=>{
				console.log(err);
			})
		},
		created(){
			this.$loading.show();
		}
	}
</script>

<style scoped>
	.container{
		background-color: #343331;
	}
	/* 顶部导航 */
	.top {
		height: 42px;
		color: black;
		text-align: center;
		line-height: 42px;
		padding: 0px 5px;
		position: relative;
		font-size: 18px;
	}
	.top p{
		width:100%;
	}
	.top>span {
		position: absolute;
		top: 0px;
		left: 5px;
		font-size:22px
	}
	.top>div {
		position: absolute;
		top: 0px;
		right: 5px;
	}
	.top>div span{
		margin-left: 10px;
		font-size:22px
	}
	.sheet-title{
		margin: 20px;
		display: flex;
	}
	.song-img{
		position: relative;
		width: 140px;
		height: 140px;
	}
	.song-img img{
		width: 140px;
		height: 140px;
		border-radius: 10px;
	}
	.play-count{
		position: absolute;
		top: 5px;
		right: 7px;
		color: white;
		font-size: 12px;
	}
	.sheet-dec{
		color:white;
		
		padding: 5px 15px;
	}
	.sheet-dec div{
		margin-top: 10px;
		display: flex;
		align-items: center;
	}
	.sheet-dec div img{
		width: 25px;
		height: 25px;
		border-radius: 50%;
	}
	.sheet-dec div span{
		font-size: 12px;
		margin-left: 5px;
		color: #c7c3c2;
	}
	/* 功能分类 */
	.func-item{
	    color: white;
	}
	.func-item ul{
	    display: flex;
	    justify-content: space-around;
	}
	.func-item ul li{
	    text-align: center;
	}
	.func-item ul li span{
	    font-size: 20px;
		text-align: center;
	}
	.func-item ul li:nth-of-type(2) span{
	    font-size: 16px;
	}
	.func-item ul li p{
		font-size: 12px;
		padding: 5px;
	}
	.song-sheet{
		margin-top: 10px;
		padding: 15px;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		background-color: white;
		
	}
	.song-sheet:after{
		height: 42px;
		display: block;
		content: "";
	}
	.sheet-top{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height:30px;
		line-height: 30px;
	}
	.sheet-top div:last-child span{
		margin-right: 20px;
		font-size: 20px;
	}
	.sheet-top span:nth-child(1){
		font-size: 25px;
	}
	.sheet-top span:nth-child(2){
		font-weight: bold;
		font-size: 20px;
		margin-left: 5px;
	}
	.sheet-top span:nth-child(3){
		color:#adacac;
		font-size: 16px;
		margin-left: 5px;
	}
	.sheet{
		margin-top: 10px;
	}
	.sheet li{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}
	.song-box{
		display: flex;
		align-items: center;
	}
	.song-id{
		display: inline-block;
		color:#adacac;
		width: 30px;
	}
	.song-dec{
		display: inline-block;
		width: 230px;
	}
	.song-dec p{
		font-size:18px ;
	}
	.song-dec span{
		font-size: 12px;
		color: #adacac;
	}
	.icon-dagou1{
		margin-right: 4px;
	}
	.song-icon span{
		color: #adacac;
		font-size: 22px;
		margin-left: 8px;
	}
	.icon-socre_active{
		color:red;
	}
</style>
