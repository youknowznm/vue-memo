<template>
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
    <span class="timeStamp">{{ timeStamp | toReadableDate }}</span>
    <span class="category">分类: {{ categories[categoryId] }}</span>
  </h6>
  <div class="content" :data-type="type === 0 ? 'text' : 'doodle'">
    <div v-if="type === 0" class="text">
      <!-- {{ content | marked }} -->
    </div>
    <img v-else :src="content" />
  </div>
</div>
</template>

<script>
import store from '../storage';
import filters from '../filters';

export default {
  props: ['categoryId', 'type', 'title', 'content', 'timeStamp', 'isCompleted'],
  data () {
    return {
      memos: store.memos,
      categories: {
        0: '工作',
        1: '生活',
        2: '学习',
      },
    };
  },
  created() {
    console.log('caonima');
    console.log(this);
    this.$el.getElementByClassName('text')[0].innerHTML = marked(content);
  },
  filters: {
    toReadableDate: filters.toReadableDate,
    marked: marked,
  }
}
</script>
