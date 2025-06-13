<template>
  <div class="layout">
    <NavBar></NavBar>
    <div class="layout-right">
      <HeaderView></HeaderView>
      <ContainerView></ContainerView>
    </div>
  </div>
</template>

<script>
import ContainerView from "@/views/layout/ContainerView.vue";
import HeaderView from "@/views/layout/HeaderView.vue";
import NavBar from "@/views/layout/NavBar.vue";

export default {
  components: { NavBar , ContainerView , HeaderView },
  data() {
    return {

    }
  }
}
</script>

<style>
.layout {
  width: 100%;
  height: 100%;
  display: flex ;
  .layout-right{
    flex: 1;
  }
}
</style>