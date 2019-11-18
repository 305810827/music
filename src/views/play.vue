<template>
	<div class="container"> 
		<div class="top">
			<span class="iconfont icon-back" @click="back"></span>
			<div>
				<p>{{playList[playIndex].name}}</p>
				<p v-for="(item,index) in playList[playIndex].ar" :key="index">
					<span>{{item.name}}</span>
					<span v-if="index !== playList[playIndex].ar.length-1">/</span>
				</p>
			</div>
			<span class="iconfont icon-fenxiang"></span>
		</div>
		<div class="disk" id="disk">
			<div class="diskAni" :class="[status ? 'diskAni-running' : 'diskAni-paused']">
				<div class="diskImg-box">
					<img class="diskImg" src="../assets/img/disk.png">
				</div>
				<div class="alImg-box"><img class="alImg" :src="playList[playIndex].al.picUrl+'?param=200y200'"></div>
			</div>
		</div>
		<ul class="func-icon">
			<li><span class="iconfont icon-xinaixin"></span></li>
			<li><span class="iconfont icon-xiazai"></span></li>
			<li><span class="iconfont icon-xinaixin"></span></li>
			<li><span class="iconfont icon-pinglun" @click="toCommit"></span></li>
			<li><span class="iconfont icon-sandianshuzhuode"></span></li>
		</ul>
		<div class="audio">
			<div class="audio-progress">
				<span class="time__current">{{this.$store.getters.formatCurrentTime}}</span>
				<div class="slider-container">
					<div id="slider" class="slider" @click.stop="clickProgress" ref="slider">
						<div class="slider-progress" ref="progress">
							<div class="progress-buffer"></div>
						</div>
						<div class="slider-runway" @touchstart.stop="setIsDrag(true)" @touchmove.stop="moveProgress" @touchend.stop="moveProgressEnd" ref="runway">
							<div class="thumb" ></div>
						</div>
					</div>
				</div><span class="time__end">{{this.$store.getters.formatDurationTime}}</span>
			</div>
		</div>
		<ul class="play-icon">
			<li><span class="iconfont icon-aixin"></span></li>
			<li><span class="iconfont icon-shangyishoushangyige1" @click="pre"></span></li>
			<li><span :class="[status?'iconfont icon-zanting':'iconfont icon-bofang-']" @click="changeStatus"></span></li>
			<li><span class="iconfont icon-shangyishoushangyige" @click="next"></span></li>
			<li><span class="iconfont icon-bofangliebiao" @click.stop="toggleSongSheet(true)"></span></li>
		</ul>
		<div class="song-sheet-box" @click.stop="toggleSongSheet(false)" v-show="toggle"></div>
		<transition name="slide-fade">
		<div class="song-sheet" v-show="toggle">
			<div class="sheet-top">
				<div>
					<span class="iconfont icon-xunhuanbofang"></span>
					<span>列表循环</span>
					<span>({{playList.length}})</span>
				</div>
				<div>
					<span class="iconfont icon-wenjian"></span>
					<span>收藏全部</span><span>|</span>
					<span class="iconfont icon-lajitong"></span>
				</div>
			</div>
			<ul class="sheet">
				<li v-for="(item,index) in playList" :key="index">
						<div class="song-dec" :class="[playIndex == index ? 'colorRed' : '']" @click="toPlaySong(index)">
							<span v-if="playIndex == index" class="iconfont icon-iconfonthuodonggonggao"></span>
							<p>{{item.name}}</p>
							<span v-for="(songer,songerIndex) in item.ar" :key="songerIndex" >
								-{{songer.name}}
								<span v-if="songerIndex !== (item.ar.length-1)">/</span>
							</span>
						</div>
					<div class="song-icon" :class="[playIndex == index ? 'colorRed' : '']">
						<span v-if="playIndex == index" class="playing">正在播放</span>
						<span class="iconfont icon-chushaixuanxiang" @click="deleteSong(index)"></span>
					</div>
				</li>
			</ul>
		</div>
		</transition>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import {mapMutations} from 'vuex';
	import formatTime from '../assets/js/formatTime.js';
	export default {
		name: 'play',
		data() {
			return {
				toggle:false,
				currentPosition:0,
			}
		},
		methods: {
			...mapMutations(['setStatus','reduceIndex','addIndex','setPlayIndex','playSong','setPlayList','setChangeCurTime','setIsDrag','setCurrentTime']),
			back: function() {
				this.$router.go(-1);
			},
			changeStatus() {
				this.status ? this.setStatus(false) : this.setStatus(true);
			},
			pre() {
				this.playIndex > 0 ? this.reduceIndex() : this.setPlayIndex(this.$store.state.playList.length - 1);
				this.playSong();
			},
			next() {
				this.playIndex < this.playList.length - 1 ? this.addIndex() : this.setPlayIndex(0);
				this.playSong();
			},
			//进度条点击事件
			clickProgress(e) {
				const percent = (e.clientX - this.$refs.slider.offsetLeft) / this.$refs.slider.offsetWidth * 100;
				this.currentPosition = Math.max(0, Math.min(percent, 100));
				//设置公共库的改变后的curTime的值
				this.setChangeCurTime(this.currentPosition);
				this.updateView();
			},
			//滑块拖动事件
			moveProgress(e){
				const percent = (e.changedTouches[0].clientX - this.$refs.slider.offsetLeft) / this.$refs.slider.offsetWidth * 100;
				this.currentPosition = Math.max(0, Math.min(percent, 100));
				//设置公共库的改变后的curTime的值
				this.setCurrentTime(this.currentPosition*this.duration/100);
				this.updateView();
			},
			//滑块拖动结束事件
			moveProgressEnd(){
				this.setIsDrag(false);
				this.setChangeCurTime(this.currentPosition);
			},
			//进度条和滑块随播放进度前进
			moveSliderProgress(){
				const percent = (this.currentTime/this.duration);
				this.currentPosition = percent * 100;
				this.updateView();
			},
			//更新视图
			updateView(){
				this.$refs.progress.style.width = this.currentPosition + '%';
				this.$refs.runway.style.left = this.currentPosition+"%";
			},
			//歌单列表动画切换值
			toggleSongSheet(flag){
				this.toggle=flag;
			},
			//删除指定歌曲
			deleteSong(index){
				if(index < this.playIndex){
					this.reduceIndex();
				}
				let list = this.playList;
				list.splice(index,1);
				if(index == list.length){
					this.setPlayIndex(0);
				}
				this.setPlayList(list);
				this.playSong();
			},
			//播放指定歌曲
			toPlaySong(index){
				this.setPlayIndex(index);
				this.playSong();
			},
			toCommit(){
				this.$router.push({name:'commit'});
			}
		},
		mounted(){
			
		},
		computed: {
			...mapState(['playList','playIndex','status','duration','currentTime','isDrag']),
			watchCurrentTime(){
				return this.currentTime
			}
		},
		watch: {
			//监听app.vue里的播放歌曲的进度时间是否改变
			watchCurrentTime: function(newVal, oldVal) {
				if(this.isDrag) return;
				this.moveSliderProgress();
			}
		},
		
		
	}
</script>

<style scoped>
	.container {
		width: 100%;
		position: relative;
		background-image: linear-gradient(to top left, #434343, #c5c4c4);
	}

	.top>div>p:last-child {
		font-size: 12px;
		color: #adacac;
	}

	.disk {
		width: 68%;
		/* height: 45%; */
		margin: 100px auto;
		text-align: center;
		position: relative;
		/* width: 100%; */
	}
	.diskAni {
		animation: diskRotate 8s linear infinite;
	}
	.diskAni-paused{
		animation-play-state: paused;
	}
	.diskAni-running{
		animation-play-state: running;
	}
	@keyframes diskRotate {
		from {
			transform: rotate(0deg)
		}
		to {
			transform: rotate(360deg)
		}
	}

	.diskImg-box {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		/* z-index: 99; */
	}

	.diskImg {
		width: 100%;
	}

	.alImg-box {
		/* position: absolute; */
		/* top: 0px;
		left: 0px; */
		width: 100%;
		box-sizing: border-box;
		padding: 40px;
	
		/* z-index: 98; */
	}

	.alImg {
		width: 100%;
		border-radius: 50%;
	}

	.func-icon {
		display: flex;
		justify-content: space-around;
		color: white;
	}

	.func-icon li span {
		font-size: 20px;
	}

	.pro {
		display: flex;
		justify-content: space-around;
		margin-top: 20px;
	}

	.play-icon {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 20px;
		color: white;
	}

	.play-icon li {
		width: 100px;
		height: 50px;
		text-align: center;
		line-height: 50px;
	}

	.play-icon li span {
		font-size: 23px;
	}

	.play-icon li:nth-child(3) span {
		font-size: 45px;
	}
	/* 进度条样式 */
	.audio {
		display: flex;
		align-items: center;
		width: 100%;
		height: 46px;
		color: #fff;
		/* background: rgb(40,41,35); */
		user-select: none;
		margin-top: 30px;
	}

	.slider-container {
		width: 100%;
		margin: 0 1em;
	}

	.slider {
		position: relative;
		width: 100%;
		height: 5px;
		border-radius: 3px;
		/* background: rgba(144,147,153,1); */
		background: #b4b4b4;
		cursor: pointer;
	}

	.slider .slider-progress {
		height: 100%;
		width: 0;
		border-radius: 3px;
		background: #B82525;
	}

	.slider .slider-runway {
		position: absolute;
		top: 50%;
		width: 16px;
		height: 16px;
		margin-top: -8px;
		transform: translateX(-50%);
	}

	.slider .slider-runway .thumb {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 12px;
		height: 12px;
		margin: -6px 0 0 -6px;
		border: 4px solid #fff;
		background: #B82525;
		border-radius: 50%;
		box-sizing: border-box;
	}

	.audio .audio-progress {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 90%;
		height: 100%;
		font-size: 12px;
		margin-left: auto;
		margin-right: auto;
	}

	.audio-progress .time__current,
	.audio-progress .time__end {
		display: inline-block;
		width: 4.5em;
		text-align: center;
		color: #cdcdcd;
	}
	
	/* 播放列表的背景蒙版 */
	.song-sheet-box{
		position: fixed;
		top: 0px;
		left: 0px;
		width:100%;
		height: 100%;
		background-color: rgba(200,200,200,0.5);
		z-index: 98;
		box-sizing: border-box;
	}
	/* 播放列表样式 */
	.song-sheet{
		position: fixed;
		bottom: 0;
		left: 0;
		height: 60%;
		width: 100%;
		box-sizing: border-box;
		padding: 15px;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		background-color: white;
		z-index: 99;
	}
	.sheet-top{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height:30px;
		line-height: 30px;
	}
	.sheet-top div:first-child span{
		margin-right: 5px;
		font-size: 16px;
	}
	.sheet-top div:last-child span{
		margin-left: 5px;
		font-size: 16px;
		
	}
	.sheet-top div span:nth-child(2){
		font-weight: bold;
	}

	.sheet{
		margin-top: 10px;
		height: 92%;
		overflow-y: scroll;
	}
	.sheet::-webkit-scrollbar {
        display: none;
    }
	.sheet li{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		width: 100%;
		box-sizing: border-box;
	}
	.song-dec{
		display: inline-block;
		width: 70%;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.song-dec p{
		display: inline-block;
		font-size:14px ;
	}
	.song-dec span{
		font-size: 12px;
		color: #adacac;
	}
	.song-icon span{
		color: #adacac;
		font-size: 14px;
		
	}
	.song-dec .icon-iconfonthuodonggonggao{
		color: red;
		font-size: 16px;
		margin-right: 3px;
	}
	.song-icon .playing{
		display: inline-block;
		border:1px solid red;
		border-radius: 10px;
		padding-left: 5px;
		padding-right: 5px;
		color: red;
		box-sizing: border-box;
		margin-right: 15px;
		font-size: 12px;
	}
	.colorRed{
		color:red;
	}
	/* 歌单动画效果 */
	/* 进入效果 */
	.slide-fade-enter-active{
		transition: all .5s ease;
	}
	/* 离开效果 */
	.slide-fade-leave-active{
		transition: all .5s ease;
	}
	.slide-fade-enter, .slide-fade-leave-to {
	  transform: translateY(60%);
	  opacity: 0;
	}
</style>
