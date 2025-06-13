<template>
  <div class="header-view">
    <Breadcrumb />
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb/index.vue";
export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {

    }
  }
}
</script>

<style>
.header-view {
  height: 80px;
  box-shadow: 0 5px 5px #ddd;
}
</style>