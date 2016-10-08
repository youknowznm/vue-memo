<template>
  <div id="vue-memo">

    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand">vue-memo</a>
        </div>
        <ul class="nav navbar-nav">
          <li class="add dropdown">
            <a href="#" class="create-new dropdown-toggle" data-toggle="dropdown" role="li">新建</a>
            <ul class="dropdown-menu">
              <li class="add-text">
                <a href="#">
                  文本
                </a>
              </li>
              <li class="add-doodle">
                <a href="#">
                  涂鸦
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <form class="navbar-form navbar-right">
          <input type="text" class="search-box form-control" placeholder="过滤关键字">
        </form>
        <ul class="nav navbar-nav navbar-right">
          <li class="sort-by dropdown">
            <a href="#" class="current-category dropdown-toggle" data-toggle="dropdown" role="li">
              按标题排序
            </a>
            <ul class="dropdown-menu">
              <li class="by-timestamp">
                <a href="#">
                  按标题排序
                </a>
              </li>
              <li class="by-name">
                <a href="#">
                  按创建时间排序
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li class="categories dropdown">
            <a href="#" class="current-category dropdown-toggle" data-toggle="dropdown" role="li">
              分类<span class="count badge">14</span>
            </a>
            <ul class="dropdown-menu">
              <li class="total">
                <a href="#">
                  全部<span class="count badge">14</span>
                </a>
              </li>
              <li role="separator" class="divider"></li>
              <li class="category">
                <a href="#">
                  工作<span class="count badge">14</span>
                </a>
              </li>
              <li class="category">
                <a href="#">
                  生活<span class="count badge">14</span>
                </a>
              </li>
              <li class="category">
                <a href="#">
                  学习<span class="count badge">14</span>
                </a>
              </li>
              <li role="separator" class="divider"></li>
              <li class="category"><a href="#">新增分类</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>

    <div id="memos">
      <div class="memo-container">
        <div class="memo">
          <button class="mark"></button>
          <div class="memo-top">
            <ul class="tools">
              <li class="edit"></li>
              <li class="delete"></li>
            </ul>
            <h5 class="title">标题标题标题标题标题标题标题标题标题标题标题</h5>
          </div>
          <div class="content text">
            <p>Screen readers will have trouble with your forms if you don't include a label for every input. For these inline forms, you can hide the labels using the .sr-only class. There are further alternative methods of providing a label for assistive technologies, such as the aria-label, aria-labelledby or title attribute. If none of these is present, screen readers may resort to using the placeholder attribute, if present, but note that use of placeholder as a replacement fo</p>
          </div>
        </div>
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
export default {
  data () {
    return {
      msg: 'Hello Vue!'
    }
  }
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

*
  padding 0
  margin 0
  border 0
  list-style none
  text-decoration none


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

  .dropdown-toggle
    position relative
    padding-right 45px !important
    transition .2s

    &:hover
      background rgb(231, 231, 231) !important

    &:after
      content ' '
      width 24px
      height 24px
      background url("/src/images/icon-dropdown.png") 0 0 no-repeat
      position absolute
      right 18px
      top 13px
      opacity .6

  .count
    border-radius 5px
    float right
    margin-top 3px

  .current-category .count
    float none
    margin -2px 6px 0 9px

  .add-text a,
  .category a
    line-height 24px !important


/*****  main  *****/

#memos
  height 1000px
  padding 0 6px
  background url("/src/images/pixels.png")

.memo-container
  width 100%
  float left
  padding 6px

.memo
  position relative
  margin-top 20px
  border 1px solid $grey
  border-radius 5px
  padding 6px 12px
  background-color $white

  .mark
    display none
    position absolute
    width 24px
    height 24px
    top -8px
    left -8px
    border-radius 50%
    background $tint-blue url("/src/images/done.svg") no-repeat 3px 3px
    background-size 18px 18px
    transition all .2s
    cursor pointer

    &:hover
      transform scale(1.2)

  &:hover
    border-color $dark-blue

    .mark
      display block

  .memo-top
    position relative
    width 100%

    .tools
      position absolute
      top 8px
      right 0

      > li
        width 20px
        height 20px
        float left
        margin-left 10px
        opacity .5
        transition opacity .2s

        &:hover
          cursor pointer
          opacity 1

        &.edit
          background url("/src/images/icon-edit.png") no-repeat 0 0

        &.delete
          background url("/src/images/icon-delete.png") no-repeat 0 0

        &.save
          background url("/src/images/icon-save.png") no-repeat 0 0

        &.cancel
          background url("/src/images/icon-cancel.png") no-repeat 0 0

  .title
    display inline-block
    text-indent 6px
    margin-top 8px
    padding-bottom 12px
    border-bottom 1px solid $grey
    text-overflow ellipsis
    white-space nowrap
    overflow hidden
    max-width calc(100% - 60px)

  .content
    width 100%
    height calc(100% - 50px)
    background-color $bootstrap-grey
    bottom 12px

  .text
    padding 12px
    overflow-y scroll
    text-overflow ellipsis


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
      transition opacity .2s

      &:hover
        cursor pointer
        opacity 1

      &.undo
        background url("/src/images/icon-undo.png") no-repeat 2px 2px
        background-size 83.3%

      &.redo
        background url("/src/images/icon-redo.png") no-repeat 2px 2px
        background-size 83.3%

      &.clear
        background url("/src/images/icon-clear.png") no-repeat 2px 2px
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
      transition .2s

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

@media (max-width 325px)
  #editor-doodle
    padding 5px
    width 310px
    height 355px
    margin-left -155px

  #editor-doodle #canvas-wrapper
    bottom 5px

  .memo-container
    width 100%


@media (min-width 325px) and (max-width 768px)
  .memo-container
    width 50%


@media (min-width 768px) and (max-width 992px)
  .memo-container
    width 33.3%


@media (min-width 992px)
  .memo-container
    width 25%
</style>
