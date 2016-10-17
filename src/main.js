import Vue from 'vue'
import App from './App.vue'
import helpers from './helpers'

new Vue({
  el: '#vue-memo',
  render: h => h(App)
});

//
$(window).on('resize load', () => {
  helpers.resizeMemos();
});
