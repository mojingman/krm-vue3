<script lang="ts" setup>
import type {
  WorkbenchProjectItem,
  WorkbenchQuickNavItem,
  WorkbenchTodoItem,
} from '@kris/common-ui';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  WorkbenchHeader,
  WorkbenchQuickNav,
  WorkbenchTodo,
} from '@kris/common-ui';
import { $t } from '@kris/locales';
import { preferences } from '@kris/preferences';
import { useUserStore } from '@kris/stores';
import { openWindow } from '@kris/utils';

// import AnalyticsVisitsSource from '../analytics/analytics-visits-source.vue';

const userStore = useUserStore();

// 同样，这里的 url 也可以使用以 http 开头的外部链接
const quickNavItems: WorkbenchQuickNavItem[] = [
  {
    color: '#1fdaca',
    icon: 'ion:home-outline',
    title: $t('workspace.home'),
    url: '/',
  },
  {
    color: '#bf0c2c',
    icon: 'ion:grid-outline',
    title: $t('workspace.dashboard'),
    url: '/dashboard',
  },
  {
    color: '#e18525',
    icon: 'ion:layers-outline',
    title: $t('workspace.subassembly'),
    url: '/demos/features/icons',
  },
  {
    color: '#3fb27f',
    icon: 'ion:settings-outline',
    title: $t('workspace.systemManagement'),
    url: '/demos/features/login-expired', // 这里的 URL 是示例，实际项目中需要根据实际情况进行调整
  },
  {
    color: '#4daf1bc9',
    icon: 'ion:key-outline',
    title: $t('workspace.permissionManagement'),
    url: '/demos/access/page-control',
  },
  {
    color: '#00d8ff',
    icon: 'ion:bar-chart-outline',
    title: $t('workspace.chart'),
    url: '/analytics',
  },
];

const todoItems = ref<WorkbenchTodoItem[]>([
  {
    completed: true,
    content: $t('workspace.securityCheckMessage'),
    date: '2024-07-30 11:00:00',
    title: $t('workspace.securityCheck'),
  },
  {
    completed: true,
    content: $t('workspace.securityCheckMessage'),
    date: '2024-07-30 11:00:00',
    title: $t('workspace.securityCheck'),
  },
  {
    completed: false,
    content: $t('workspace.securityCheckMessage'),
    date: '2024-07-30 11:00:00',
    title: $t('workspace.securityCheck'),
  },
  {
    completed: false,
    content: $t('workspace.securityCheckMessage'),
    date: '2024-07-30 11:00:00',
    title: $t('workspace.securityCheck'),
  },
  {
    completed: false,
    content: $t('workspace.securityCheckMessage'),
    date: '2024-07-30 11:00:00',
    title: $t('workspace.securityCheck'),
  },
  {
    completed: false,
    content: $t('workspace.securityCheckMessage'),
    date: '2024-07-30 11:00:00',
    title: $t('workspace.securityCheck'),
  },
  {
    completed: false,
    content: $t('workspace.securityCheckMessage'),
    date: '2024-07-30 11:00:00',
    title: $t('workspace.securityCheck'),
  },
  {
    completed: false,
    content: $t('workspace.securityCheckMessage'),
    date: '2024-07-30 11:00:00',
    title: $t('workspace.securityCheck'),
  },
  {
    completed: false,
    content: $t('workspace.securityCheckMessage'),
    date: '2024-07-30 11:00:00',
    title: $t('workspace.securityCheck'),
  },
  {
    completed: false,
    content: $t('workspace.securityCheckMessage'),
    date: '2024-07-30 11:00:00',
    title: $t('workspace.securityCheck'),
  },
]);

const router = useRouter();

// 这是一个示例方法，实际项目中需要根据实际情况进行调整
// This is a sample method, adjust according to the actual project requirements
function navTo(nav: WorkbenchProjectItem | WorkbenchQuickNavItem) {
  if (nav.url?.startsWith('http')) {
    openWindow(nav.url);
    return;
  }
  if (nav.url?.startsWith('/')) {
    router.push(nav.url).catch((error) => {
      console.error('Navigation failed:', error);
    });
  } else {
    console.warn(`Unknown URL for navigation item: ${nav.title} -> ${nav.url}`);
  }
}
</script>

<template>
  <div class="p-5">
    <WorkbenchHeader
      :avatar="userStore.userInfo?.avatar || preferences.app.defaultAvatar"
    >
      <template #title>
        {{
          $t('workspace.greeting', { userName: userStore.userInfo?.realName })
        }}
      </template>
      <template #description> {{ $t('workspace.weatherDesc') }} </template>
    </WorkbenchHeader>

    <div class="mt-5 flex flex-col lg:flex-row">
      <!--      <div class="mr-4 w-full lg:w-3/5">
        <WorkbenchProject :items="projectItems" title="项目" @click="navTo" />
        <WorkbenchTrends :items="trendItems" class="mt-5" title="最新动态" />
      </div>-->
      <div class="lg:w-5/5 w-full">
        <WorkbenchQuickNav
          :items="quickNavItems"
          class="mt-5 lg:mt-0"
          :title="$t('workspace.quickNavigation')"
          @click="navTo"
        />
        <WorkbenchTodo
          :items="todoItems"
          class="mt-5"
          :title="$t('workspace.toDos')"
        />
        <!--        <AnalysisChartCard class="mt-5" title="访问来源">
          <AnalyticsVisitsSource />
        </AnalysisChartCard>-->
      </div>
    </div>
  </div>
</template>
