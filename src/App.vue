<template>
  <div id="vue-memo">

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
              <a class="create-new dropdown-toggle" data-toggle="dropdown" role="li">新建</a>
              <ul class="dropdown-menu">
                <li class="add-text">
                  <a>文本</a>
                </li>
                <li class="add-doodle">
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
                <li class="category" @click="filterBy(1, queryString)">
                  <a>
                    工作
                    <span class="count badge">{{ memosInWorkCate.length }}</span>
                  </a>
                </li>
                <li class="category" @click="filterBy(2, queryString)">
                  <a>
                    生活
                    <span class="count badge">{{ memosInLivingCate.length }}</span>
                  </a>
                </li>
                <li class="category" @click="filterBy(3, queryString)">
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
                  placeholder="过滤标题、内容、创建时间"
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

    <!-- <div id="editor-text" class="editor-layer">
      <div class="editor-top">
        <input id="editor-title" type="text" class="editor-title form-control" placeholder="标题">
        <ul class="tools">
          <li class="save"></li>
          <li class="cancel"></li>
        </ul>
      </div>
      <textarea id="editor-text-content" class="form-control" placeholder="内容"></textarea>
    </div> -->

    <!-- <div id="editor-doodle" class="editor-layer">
      <div class="editor-top">
        <input id="editor-title" type="text" class="form-control" placeholder="标题"></input>
        <ul class="tools">
          <li class="save"></li>
          <li class="cancel"></li>
        </ul>
      </div>
      <div id="canvas-wrapper">
        <ul class="colors">
          <li data-color="black"></li>
          <li data-color="green"></li>
          <li data-color="yellow"></li>
          <li data-color="red"></li>
          <li data-color="white"></li>
        </ul>
        <ul class="controllers">
          <li class="undo"></li>
          <li class="redo"></li>
          <li class="clear"></li>
        </ul>
        <canvas id="editor-doodle-content" width='300' height=300></canvas>
      </div>
    </div> -->

  </div>
</template>

<script>
import store from './storage';
import memoItem from './components/memoItem.vue';

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
    };
  },
  components: {
    memoItem,
  },
  methods: {
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
          result = this.memosInStudyCate;
          this.currentCategoryId = 2;
          break;
        case 3:
          result = this.memosInLivingCate;
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
    // 按【类别】或【创建时间】排序
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
  mounted () {
    this.filterBy(0, this.queryString);
    this.sortByTimeOrTitle('title');
  },
  updated () {
    resizeMemos();
  },
}

// 在组件 updated 、窗口重载和尺寸改变时，修改 memo 样式
const resizeMemos = () => {
  const memoWidth = $('.memo').eq(0).width();
  $('.memo').height(memoWidth + 65);
  $('.memo .content').width(memoWidth).height(memoWidth);
};

$(window).on('resize load', () => {
  resizeMemos();
});

</script>

<style lang="stylus">

$tint-grey = #e1e1e1
$grey = #bdbdbd
$dark-grey = #757575

$tint-blue = #4dabf5
$blue = #2196f3
$dark-blue = #207FDC

$bootstrap-grey = rgb(248, 248, 248)
$bootstrap-green = #5cb85c
$bootstrap-yellow = #f0ad4e
$bootstrap-red = #d9534f
$bootstrap-black = #222

$white = #fff

/*****  global  *****/

[v-cloak] {
  display: none;
}

*
  padding 0
  margin 0
  border 0
  list-style none
  text-decoration none

body
  padding-top 50px
  background url("/src/images/pixels.png")

blockquote
  p
    font-size 14px


/*****  main  *****/

#vue-memo
  border 1px solid $tint-grey
  box-shadow 0 0 4px 0 $tint-grey
  padding 0
  z-index 1


/*****  header  *****/

.navbar
  border-radius 0
  margin-bottom 0
  cursor default
  user-select none
  -moz-user-select none
  -ms-user-select none
  -webkit-user-select none

  .navbar-right
    padding-right 0

    .search-box
      min-width 210px

    a
      cursor pointer !important
      line-height 24px !important

    .navbar-form
      padding-right 0

    .sort-by
      min-width 135px

  .dropdown-toggle
    position relative
    padding-right 45px !important
    transition .2s ease-in-out

    &:hover
      background rgb(231, 231, 231) !important

    &:after
      content ' '
      width 24px
      height 24px
      background url("/src/images/icons/icon-dropdown.png") 0 0 no-repeat
      position absolute
      right 18px
      opacity .6
      top 8px

      @media (min-width 768px)
        top 15px

  .count
    border-radius 5px
    float right
    margin-top 3px

  .current-category .count
    float none
    margin -2px 6px 0 9px



/*****  main  *****/

#memos
  min-height 800px
  padding 0 6px

#memos-wrapper
  margin 0 auto

.memo-container
  padding 5px
  float left
  margin-top 10px

.memo
  position relative
  border 1px solid $grey
  border-radius 5px
  padding 9px
  background-color $white

  .mark
    display none
    position absolute
    width 24px
    height 24px
    top -8px
    left -8px
    border-radius 50%
    background $tint-blue url("/src/images/icons/icon-done.svg") no-repeat 3px 3px
    background-size 18px 18px
    transition all .2s ease-in-out
    cursor pointer

    &:hover
      transform scale(1.2)

  &:hover
    border-color $dark-blue

    .mark
      display block

  .memo-heading
    position relative
    width 100%

    .tools
      float right
      margin-top 6px

      > li
        width 20px
        height 20px
        float left
        margin-left 10px
        opacity .5
        transition opacity .2s ease-in-out

        &:hover
          cursor pointer
          opacity 1

        &.edit
          background url("/src/images/icons/icon-edit.png") no-repeat 0 0

        &.delete
          background url("/src/images/icons/icon-delete.png") no-repeat 0 0

        &.save
          background url("/src/images/icons/icon-save.png") no-repeat 0 0

        &.cancel
          background url("/src/images/icons/icon-cancel.png") no-repeat 0 0

    .title
      display inline-block
      margin-top 6px
      margin-bottom 6px
      padding-bottom 6px
      border-bottom 1px solid $grey
      text-overflow ellipsis
      white-space nowrap
      overflow hidden
      max-width calc(100% - 60px)

  .memo-info
    margin 0 auto 12px
    color $dark-grey
    font-weight 300

    .category
      float right

  .content
    border 1px solid $bootstrap-grey
    bottom 12px
    overflow-y scroll
    text-overflow ellipsis

    &[data-type=doodle]
      overflow hidden

    img
      width 100%
      height 100%

/*****  layers  *****/

.cover-layer
  display none
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  background-color $bootstrap-black
  opacity .5
  z-index 2

.editor-layer
  position absolute
  width 260px
  height 260px
  /*max-width 500px
  min-width 260px*/
  margin 0 auto
  top 50%
  left 50%
  z-index 3
  padding 24px
  border 1px solid $bootstrap-grey
  border-radius 3px
  box-shadow 0 0 6px 0 $bootstrap-grey

  .editor-top
    position relative
    width 100%

    .tools
      float right
      top 6px
      right 0

    #editor-title
      width calc(100% - 66px)

  #editor-text-content
    margin-top 18px
    resize none

#editor-doodle
  width 348px
  height 398px
  margin-left calc(-348px / 2)
  margin-top calc((-398px / 2))
  cursor pointer

  *
    cursor pointer

#canvas-wrapper
  position absolute
  width 302px
  height 302px
  bottom 24px

  .controllers
    position absolute
    top 6px
    right 6px

    > li
      float left
      width 24px
      height 24px
      opacity .5
      transition opacity .2s ease-in-out

      &:hover
        cursor pointer
        opacity 1

      &.undo
        background url("/src/images/icons/icon-undo.png") no-repeat 2px 2px
        background-size 83.3%

      &.redo
        background url("/src/images/icons/icon-redo.png") no-repeat 2px 2px
        background-size 83.3%

      &.clear
        background url("/src/images/icons/icon-clear.png") no-repeat 2px 2px
        background-size 83.3%

  .colors
    position absolute
    top 6px
    left 0
    padding 6px

    > li
      float left
      width 16px
      height 16px
      margin-left 6px
      border 2px solid $bootstrap-black
      border-radius 50%
      transition .2s ease-in-out

      &:hover,
      &.current
        box-shadow 0 0 4px $bootstrap-black
      &[data-color=green]
        background-color $bootstrap-green
      &[data-color=yellow]
        background-color $bootstrap-yellow
      &[data-color=red]
        background-color $bootstrap-red
      &[data-color=black]
        background-color $bootstrap-black
      &[data-color=white]
        background-color $white

  #editor-doodle-content
    border 1px solid $grey
    cursor pointer


/*****  reset  *****/


@media (max-width 370px)
  #editor-doodle
    padding 5px
    width 310px
    height 355px
    margin-left -155px

  #editor-doodle #canvas-wrapper
    bottom 5px

  .memo-container
    width 50%


@media (min-width 370px) and (max-width 768px)
  .memo-container
    width 50%


@media (min-width 768px) and (max-width 992px)
  .memo-container
    width 33.3%


@media (min-width 992px) and (max-width 1200px)
  .memo-container
    width 25%


@media (min-width 1200px)
  .memo-container
    width 25%

</style>
