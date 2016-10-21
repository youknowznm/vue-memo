import Vue from 'vue'
import App from './App.vue'
import helpers from './helpers'

new Vue({
  el: 'body',
  components: { App }
});

// 检测是否移动端
const ua = window.navigator.userAgent;
window.isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Mobile|UCWeb/i.test(ua)
  ? true
  : false;

// 调整所有 memo 的尺寸以响应浏览器
$(window).on('resize', () => {
  helpers.resizeMemos();
});
