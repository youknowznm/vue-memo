<template>
  <div id="vue-memo">

    <!--  工具栏  -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand">vue-memo</a>
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse" aria-expanded="false">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse navbar-right">
          <ul class="nav navbar-nav">

            <!--  新建  -->
            <li class="add dropdown">
              <a class="create-new dropdown-toggle" data-toggle="dropdown">新建</a>
              <ul class="dropdown-menu">
                <li @click="launchMarkdownEditor">
                  <a>Markdown</a>
                </li>
                <li @click="launchDoodleEditor">
                  <a>涂鸦</a>
                </li>
              </ul>
            </li>

            <!--  类别过滤器  -->
            <li class="categories dropdown">
              <a class="current-category dropdown-toggle" data-toggle="dropdown">
                {{ categories[currentCategoryId] }}
                <span class="count badge">{{ memosFiltered.length }}</span>
              </a>
              <ul class="dropdown-menu">
                <li class="total" @click="filterBy(0, queryString)">
                  <a>
                    全部
                    <span class="count badge">{{ memos.length }}</span>
                  </a>
                </li>
                <li class="divider"></li>
                <li @click="filterBy(1, queryString)">
                  <a>
                    工作
                    <span class="count badge">{{ memosInWorkCate.length }}</span>
                  </a>
                </li>
                <li @click="filterBy(2, queryString)">
                  <a>
                    生活
                    <span class="count badge">{{ memosInLivingCate.length }}</span>
                  </a>
                </li>
                <li @click="filterBy(3, queryString)">
                  <a>
                    学习
                    <span class="count badge">{{ memosInStudyCate.length }}</span>
                  </a>
                </li>
              </ul>
            </li>

            <!--  排序器  -->
            <li class="sort-by dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown">
                {{ currentSortBy }}
              </a>
              <ul class="dropdown-menu">
                <li @click="sortByTimeOrTitle('timeStamp')">
                  <a>按创建时间排序</a>
                </li>
                <li @click="sortByTimeOrTitle('title')">
                  <a>按标题排序</a>
                </li>
              </ul>
            </li>

            <!--  字符串过滤器  -->
            <li>
              <form class="navbar-form">
                <input
                  type="text"
                  class="search-box form-control"
                  placeholder="过滤标题、内容、时间戳"
                  v-model="queryString"
                  @keyup="filterBy(currentCategoryId, queryString)">
              </form>
            </li>

          </ul>
        </div>
      </div>
    </nav>

    <div id="memos" class="container">
      <memo-item v-for="memo in memosFiltered" :memo="memo"></memo-item>
    </div>

    <div class="editor-markdown editor-layer">
      <div class="editor-top">
        <input class="editor-title form-control" type="text" placeholder="标题"
          v-model="editor.markdownTitle">
        <div class="dropdown select-category">
          <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
            {{ categories[editor.markdownCategoryId] }}
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li @click="editor.markdownCategoryId = 1"><a>工作</a></li>
            <li @click="editor.markdownCategoryId = 2"><a>生活</a></li>
            <li @click="editor.markdownCategoryId = 3"><a>学习</a></li>
          </ul>
        </div>
        <ul class="tools">
          <li class="save" @click="saveMarkdownMemo"></li>
          <li class="cancel" @click="helpers.hideEditorLayer('.editor-markdown')"></li>
        </ul>
      </div>
      <textarea class="text-content form-control" placeholder="内容"
        v-model="editor.markdownContent">
      </textarea>
    </div>

    <div class="editor-doodle editor-layer">
      <div class="editor-top">
        <input class="editor-title form-control" type="text" placeholder="标题"
          v-model="editor.doodleTitle">
        <div class="dropdown select-category">
          <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
            {{ categories[editor.doodleCategoryId] }}
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li @click="editor.doodleCategoryId = 1"><a>工作</a></li>
            <li @click="editor.doodleCategoryId = 2"><a>生活</a></li>
            <li @click="editor.doodleCategoryId = 3"><a>学习</a></li>
          </ul>
        </div>
        <ul class="tools">
          <li class="save" @click="saveDoodleMemo"></li>
          <li class="cancel" @click="helpers.hideEditorLayer('.editor-doodle')"></li>
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
import storeUtil from './storage';
import helpers from './helpers';
import memoItem from './components/memoItem.vue';
let store = storeUtil.store;
let Memo = storeUtil.Memo;
export default {
  data () {
    return {
      // memo 对象相关
      memos: store.memos,
      memosFiltered: [],
      currentSortBy: '',
      currentCategoryId: '',
      queryString: '',
      categories: {
        0: '全部',
        1: '工作',
        2: '生活',
        3: '学习',
      },
      // 样式相关
      helpers,
      // 新建
      editor: {
        markdownTitle: '',
        markdownContent: '',
        markdownCategoryId: 1,
        doodleTitle: '',
        doodleContent: '',
        doodleCategoryId: 1,
        // 被编辑的 memo 对象
        memoEditing: null,
      },
    };
  },
  components: {
    memoItem,
  },
  methods: {
    // 过滤
    filterBy (categoryId, queryString) {
      let result = [];
      // 先按照【类别id】过滤
      switch (categoryId) {
        case 0:
          result = this.memos;
          this.currentCategoryId = 0;
          break;
        case 1:
          result = this.memosInWorkCate;
          this.currentCategoryId = 1;
          break;
        case 2:
          result = this.memosInLivingCate;
          this.currentCategoryId = 2;
          break;
        case 3:
          result = this.memosInStudyCate;
          this.currentCategoryId = 3;
          break;
      }
      if (queryString !== '') {
        result = result.filter((item) => {
          let matchesQuery = false;
          // 若【标题】或【日期字符串】包含查询字符串
          if (item.title.indexOf(queryString) !== -1 || item.timeStamp.indexOf(queryString) !== -1) {
            matchesQuery = true;
          }
          // 或【文本类型 memo 的内容】包含查询字符串
          if (item.type === 0 && item.content.indexOf(queryString) !== -1) {
            matchesQuery = true;
          }
          // 则过滤之
          return matchesQuery;
        });
      }
      this.memosFiltered = result;
      this.sortByTimeOrTitle('title');
    },
    // 排序
    sortByTimeOrTitle (option) {
      this.memosFiltered.sort((m1, m2) => {
        if (m1[option] < m2[option]) {
          return -1;
        } else {
          return 1;
        }
      });
      this.currentSortBy =
        option === 'timeStamp'
        ? '按创建时间排序'
        : '按标题排序';
    },
    // 新建和编辑
    launchMarkdownEditor (imageData) {
      helpers.showEditorLayer('.editor-markdown');
    },
    saveMarkdownMemo () {
      store.add(new Memo({
        categoryId: this.editor.markdownCategoryId,
        title: this.editor.markdownTitle,
        type: 0,
        content: this.editor.markdownContent,
      }));
      helpers.hideEditorLayer('.editor-markdown');
      store.saveToLocalStorage();
      this.editor.markdownContent = this.editor.markdownTitle = '';
    },
    launchDoodleEditor (imageData) {
      let $doodleEditor = helpers.showEditorLayer('.editor-doodle');
      // 部署画布和控制器相关的方法，提供 imageData 时画出来
      helpers.initDoodle(
        $doodleEditor.find('.doodle-content')[0],
        $doodleEditor.find('.doodle-colors')[0],
        $doodleEditor.find('.doodle-controllers')[0],
        imageData,
      );
    },
    saveDoodleMemo () {
      this.editor.doodleContent = $('.doodle-content')[0].toDataURL();
      store.add(new Memo({
        categoryId: this.editor.doodleCategoryId,
        title: this.editor.doodleTitle,
        type: 1,
        content: this.editor.doodleContent,
      }));
      helpers.hideEditorLayer('.editor-doodle');
      store.saveToLocalStorage();
      this.editor.doodleContent = this.editor.doodleContent = '';
    },
  },
  computed: {
    memosInWorkCate () {
      return this.memos.filter((item) => {
        return item.categoryId === 1;
      });
    },
    memosInLivingCate () {
      return this.memos.filter((item) => {
        return item.categoryId === 2;
      });
    },
    memosInStudyCate () {
      return this.memos.filter((item) => {
        return item.categoryId === 3;
      });
    },
  },
  // 周期钩子
  ready () {
    this.filterBy(0, this.queryString);
    this.sortByTimeOrTitle('title');
    helpers.resizeMemos();
  },
};
</script>

<style lang="stylus">
@import './style/main'
</style>
