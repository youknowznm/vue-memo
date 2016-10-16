import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#vue-memo',
  render: h => h(App)
});

const resizeMemosAndEditLayers = () => {
  const memoWidth = $('.memo').eq(0).width();
  $('.memo').height(memoWidth + 65);
  console.log(memoWidth);
  $('.memo .content')
    .width(memoWidth)
    .height(memoWidth);


  let editLayerHeight = $('.editor-layer').width() + 50;
  $('#editor-text')
    .height(editLayerHeight)
    .css('marginTop', -(editLayerHeight / 2))
    .css('marginLeft', -(editLayerHeight / 2));
  $('#editor-text-content').height(editLayerHeight - 64);
}


$(window).on('resize load', () => {
  resizeMemosAndEditLayers();
});


const setCanvas = (canvasEle, colorsEle, controllersEle, imageData) => {

  // 颜色值对象
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

  // 初始化 context
  let ctx = canvasEle.getContext('2d');
  let selectedColor = null;
  let hasOnGoingStroke = false;
  let prevStatusStack = [];
  let futureStatusStack = [];
  let $canvas = $(canvasEle);

  // 方法：将 imageData 写入一个 Image 对象，画在 canvas 上
  const loadImageData = (data) => {
    let img = new Image();
    img.src = data;
    img.onload = () => {
      clearCanvas();
      ctx.drawImage(img, 0, 0);
    };
  }
  // 方法：存储当前的 canvas 内容为 imageData，推入状态栈
  const saveImageData = () => {
    let currentStatus = canvasEle.toDataURL(0, 0, 300, 300);
    prevStatusStack.unshift(currentStatus);
  };
  // 方法：清除画布
  const clearCanvas = () => {
    ctx.clearRect(0, 0, 300, 300);
  };
  // 若提供了 imageData 参数就画出来
  if (imageData !== null) {
    loadImageData(imageData);
  }
  // 然后无论此时是否已有内容，推入状态栈一次
  saveImageData();

  // 颜色选择器鼠标事件
  $(colorsEle)
    .on('click', (evt) => {
      $target = $(evt.target);
      const tarColorName = $target.data('color');
      selectedColor = colorTable.find((item) => {
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
  $canvas.on('mousedown touchstart', (evt) => {
      let stX, stY;
      console.log(evt);
      switch (evt.type) {
        case 'touchstart':
          stX = evt.targetTouches[0].clientX;
          stY = evt.targetTouches[0].clientY;
          break;
        default:
          stX = evt.offsetX;
          stY = evt.offsetY;
          break;
      }
      hasOnGoingStroke = true;
      ctx.strokeStyle = selectedColor.opagueCode;
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.imageSmoothingEnabled = true;
      ctx.beginPath();
      ctx.moveTo(stX, stY);
    })
    .on('mousemove touchmove', (evt) => {
      if (hasOnGoingStroke === true) {
        let mdX, mdY;
        switch (evt.type) {
          case 'touchmove':
            mdX = evt.changedTouches[0].clientX;
            mdY = evt.changedTouches[0].clientY;
            break;
          default:
            mdX = evt.offsetX;
            mdY = evt.offsetY;
            break;
        }
        ctx.lineTo(mdX, mdY);
        ctx.stroke();
      }
    })
    .on('mouseout mouseup touchend', (evt) => {
      if (hasOnGoingStroke === true) {
        let edX, edY;
        switch (evt.type) {
          case 'touchend':
            edX = evt.changedTouches[0].clientX;
            edY = evt.changedTouches[0].clientY;
            break;
          default:
            edX = evt.offsetX;
            edY = evt.offsetY;
            break;
        }
        ctx.strokeStyle = selectedColor.regularCode;
        ctx.lineTo(edX, edY);
        ctx.stroke();
        hasOnGoingStroke = false;
        saveImageData();
      }
    });

  // 控制器鼠标事件
  $(controllersEle)
    .children('.undo')
    .on('click', (evt) => {
      if (prevStatusStack.length !== 0) {
        loadImageData(prevStatusStack[0]);
        let currentStep = prevStatusStack.splice(0, 1);
        futureStatusStack.unshift(currentStep);
      }
    })
    .end()
    .children('.redo')
    .on('click', (evt) => {
      if (futureStatusStack.length !== 0) {
        loadImageData(futureStatusStack[0]);
        let currentStep = futureStatusStack.splice(0, 1);
        prevStatusStack.unshift(currentStep);
      }
    })
    .end()
    .children('.clear')
    .on('click', () => {
      clearCanvas();
    });
}

// setCanvas(
//   document.getElementById('editor-doodle-content'),
//   $('#editor-doodle .colors'),
//   $('#editor-doodle .controllers'),
//   null);
