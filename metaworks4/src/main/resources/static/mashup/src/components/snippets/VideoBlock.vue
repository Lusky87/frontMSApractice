<template>
  <div data-type="component-video" data-preview="snippets/default/preview/video.png" data-keditor-title="Video" data-categories="Media">
    <div class="video-wrapper">
      <video width="320" height="180" controls style="background: #222;">
        <source src="http://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        <source src="http://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg" />
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: "video-block"
}
</script>

<style scoped>

</style>