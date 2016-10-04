// import Vue from 'vue'
// import App from './App.vue'
//
// new Vue({
//   el: '#app',
//   render: h => h(App)
// })

$(window).on('resize load', function() {
  //
  var memoWidth = $('.memo').eq(0).width();
  $('.memo').height(memoWidth + 50);
  //
  var popupTargetHeight = $('.popup').width() + 50;
  $('.popup')
    .height(popupTargetHeight)
    .css('marginTop', -(popupTargetHeight / 2))
    .css('marginLeft', -(popupTargetHeight / 2));
  //
  $('.edit-content').height(popupTargetHeight - 64);

});

$('body').on('mousemove', function(e) {
  bcgOffsetX = Math.ceil(e.pageX / 30);
  bcgOffsetY = Math.ceil(e.pageY / 30);
  $('.memos')
    .css('background-position-x', bcgOffsetX)
    .css('background-position-y', bcgOffsetY);
});
