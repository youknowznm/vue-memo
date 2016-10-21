# vue-memo

DEMO在[这里](https://youknowznm.github.io/demos/vue_memo/)。

一个用 vue 1.0 写的笔记本应用，实现了以下功能：
  - 增删、编辑笔记
  - 标记笔记是否为已完成状态
  - 按`类别`、`标题`、`内容`或`时间戳`进行过滤
  - 按`创建时间`或`标题`排序
  - 暂存未确认保存的笔记
  - 支持文本和涂鸦两种记录方式
    * 文本编辑器支持`markdown`格式
    * 涂鸦编辑器（来自我的[另一个项目](https://github.com/youknowznm/paint)）支持`选取颜色`、`撤销`、`重做`、`清除画布`等功能
  - 通过`localStorage`对象实现数据的本地持久化
  - 适配桌面端和移动端
  
TODO：
  - 编辑笔记时的输入内容验证
  - 用`Firebase`代替本地存储

---

10月21日更新：
  - 改善了移动端编辑器的体验：在移动端限制主容器的高度并使溢出内容隐藏，避免编辑器里的`touch`事件造成视口滚动

---
  
![桌面端](https://github.com/youknowznm/youknowznm.github.io/blob/master/hehehe/desktop.png)

![移动端](https://github.com/youknowznm/youknowznm.github.io/blob/master/hehehe/mobile.png)


## 怎么用？

``` bash
npm install

npm run dev

npm run build
```
