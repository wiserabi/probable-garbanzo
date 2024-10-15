<template>
  <v-app style="background-color: #ffffff;">
    <!--<TopMenu />-->

    <Navi />

    <Content />
    <Footer></Footer>
  </v-app>
</template>

<script lang="ts" setup>
  import Navi from './Navi.vue';
  import Content from './Content.vue';
  import Footer from './Footer.vue';
</script>

<style scoped>
</style>
