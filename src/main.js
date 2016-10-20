import Vue from 'vue'
import App from './App.vue'
import helpers from './helpers'

new Vue({
  el: 'body',
  components: { App }
});

// 调整所有 memo 的尺寸以响应浏览器
$(window).on('resize', () => {
  helpers.resizeMemos();
});
