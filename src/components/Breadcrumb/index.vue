<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in lists" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>

export default {
  data(){
    return {
      lists:[]
    }
  },
  methods:{

  },
  watch:{
    $route(to,from){
      this.lists = to.matched;
    }
  },
  mounted(){
    this.lists = this.$route.matched;
  }
}
</script>

<style>
.breadcrumb{
  margin-left: 5px;
  margin-top: 5px;
  line-height: 3;
}
</style>