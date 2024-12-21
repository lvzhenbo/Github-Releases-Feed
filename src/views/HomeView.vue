<template>
  <div class="flex justify-center h-full">
    <NProgress
      type="line"
      :percentage
      indicator-placement="inside"
      processing
      v-if="!showedList.length"
    />
    <NInfiniteScroll class="!h-full !w-[800px]" :distance="10" @load="handleLoad" v-else>
      <div class="p-4" v-for="item in showedList" :key="item.id">
        <NCard hoverable size="small">
          <template #header>
            <div class="flex items-center">
              <NAvatar :size="48" :src="item.avatar" />
              <div class="ml-2 flex flex-col justify-between h-12">
                <div>
                  <NButton class="!text-base" text tag="a" :href="item.ownerUrl" target="_blank">{{
                    item.owner
                  }}</NButton
                  >/<NButton class="!text-base" text tag="a" :href="item.repoUrl" target="_blank">{{
                    item.repoName
                  }}</NButton>
                  released
                </div>
                <div class="text-sm">
                  <NTooltip trigger="hover" placement="right">
                    <template #trigger>
                      <NTime :time="new Date(item.publishedTime)" type="relative" />
                    </template>
                    <NTime :time="new Date(item.publishedTime)" />
                  </NTooltip>
                </div>
              </div>
            </div>
          </template>
          <NA :href="item.releaseUrl" target="_blank" class="underline text-2xl">
            {{ item.name }}
          </NA>
          <div v-html="item.body" class="custom-theme mt-4" :class="contentTheme"> </div>
        </NCard>
      </div>
    </NInfiniteScroll>
  </div>
</template>

<script setup lang="ts">
  import { Octokit } from 'octokit';
  import { micromark } from 'micromark';
  import { gfmHtml, gfm } from 'micromark-extension-gfm';
  import type { Res, StarredRepositoriesNode } from './types';
  import { useTokenStore } from '@/stores/token';

  interface Release {
    id: string;
    tagName: string;
    name: string;
    body: string;
    publishedTime: string;
    releaseUrl: string;
    avatar: string;
    repoName: string;
    repoUrl: string;
    owner: string;
    ownerUrl: string;
  }

  const osThemeRef = useOsTheme();
  const octokit = new Octokit({
    auth: useTokenStore().token,
  });
  const repoList = ref<StarredRepositoriesNode[]>([]);
  const releaseList = ref<Release[]>([]);
  const showedList = ref<Release[]>([]);
  const total = ref(0);
  const percentage = computed(() => {
    if (!total.value) {
      return 0;
    }
    return Math.trunc((repoList.value.length / total.value) * 100);
  });
  const contentTheme = computed(() => {
    return osThemeRef.value === 'dark' ? 'custom-theme-dark' : 'custom-theme-light';
  });

  onMounted(() => {
    getRepos();
  });

  const getRepos = async () => {
    const iterator = octokit.graphql.paginate.iterator<Res>(
      `
      query($cursor: String) {
        viewer {
          starredRepositories(first: 100, after: $cursor) {
            totalCount
            pageInfo {
              startCursor
              hasPreviousPage
              endCursor
              hasNextPage
            }
            nodes {
              name
              url
              owner {
                login
                avatarUrl
                url
              }
              releases(first: 10, orderBy: { field: CREATED_AT, direction: DESC }) {
                nodes {
                  id
                  name
                  tagName
                  description
                  publishedAt
                  url
                }
              }
            }
          }
        }
      }
    `,
    );
    for await (const res of iterator) {
      total.value = res.viewer.starredRepositories.totalCount;
      repoList.value.push(...res.viewer.starredRepositories.nodes);
    }
    for (const repo of repoList.value) {
      getRelease(repo);
    }
    releaseList.value.sort((a, b) => {
      return new Date(b.publishedTime).getTime() - new Date(a.publishedTime).getTime();
    });
    showedList.value = releaseList.value.slice(0, 10);
  };

  const getRelease = (repo: StarredRepositoriesNode) => {
    if (repo.releases.nodes.length > 0) {
      for (const release of repo.releases.nodes) {
        releaseList.value.push({
          id: release.id,
          tagName: release.tagName,
          name: release.name || release.tagName,
          body: release.description
            ? micromark(release.description, {
                allowDangerousHtml: true,
                extensions: [gfm()],
                htmlExtensions: [gfmHtml()],
              })
            : '',
          publishedTime: release.publishedAt || '',
          releaseUrl: release.url,
          avatar: repo.owner.avatarUrl,
          repoName: repo.name,
          repoUrl: repo.url,
          owner: repo.owner.login,
          ownerUrl: repo.owner.url,
        });
      }
    }
  };

  const handleLoad = () => {
    const start = showedList.value.length;
    const end = start + 10;
    showedList.value = showedList.value.concat(releaseList.value.slice(start, end));
  };
</script>

<style>
  @import '@/styles/matcha.css';
</style>
