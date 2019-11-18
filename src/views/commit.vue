<template>
	<div class="container">
		<div class="top">
			<div>
				<span class="iconfont icon-back" @click="back"></span>
				<span>评论({{commitCount}})</span>
			</div>
			<span class="iconfont icon-fenxiang1"></span>
		</div>

		<div class="sheet-info">
			<div class="sheet-info-left">
				<div class="song-img">
					<img :src="`${$route.params.songSheet_img}?param=150y150`">
				</div>
				<div class="sheet-dec">
					<p>{{$route.params.songSheet_name}}</p>
					<div><span>by</span><span>{{$route.params.author}}</span></div>
				</div>
			</div>
			<span class="iconfont icon-fangxiang"></span>
		</div>
		<div class="commit">
			<div class="commit-top">精彩评论</div>
			<ul class="commit-list" v-for="(item,index) in commitList" :key="index">
				<li>
					<div class="commit-box">
						<div class="commit-avatar">
							<img :src="`${item.user.avatarUrl}?param=100y100`">
						</div>
						<div class="commit-dec">
							<div class="commit-name">
								<div>
									<p>{{item.user.nickname}}</p>
									<p>{{item.time}}</p>
								</div>
								<div>
									<span :class="[item.liked ? 'colorRed' : '']">{{item.likedCount}}</span>
									<span class="iconfont" :class="[item.liked ? 'icon-dianzan' : 'icon-zan']" @click="praise(item,index)"></span>
								</div>
							</div>
							<div class="commit-content">
								<p>{{item.content}}</p>
								<!-- <div class="commit-obj"><span></span><span></span></div> -->
							</div>
						</div>
					</div>
				</li>

			</ul>
		</div>
		<div class="post-commit">
			<input type="text" placeholder="说点什么吧,也许Ta都听得到">
			<button type="button">发送</button>
		</div>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {
		mapMutations
	} from 'vuex';
	export default {
		name: 'commit',
		data() {
			return {
				commitCount: 0,
				commitList: [],
				
			}
		},
		methods: {
			...mapMutations(['setStatus']),
			back() {
				this.$router.go(-1);
			},
			praise(item,index) {
				console.log(this.$route.params.songSheet_id)
				console.log(item.commentId)
				console.log(item.liked ? 0 : 1)
				this.$axios.get('/comment/like', {
					params: {
						id: this.$route.params.songSheet_id,
						cid: item.commentId,
						t: item.liked ? 0 : 1,
						type:2,
						timestamp:Date.now(),
					},
				}).then(res=>{
					console.log(res)
					if(item.liked){
						this.commitList[index].liked = false;
						this.commitList[index].likedCount -= 1;
					}else{
						this.commitList[index].liked = true;
						this.commitList[index].likedCount += 1;
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		},
		computed: {
			...mapState(['playList', 'playIndex']),
		},
		mounted() {
			this.$axios.get('/comment/playlist', {
					params: {
						id: this.$route.params.songSheet_id,
						timestamp: Date.now(),
					}
				})
				.then(res => {
					console.log(res);
					this.commitCount = res.data.total;
					this.commitList = res.data.comments;
					let date;
					for (let i = 0; i < res.data.comments.length; i++) {
						date = new Date(res.data.comments[i].time)
						this.commitList[i].time = `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日`;
					}
				
				}).catch(err => {
					console.log(err);
				})
		},

	}
</script>

<style scoped>
	.sheet-info {
		padding: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}

	.sheet-info:hover {
		background-color: #ddd;
	}

	.sheet-info>div {
		display: flex;
		align-items: center;
	}

	.song-img {
		position: relative;
		display: inline-block;
		width: 75px;
		height: 75px;
	}

	.song-img img {
		width: 75px;
		height: 75px;
		border-radius: 10px;
	}

	.sheet-dec {
		display: inline-block;
		color: white;
		padding: 15px 15px;
	}

	.sheet-dec>p {
		color: #000000;
		font-size: 18px;
		padding: 3px 0px;
	}

	.sheet-dec>div>span {
		color: #c7c3c2;
	}

	.sheet-info>span {
		margin-right: 5px;
	}

	.commit-top {
		margin-bottom: 5px;
	}

	.commit {
		padding: 10px 15px;
		border-top: 7px solid #eee;
	}

	.commit:after {
		content: "";
		height: 30px;
		display: block;
	}

	.commit-box {
		padding: 5px 0px;
		display: flex;
	}

	.commit-avatar {
		/* display: inline-block; */
		margin-top: 3px;
	}

	.commit-avatar img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}

	.commit-dec {
		/* display: inline-block; */
		margin-left: 10px;
		width: 90%;
	}

	.commit-name {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.commit-name>div>p:first-child {
		font-size: 14px;
	}

	.commit-name>div>p:last-child {
		font-size: 12px;
		color: #adacac;
	}

	.commit-name>div>span {
		color: #888;
		font-size: 14px;
		margin-left: 5px;
	}

	.commit-content {
		padding: 10px 0px;
		border-bottom: 1px solid #eee;
	}

	.post-commit {
		position: fixed;
		left: 0;
		bottom: 0;
		border-top: 1px solid #ccc;
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 15px;
		box-sizing: border-box;
		background-color: white;
	}

	.post-commit input {
		width: 85%;
		height: 100%;
		font-size: 16px;
		color: #adacac;
		letter-spacing: 1px;
		border: 0;
		outline: 0;
	}

	.post-commit button {
		height: 90%;
		width: 15%;
		font-size: 16px;
		color: white;
		border: 1px solid #f83636;
		border-radius: 5px;
		background-color: #f83636;
	}

	.colorRed {
		color: red !important;
	}
	.commit-name div .icon-dianzan{
		color: red;
	}
</style>
