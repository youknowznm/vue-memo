// import Vue from 'vue'
// import App from './App.vue'
//
// new Vue({
//   el: '#app',
//   render: h => h(App)
//

$(window).on('resize load', () => {
  //
  let editLayerHeight = $('.editor-layer').width() + 50;
  $('#editor-text')
    .height(editLayerHeight)
    .css('marginTop', -(editLayerHeight / 2))
    .css('marginLeft', -(editLayerHeight / 2));
  //
  $('#editor-text-content').height(editLayerHeight - 64);

});

$('body').on('mousemove', (e) => {
  $('.memos')
    .css('background-position-x', Math.ceil(e.pageX / 30))
    .css('background-position-y', Math.ceil(e.pageY / 30));
});


const setCanvas = (canvasEle, colorsEle, controllersEle, imageData) => {
  // 颜色表对象
  const colorTable = [
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
  // get context
  let ctx = canvasEle.getContext('2d');
  let selectedColor = null;
  let hasOnGoingStroke = false;
  let statusStack = [];
  let $canvas = $(canvasEle);
  // 方法：将 imageData 写入一个 Image 对象，画在 canvas 上
  const loadImageData = (data) => {
    let img = new Image();
    img.src = data;
    clearCanvas();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }
  // 方法：存储当前的 canvas 内容为 imageData，推入状态栈
  const saveImageData = () => {
    let currentStatus = canvasEle.toDataURL(0, 0, 300, 300);
    statusStack.push(currentStatus);
  };
  // 方法：清除画布
  const clearCanvas = () => {
    ctx.clearRect(0, 0, 300, 300);
  };
  // 提供了 imageData 参数，就画出来，
  if (imageData !== null) {
    loadImageData(imageData);
  }
  // 无论此时是否已有内容，推入状态栈一次
  saveImageData();
  // 颜色选择器鼠标事件
  $(colorsEle)
    .on('click', (evt) => {
      $target = $(evt.target);
      const tarColorName = $target.data('color');
      selectedColor = colorTable.find( (item) => {
        return item.name === tarColorName;
      });
      $target
        .siblings('.current')
        .removeClass('current')
        .end()
        .addClass('current');
    })
    .children('[data-color=black]')
    .click();
  // canvas 鼠标事件
  $canvas.on('mousedown', (evt) => {
      hasOnGoingStroke = true;
      ctx.strokeStyle = selectedColor.opagueCode;
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.imageSmoothingEnabled = true;
      ctx.beginPath();
      ctx.moveTo(evt.offsetX, evt.offsetY);
    })
    .on('mousemove', (evt) => {
      if (hasOnGoingStroke === true) {
        ctx.lineTo(evt.offsetX, evt.offsetY);
        ctx.stroke();
      }
    })
    .on('mouseout mouseup', (evt) => {
      if (hasOnGoingStroke === true) {
        ctx.strokeStyle = selectedColor.regularCode;
        ctx.lineTo(evt.offsetX, evt.offsetY);
        ctx.stroke();
        hasOnGoingStroke = false;
        saveImageData();
      }
    });

  // 控制器鼠标事件
  $(controllersEle)
    .children('.undo')
    .on('click', (evt) => {
      if (!$(evt.target).hasClass('disabled')) {
        loadImageData(statusStack[statusStack.length - 2]);
      }
    })
    .end()
    .children('.redo')
    .on('click', (evt) => {
      if (!$(evt.target).hasClass('disabled')) {
        saveImageData();
      }
    })
    .end()
    .children('.clear')
    .on('click', () => {
      clearCanvas();
    });


}

setCanvas(
  document.getElementById('editor-doodle-content'),
  $('#editor-doodle .colors'),
  $('#editor-doodle .controllers'),
  null);
