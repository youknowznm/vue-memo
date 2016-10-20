# vue-memo

[DEMO在这里](https://youknowznm.github.io/demos/vue_memo/)

一个用 vue 1.0 写的笔记本应用，实现了以下功能：
  - 基本的增删、编辑笔记
  - 标记笔记是否为完成状态
  - 按类别、标题、内容、时间戳进行过滤
  - 按创建时间或标题排序
  - 暂存未确认保存的笔记
  - 支持 markdown 和涂鸦两种记录方式
  - 用 localStorage 存取数据，不手动 clear 的话算是个本地的简易数据库吧
  - 移动端适配（虽然体验不如桌面……不过我也不是设计师，已经尽力了）
  
TODO
  - **移动端的涂鸦有个 bug 正在修…**
  - 编辑笔记时的输入内容验证
  - 用 Firebase 代替本地存储

  
![桌面端](https://github.com/youknowznm/youknowznm.github.io/blob/master/hehehe/desktop.png)

![移动端](https://github.com/youknowznm/youknowznm.github.io/blob/master/hehehe/mobile.png)


## 怎么用？

``` bash
npm install

npm run dev

npm run build
```
