<template>
<div>
  <canvas class="doodle-preview"></canvas>
</div>
</template>

<script>
export default {
  props: ['memo'],
  data () {
    return {
      imageData: memo.content,
    }
  },
  created () {
    let ctx = this.getContext('2d');
    ctx.drawImage(image, 0, 0);
  },
}
</script>
