<template>
  <div class="header-view">
    <el-button icon="el-icon-s-unfold" v-if="!isShow" v-show="!isShow" @click="isShow=!isShow"></el-button>
    <el-button icon="el-icon-s-fold" v-else v-show="isShow" @click="isShow=!isShow"></el-button>
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
      isShow: true,
    }
  },
  methods: {
    isShow() {
      this.isShow = !this.isShow;
    }
  }
}
</script>

<style>
.header-view {
  height: 80px;
  box-shadow: 0 5px 5px #ddd;
  button {
    width: 50px;
    height: 50px;
    font-size: 24px;
    border: none;
    padding: 12px 10px;
  }
}
</style>