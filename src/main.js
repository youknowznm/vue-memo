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

// 是的话，限制 vue-memo 元素，使溢出滚动
if (window.isMobile) {
  $('#vue-memo')
    .height(window.innerHeight - 60)
    .css('overflow', 'scroll');
}

// 调整所有 memo 的尺寸以响应浏览器
$(window).on('resize', () => {
  helpers.resizeMemos();
});

// 一个小小的视觉效果
$('body').on('mousemove', (evt) => {
  $('body')
    .css('background-position-x', Math.ceil(evt.pageX / 40))
    .css('background-position-y', Math.ceil(evt.pageY / 40));
});
window.ondeviceorientation = (evt) => {
  $('body')
    .css('background-position-x', evt.gamma)
    .css('background-position-y', evt.beta);
};
