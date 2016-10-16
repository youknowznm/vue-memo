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
            <li class="add dropdown">
              <a class="create-new dropdown-toggle" data-toggle="dropdown" role="li">新建</a>
              <ul class="dropdown-menu">
                <li class="add-text">
                  <a>
                    文本
                  </a>
                </li>
                <li class="add-doodle">
                  <a>
                    涂鸦
                  </a>
                </li>
              </ul>
            </li>

            <li class="categories dropdown">
              <a class="current-category dropdown-toggle" data-toggle="dropdown" role="li">
                {{ currentCategory }}<span class="count badge">{{ filteredMemos.length }}</span>
              </a>
              <ul class="dropdown-menu">
                <li class="total" @click="filterByCategoryId()">
                  <a>
                    全部<span class="count badge">{{ memos.length }}</span>
                  </a>
                </li>
                <li class="divider"></li>
                <li class="category" @click="filterByCategoryId(0)">
                  <a>
                    工作<span class="count badge">{{ memosInWorkCate.length }}</span>
                  </a>
                </li>
                <li class="category" @click="filterByCategoryId(1)">
                  <a>
                    生活<span class="count badge">{{ memosInLivingCate.length }}</span>
                  </a>
                </li>
                <li class="category" @click="filterByCategoryId(2)">
                  <a>
                    学习<span class="count badge">{{ memosInStudyCate.length }}</span>
                  </a>
                </li>
              </ul>
            </li>

            <li class="sort-by dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown">
                {{ currentSortBy }}
              </a>
              <ul class="dropdown-menu">
                <li @click="sortByTimeOrTitle('timeStampParsed')">
                  <a>按创建时间排序</a>
                </li>
                <li @click="sortByTimeOrTitle('title')">
                  <a>按标题排序</a>
                </li>
              </ul>
            </li>
            <li>
              <form class="navbar-form">
                <input type="text" class="search-box form-control" placeholder="过滤关键字">
              </form>
            </li>

          </ul>
        </div>
      </div>
    </nav>

    <div id="memos" class="container">
      <div id="memos-wrapper">

        <memo-item v-for="memo in filteredMemos"
          :categoryId="memo.categoryId"
          :type="memo.type"
          :title="memo.title"
          :content="memo.content"
          :timeStampParsed="memo.timeStampParsed"
          :isCompleted="memo.isCompleted">
        </memo-item>

      </div>
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
    </div>

    <div id="editor-doodle" class="editor-layer">
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
      currentSortBy: '',
      currentCategory: '全部',
      filteredMemos: store.memos,
    };
  },
  components: {
    memoItem,
  },
  methods: {
    sortByTimeOrTitle (option) {
      this.filteredMemos.sort((m1, m2) => {
        if (m1[option] < m2[option]) {
          return -1;
        } else {
          return 1;
        }
      });
      this.currentSortBy =
        option === 'timeStampParsed'
        ? '按创建时间排序'
        : '按标题排序';
    },
    filterByCategoryId (categoryId) {
      switch (categoryId) {
        case 0:
          this.filteredMemos = this.memosInWorkCate;
          this.currentCategory = '工作';
          break;
        case 1:
          this.filteredMemos = this.memosInLivingCate;
          this.currentCategory = '生活';
          break;
        case 2:
          this.filteredMemos = this.memosInStudyCate;
          this.currentCategory = '学习';
          break;
        case undefined:
          this.filteredMemos = this.memos;
          this.currentCategory = '全部';
          break;
      }
      this.sortByTimeOrTitle('title');
    },
  },
  filters: {

  },
  computed: {
    memosInWorkCate () {
      return this.memos.filter((item) => {
        return item.categoryId === 0;
      });
    },
    memosInLivingCate () {
      return this.memos.filter((item) => {
        return item.categoryId === 1;
      });
    },
    memosInStudyCate () {
      return this.memos.filter((item) => {
        return item.categoryId === 2;
      });
    },
  },
  mounted () {
    this.sortByTimeOrTitle('title');
  },
}
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
  /*font-family "Microsoft Yahei", "Serif"*/

body
  padding-top 50px

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

  .navbar-right
    padding-right 0

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

  a
    cursor pointer !important
    line-height 24px !important


/*****  main  *****/

#memos
  min-height 800px
  padding 0 6px
  background url("/src/images/pixels.png")

#memos-wrapper
  margin 0 auto

.memo
  display inline-block
  position relative
  width 280px
  border 1px solid $grey
  border-radius 5px
  margin-top 20px
  margin-left 5px
  margin-right 5px
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
    width 260px
    height 260px
    border 1px solid $bootstrap-grey
    bottom 12px
    padding 6px
    overflow-y scroll
    text-overflow ellipsis

    &[data-type=doodle]
      padding 0
      overflow hidden


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
  width 80%
  max-width 500px
  min-width 280px
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


@media (min-width 370px) and (max-width 768px)
  #memos-wrapper
    width 290px


@media (min-width 768px) and (max-width 992px)
  #memos-wrapper
    width 580px


@media (min-width 992px) and (max-width 1200px)
  #memos-wrapper
    width 870px


@media (min-width 1200px)
  #memos-wrapper
    width 1160px


</style>
