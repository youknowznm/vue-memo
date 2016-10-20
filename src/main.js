import Vue from 'vue'
import App from './App.vue'
import helpers from './helpers'

Vue.config.debug = true;

new Vue({
  el: 'body',
  components: { App }
})

//
$(window).on('resize load', () => {
  helpers.resizeMemos();
});
