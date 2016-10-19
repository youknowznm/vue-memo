import Vue from 'vue'
import App from './App.vue'
import helpers from './helpers'

new Vue({
  el: 'body',
  components: { App }
})

//
$(window).on('resize', () => {
  helpers.resizeMemos();
});
