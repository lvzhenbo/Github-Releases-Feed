<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <RouterView />
  </NConfigProvider>
</template>

<script setup lang="ts">
  import { zhCN, dateZhCN } from 'naive-ui';
</script>

<style scoped></style>
