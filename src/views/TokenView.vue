<template>
  <div class="h-full flex items-center justify-center">
    <div>
      <NCard title="GitHub Token" hoverable class="!w-[600px]">
        <NInputGroup>
          <NInput v-model:value="token" type="text" placeholder="请输入 GitHub Token" />
          <NButton type="primary" @click="handleSaveToken"> 确定 </NButton>
        </NInputGroup>
      </NCard>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTokenStore } from '@/stores/token';

  const token = ref('');
  const router = useRouter();

  const handleSaveToken = () => {
    if (!token.value) {
      return;
    }
    useTokenStore().token = token.value;
    router.push('/');
  };
</script>

<style></style>
