# vue-memo

[演示](https://youknowznm.github.io/demos/vue-memo/)。

- 基于 `vue` 的响应式适配的记事本应用
  - 支持 `markdown` 和涂鸦两种记录方式
  - 涂鸦编辑器基于另一个小项目 [paint](https://github.com/youknowznm/paint), 支持选取颜色, 撤销重做, 清除画布
  - 编辑笔记内容和标记完成状态
  - 按类别, 标题, 内容或时间戳进行过滤
  - 按创建时间或标题排序
  - 基于 `localStorage` 的暂存和数据持久化

---

10月21日更新:
  - 改善了移动端编辑器的体验: 在移动端限制主容器的高度并使溢出内容隐藏, 避免编辑器里的 `touch` 事件造成视口滚动

---

```bash
本地预览步骤:

$ npm i
$ npm run dev

在 8080 端口查看
```
