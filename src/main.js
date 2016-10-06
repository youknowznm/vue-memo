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
  $('#edit-text-content').height(popupTargetHeight - 64);
  $('#edit-doodle-content')
    .attr('width', popupTargetHeight - 50)
    .attr('height', popupTargetHeight - 50);

});

$('body').on('mousemove', function(e) {
  bcgOffsetX = Math.ceil(e.pageX / 30);
  bcgOffsetY = Math.ceil(e.pageY / 30);
  $('.memos')
    .css('background-position-x', bcgOffsetX)
    .css('background-position-y', bcgOffsetY);
});


var getDoodle = function(canvasEle, imageData) {
  // console.log(canvasEle.offsetLeft, canvas.offsetTop);
  var canvas = $(canvasEle);
  var colors = document.createElement('ul');
  $('colors')
    .addClass('')
  // colors.
  // <ul class="colors">
  //   <li class="black"
  //     v-for="color in colors"
  //     :class="color.name"
  //     :data-selected="color.name === selectedColor.name ? true : false"
  //     @click="setColor(color.name)">
  //   </li>
  // </ul>`;
  var colors = [
    {
      name: 'black',
      regularCode: '#222',
      opagueCode: 'rgb(189, 189, 189)',
    },
    {
      name: 'green',
      regularCode: '#5cb85c',
      opagueCode: 'rgb(206, 234, 206)',
    },
    {
      name: 'yellow',
      regularCode: '#f0ad4e',
      opagueCode: 'rgb(251, 231, 202)',
    },
    {
      name: 'red',
      regularCode: '#d9534f',
      opagueCode: 'rgb(244, 203, 202)',
    },
    {
      name: 'white',
      regularCode: '#fff',
      opagueCode: '#fff',
    },
  ];

}

getDoodle(document.getElementById('edit-doodle-content'), null)
