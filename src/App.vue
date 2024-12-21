<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" :theme>
    <NLayout content-class="min-h-screen">
      <NLayoutHeader bordered>
        <div class="p-4">
          <NGradientText size="24"> Github Releases Feed </NGradientText>
        </div>
      </NLayoutHeader>
      <NLayoutContent
        position="absolute"
        class="!top-[4.5rem] !bottom-16"
        content-class="h-full"
        :native-scrollbar="false"
      >
        <RouterView />
      </NLayoutContent>
      <NLayoutFooter position="absolute">
        <div class="flex justify-center h-16">
          <NButton
            text
            tag="a"
            href="https://github.com/lvzhenbo/Github-Releases-Feed"
            target="_blank"
          >
            <template #icon>
              <NIcon>
                <GithubFilled />
              </NIcon>
            </template>
            GitHub
          </NButton>
        </div>
      </NLayoutFooter>
    </NLayout>
  </NConfigProvider>
</template>

<script setup lang="ts">
  import { zhCN, dateZhCN, darkTheme, lightTheme } from 'naive-ui';
  import { GithubFilled } from '@vicons/antd';

  const osThemeRef = useOsTheme();
  const theme = computed(() => {
    return osThemeRef.value === 'dark' ? darkTheme : lightTheme;
  });
</script>

<style scoped></style>
