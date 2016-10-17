<template>
<div class="memo-container">
  <div class="memo">
    <button class="mark"></button>
    <div class="memo-heading">
      <h5 class="title">{{ title }}</h5>
      <ul class="tools">
        <li class="edit"></li>
        <li class="delete"></li>
      </ul>
    </div>
    <h6 class="memo-info">
      <span class="timeStamp">{{ timeStamp }}</span>
      <span class="category">分类: {{ categories[categoryId] }}</span>
    </h6>
    <div class="content" :data-type="type === 0 ? 'text' : 'doodle'">
      <div v-if="type === 0" v-html="marked(content)"  class="text"></div>
      <img v-else :src="content" class="doodle" />
    </div>
  </div>
</div>
</template>

<script>
import store from '../storage';

export default {
  props: ['categoryId', 'type', 'title', 'content', 'timeStamp', 'isCompleted'],
  data () {
    return {
      memos: store.memos,
      categories: {
        1: '工作',
        2: '生活',
        3: '学习',
      },
    };
  },
  methods: {
    marked,
  },
}
</script>
