<template>
  <div>
    This is inner component: <b>{{ name }}</b>
  </div>
</template>
<script>
  export default {
    props: ['name']
  }
</script>