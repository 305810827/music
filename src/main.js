import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './util/axios'
import './assets/font/iconfont.css'
import loading from './plugin/loading/index.js'

Vue.config.productionTip = false
Vue.prototype.$axios = axios; //this.$axios

router.beforeEach((to, from, next) => {
	let user = localStorage.getItem('user');
	if (to.name == 'login') {
		user ? next({
			name: 'index'
		}) : next();
	} else {
		user ? next() : ext({
			name: 'login'
		});
	}
})
// function (el, binding)
// Vue.directive('loading',  {
// 	inserted(el, binding) {
// 		console.log("inserted")
// 		if (binding.value) {
// 			var div = document.createElement('div');
// 			div.innerHTML =
// 				`<div id="loading" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color:#fffefa;opacity: 0.5;">
// 					<div class="load-box" style="width:180px;height:220px;background-color:rgba(89,89,89,1);border-radius:10px;position:absolute;top:50%;left:50%;
// 					margin-top: -110px;margin-left: -90px;display: flex;flex-direction: column;align-items: center;justify-content: center;">
// 					<div style="animation:loading 3s linear infinite"><span class="iconfont icon-dengdai" style="font-size:85px;color:white;"></span></div>
// 						<p style="font-size: 20px;color: white;-webkit-user-select: none;">loading</p>
// 					</div>
// 				</div>`
// 			el.append(div)
// 		} else {
// 			// el.removeChild(document.getElementById('loading').parentNode)
// 		}
// 	},
// 	update(el, binding) {
// 		console.log("update")
// 		// console.log(el , binding)
// 		if (binding.value) {
// 			var div = document.createElement('div');
// 			div.innerHTML =
// 				`<div id="loading" class="screen" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color:#fffefa;opacity: 0.5;">
// 					<div class="load-box" style="width:180px;height:220px;background-color:rgba(89,89,89,1);border-radius:10px;position:absolute;top:50%;left:50%;
// 					margin-top: -110px;margin-left: -90px;display: flex;flex-direction: column;align-items: center;justify-content: center;">
// 					<div style="animation:loading 2s linear infinite"><span class="iconfont icon-dengdai" style="font-size:85px;color:white;"></span></div>
// 						<p style="font-size: 20px;color: white;-webkit-user-select: none;">loading</p>
// 					</div>
// 				</div>`
// 			el.append(div)
// 		} else {
// 			try{
// 				el.removeChild(document.getElementById('loading').parentNode)
// 				el.removeChild(document.getElementById('loading').parentNode)
// 			}catch(e){
// 				// console.log(e);
// 				return;
// 			}
// 		}
// 	}
// })
Vue.use(loading);
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
