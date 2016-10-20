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
                <li @click="createMarkdown">
                  <a>Markdown</a>
                </li>
                <li @click="createDoodle">
                  <a>涂鸦</a>
                </li>
              </ul>
            </li>
            <!--  -->

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
            <!--  -->

            <!--  排序器  -->
            <li class="sort-by dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown">
                {{ currentSortBy }}
              </a>
              <ul class="dropdown-menu">
                <li @click="sortByTimeOrTitle('title')">
                  <a>按标题排序</a>
                </li>
                <li @click="sortByTimeOrTitle('timeStamp')">
                  <a>按创建时间排序</a>
                </li>
              </ul>
            </li>
            <!--  -->

            <!--  字符串过滤器  -->
            <li>
              <input
                type="text"
                class="search-box form-control"
                placeholder="过滤标题、内容、时间戳"
                v-model="queryString"
                @keyup="filterBy(currentCategoryId, queryString)">
            </li>
            <!--  -->

          </ul>
        </div>
      </div>
    </nav>

    <!--  memos  -->
    <div id="memos" class="container">
      <memo-item v-for="memo in memosFiltered" :memo="memo"></memo-item>
    </div>
    <!--  -->

    <!--  编辑器  -->
    <memo-editor></memo-editor>
    <!--  -->

  </div>
</template>

<script>
import helpers from './helpers';
import storeUtil from './storage';
import memoItem from './components/memoItem.vue';
import memoEditor from './components/memoEditor.vue';

let store = storeUtil.store;
let Memo = storeUtil.Memo;

export default {
  data () {
    return {
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
      helpers,
    };
  },
  components: {
    memoItem,
    memoEditor,
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
    // 接收 memoItem 组件分发来的事件，广播给 memoEditor 组件
    createMarkdown () {
      this.$broadcast('createMarkdown');
    },
    createDoodle () {
      this.$broadcast('createDoodle');
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
  events: {
    editMarkdown (memo) {
      this.$broadcast('editMarkdown', memo);
    },
    editDoodle (memo) {
      this.$broadcast('editDoodle', memo);
    },
  },
  // 周期钩子
  ready () {
    this.filterBy(0, this.queryString);
    this.sortByTimeOrTitle('title');
  },
  watch: {
    memosFiltered () {
      helpers.resizeMemos();
    }
  }
};
</script>

<style lang="stylus">
@import './style/main'
</style>
