<template>
  <v-container class="mt-5" fluid>
    <v-row align="end" dense justify="end">
      <v-col cols="1" />
      <v-col align="center" class="ml-3" cols="1">
        <span class="title">영업리스트</span>
      </v-col>
      <v-col cols="6" />
      <v-col align="end" class="mr-8 mt-3" cols="3">
        <span class="mr-3">페페님 로그인중</span>
        <v-avatar class="mb-3" size="32px">
          <v-img
            alt="페페"
            src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
          />
        </v-avatar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
//
</script>

<style scoped>
  span {
    font-size: 12px;
    color: #909090;
  }

  .title {
    font-size: 15px;
    font-weight: bold;
    color: #000000;
  }
</style>
