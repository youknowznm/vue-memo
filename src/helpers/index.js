// 在组件 updated 、窗口重载和尺寸改变时，修改 memo 样式
const resizeMemos = () => {
  const memoWidth = $('.memo').eq(0).width();
  $('.memo').height(memoWidth + 65);
  $('.memo .content').width(memoWidth).height(memoWidth);
};

// 显示/隐藏编辑窗口、禁用/启用滚动
const showEditorLayer = (editorSelector) => {
  $(window).scrollTop(0);
  $('.cover-layer').fadeIn('fast');
  $(editorSelector).fadeIn('fast');
  $('.navbar')
    .css('padding-right', '14px');
  $('body')
    .css('padding-right', '14px')
    .css('overflow', 'hidden');
};
const hideEditorLayer = (editorSelector) => {
  $('.cover-layer').hide();
  $(editorSelector).hide();
  $('.navbar')
    .css('padding-right', '0');
  $('body')
    .css('padding-right', '0')
    .css('overflow', 'scroll');
};

let helpers = {
  resizeMemos,
  showEditorLayer,
  hideEditorLayer,
};

export default helpers;
