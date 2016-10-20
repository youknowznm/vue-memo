<template>
  <div>

    <div id="new-markdown" class="editor-layer">
      <div class="editor-top">
        <input class="editor-title form-control" type="text" placeholder="标题"
          v-model="newMarkdown.title">
        <div class="dropdown select-category">
          <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
            <span class="category">{{ categories[newMarkdown.categoryId] }}</span>
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li @click="newMarkdown.categoryId = 1"><a>工作</a></li>
            <li @click="newMarkdown.categoryId = 2"><a>生活</a></li>
            <li @click="newMarkdown.categoryId = 3"><a>学习</a></li>
          </ul>
        </div>
        <ul class="tools">
          <li class="save" @click="saveNewMarkdown"></li>
          <li class="cancel" @click="hideAllEditorLayers"></li>
        </ul>
      </div>
      <textarea class="text-content form-control" placeholder="内容"
        v-model="newMarkdown.content">
      </textarea>
    </div>


    <div id="new-doodle" class="editor-layer">
      <div class="editor-top">
        <input class="editor-title form-control" type="text" placeholder="标题"
          v-model="newDoodle.title">
        <div class="dropdown select-category">
          <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
            <span class="category">{{ categories[newDoodle.categoryId] }}</span>
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li @click="newDoodle.categoryId = 1"><a>工作</a></li>
            <li @click="newDoodle.categoryId = 2"><a>生活</a></li>
            <li @click="newDoodle.categoryId = 3"><a>学习</a></li>
          </ul>
        </div>
        <ul class="tools">
          <li class="save" @click="saveNewDoodle"></li>
          <li class="cancel" @click="closeDoodleEditor"></li>
        </ul>
      </div>
      <div class="canvas-wrapper">
        <ul class="doodle-colors">
          <li data-color="black"></li>
          <li data-color="green"></li>
          <li data-color="yellow"></li>
          <li data-color="red"></li>
          <li data-color="white"></li>
        </ul>
        <ul class="doodle-controllers">
          <li class="undo"></li>
          <li class="redo"></li>
          <li class="clear"></li>
        </ul>
        <canvas class="doodle-content" width='260' height='260'></canvas>
      </div>
    </div>

    <div id="edit-markdown" class="editor-layer">
      <div class="editor-top">
        <input class="editor-title form-control" type="text" placeholder="标题">
        <ul class="tools">
          <li class="save" @click="saveExistingMarkdown"></li>
          <li class="cancel" @click="hideAllEditorLayers"></li>
        </ul>
      </div>
      <textarea class="text-content form-control" placeholder="内容"></textarea>
    </div>

    <div id="edit-doodle" class="editor-layer">
      <div class="editor-top">
        <input class="editor-title form-control" type="text" placeholder="标题">
        <ul class="tools">
          <li class="save" @click="saveExistingDoodle"></li>
          <li class="cancel" @click="hideAllEditorLayers"></li>
        </ul>
      </div>
      <div class="canvas-wrapper">
        <ul class="doodle-colors">
          <li data-color="black"></li>
          <li data-color="green"></li>
          <li data-color="yellow"></li>
          <li data-color="red"></li>
          <li data-color="white"></li>
        </ul>
        <ul class="doodle-controllers">
          <li class="undo"></li>
          <li class="redo"></li>
          <li class="clear"></li>
        </ul>
        <canvas class="doodle-content" width='260' height='260'></canvas>
      </div>
    </div>

  </div>
</template>

<script>
import helpers from '../helpers';
import storeUtil from '../storage';

let store = storeUtil.store;
let Memo = storeUtil.Memo;

export default {
  data () {
    return {
      helpers,
      categories: {
        1: '工作',
        2: '生活',
        3: '学习',
      },
      // 新增的 markdown memo 对象
      newMarkdown: new Memo({
        categoryId: 1,
        title: '',
        type: 0,
        content: '',
      }),
      // 新增的 doodle memo 对象
      newDoodle: new Memo({
        categoryId: 1,
        title: '',
        type: 1,
        content: '',
      }),
      // 被编辑的 memo 对象
      memoToEdit: null,
    };
  },
  methods: {
    // 新建
    saveNewMarkdown () {
      let $markdownEditor = $('#new-markdown');
      store.add(new Memo({
        categoryId: this.newMarkdown.categoryId,
        title: this.newMarkdown.title,
        type: 0,
        content: this.newMarkdown.content,
      }));
      store.saveToLocalStorage();
      this.newMarkdown.content = this.newMarkdown.title = '';
      this.hideAllEditorLayers();
    },
    saveNewDoodle () {
      let canvasEle = $('#new-doodle .doodle-content')[0];
      this.newDoodle.content = canvasEle.toDataURL();
      store.add(new Memo({
        categoryId: this.newDoodle.categoryId,
        title: this.newDoodle.title,
        type: 1,
        content: this.newDoodle.content,
      }));
      store.saveToLocalStorage();
      this.newDoodle.content = this.newDoodle.title = '';
      this.hideAllEditorLayers();
    },
    // 编辑
    saveExistingMarkdown () {
      let $markdownEditor = $('#edit-markdown');
      let newTitle = $markdownEditor.find('.editor-title').val();
      let newContent = $markdownEditor.find('.text-content').val();
      let agentMemo = new Memo({
        categoryId: this.memoToEdit.categoryId,
        title: newTitle,
        type: 0,
        content: newContent,
        timeStamp: this.memoToEdit.timeStamp,
        isCompleted: this.memoToEdit.isCompleted,
      });
      store.update(this.memoToEdit, agentMemo);
      store.saveToLocalStorage();
      this.hideAllEditorLayers();
    },
    saveExistingDoodle () {
      let $markdownEditor = $('#edit-doodle');
      let newTitle = $markdownEditor.find('.editor-title').val();
      let newContent = $markdownEditor.find('.doodle-content')[0].toDataURL();
      let agentMemo = new Memo({
        categoryId: this.memoToEdit.categoryId,
        title: newTitle,
        type: 1,
        content: newContent,
        timeStamp: this.memoToEdit.timeStamp,
        isCompleted: this.memoToEdit.isCompleted,
      });
      store.update(this.memoToEdit, agentMemo);
      store.saveToLocalStorage();
      this.hideAllEditorLayers();
    },
    // 点击关闭按钮
    hideAllEditorLayers () {
      helpers.hideEditorLayer($('.editor-layer'));
    },
    // 关闭时，新 markdown 的内容被 vue 自动同步了，所以关闭它的编辑窗口时不需要额外操作；但 doodle 不能自动同步
    closeDoodleEditor () {
      let canvasEle = $('#new-doodle .doodle-content')[0];
      this.newDoodle.content = canvasEle.toDataURL();
      this.hideAllEditorLayers();
    },
  },
  events: {
    createMarkdown () {
      helpers.showEditorLayer($('#new-markdown'));
    },
    createDoodle () {
      let $doodleEditor = $('#new-doodle');
      helpers.showEditorLayer($doodleEditor);
      // 部署画布和控制器相关的方法，提供空画布
      helpers.initCanvas(
        $doodleEditor.find('.doodle-content')[0],
        $doodleEditor.find('.doodle-colors')[0],
        $doodleEditor.find('.doodle-controllers')[0],
        null,
      );
    },
    editMarkdown (memo) {
      this.memoToEdit = memo;
      let $markdownEditor = $('#edit-markdown');
      $markdownEditor.find('.editor-title').val(memo.title);
      $markdownEditor.find('.text-content').html(memo.content);
      helpers.showEditorLayer($markdownEditor);
    },
    editDoodle (memo) {
      this.memoToEdit = memo;
      let $doodleEditor = $('#edit-doodle');
      $doodleEditor.find('.editor-title').val(memo.title);
      helpers.showEditorLayer($doodleEditor);
      // 部署画布和控制器相关的方法，传入涂鸦的 imageData
      helpers.initCanvas(
        $doodleEditor.find('.doodle-content')[0],
        $doodleEditor.find('.doodle-colors')[0],
        $doodleEditor.find('.doodle-controllers')[0],
        this.memoToEdit.content,
      );
    },
  },
}
</script>
