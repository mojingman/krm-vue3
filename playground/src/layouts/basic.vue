<script lang="ts" setup>
import type { NotificationItem } from '@kris/layouts';

import { computed, onBeforeMount, ref, watch } from 'vue';

import { AuthenticationLoginExpiredModal } from '@kris/common-ui';
// import { KRIS_DOC_URL, KRIS_GITHUB_URL } from '@kris/constants';
import { useWatermark } from '@kris/hooks';
// import { BookOpenText, CircleHelp, MdiGithub } from '@kris/icons';
import {
  BasicLayout,
  LockScreen,
  Notification,
  UserDropdown,
} from '@kris/layouts';
import { preferences } from '@kris/preferences';
import { useAccessStore, useTabbarStore, useUserStore } from '@kris/stores';
// import { openWindow } from '@kris/utils';

// import { $t } from '#/locales';
import { useAuthStore } from '#/store';
import LoginForm from '#/views/_core/authentication/login.vue';

const { setMenuList } = useTabbarStore();
setMenuList([
  'close',
  'affix',
  'maximize',
  'reload',
  'open-in-new-window',
  'close-left',
  'close-right',
  'close-other',
  'close-all',
]);

const notifications = ref<NotificationItem[]>([
  {
    avatar:
      'https://sqlview.com.sg/wp-content/uploads/Paperless-Office-Software-Client-Scoot.png',
    date: '3 hours ago',
    isRead: true,
    message: 'notification describes the information',
    title: '14 new requests were received.',
  },
  {
    avatar:
      'https://sqlview.com.sg/wp-content/uploads/Paperless-Office-Software-Client-National-Trades-Union-Congress-NTUC.png',
    date: 'Just',
    isRead: false,
    message: 'notification describes the information',
    title: 'NTUC responded to you',
  },
  {
    avatar:
      'https://sqlview.com.sg/wp-content/uploads/Paperless-Office-Software-Client-JTC-Corporation.png',
    date: '2024-01-01',
    isRead: false,
    message: 'notification describes the information',
    title: 'JTC responded to you',
  },
  {
    avatar:
      'https://sqlview.com.sg/wp-content/uploads/Paperless-Office-Software-Client-Ministry-of-Education-MOE.png',
    date: 'One day ago',
    isRead: false,
    message: 'notification describes the information',
    title: 'Agency reminder', // 代办提醒
  },
]);

const userStore = useUserStore();
const authStore = useAuthStore();
const accessStore = useAccessStore();
const { destroyWatermark, updateWatermark } = useWatermark();
const showDot = computed(() =>
  notifications.value.some((item) => !item.isRead),
);

// 头像下拉菜单的item Demo环境不需要
const menus = computed(() => [
  /* {
    handler: () => {
      openWindow(KRIS_DOC_URL, {
        target: '_blank',
      });
    },
    icon: BookOpenText,
    text: $t('ui.widgets.document'),
  },
  {
    handler: () => {
      openWindow(KRIS_GITHUB_URL, {
        target: '_blank',
      });
    },
    icon: MdiGithub,
    text: 'GitHub',
  },
  {
    handler: () => {
      openWindow(`${KRIS_GITHUB_URL}/issues`, {
        target: '_blank',
      });
    },
    icon: CircleHelp,
    text: $t('ui.widgets.qa'),
  },*/
]);

const avatar = computed(() => {
  return userStore.userInfo?.avatar ?? preferences.app.defaultAvatar;
});

async function handleLogout() {
  await authStore.logout(false);
}

function handleNoticeClear() {
  notifications.value = [];
}

function handleMakeAll() {
  notifications.value.forEach((item) => (item.isRead = true));
}

function handleClickLogo() {}

watch(
  () => preferences.app.watermark,
  async (enable) => {
    if (enable) {
      await updateWatermark({
        content: `${userStore.userInfo?.username} - ${userStore.userInfo?.realName}`,
      });
    } else {
      destroyWatermark();
    }
  },
  {
    immediate: true,
  },
);

onBeforeMount(() => {
  if (preferences.app.watermark) {
    destroyWatermark();
  }
});
</script>

<template>
  <BasicLayout
    @clear-preferences-and-logout="handleLogout"
    @click-logo="handleClickLogo"
  >
    <template #user-dropdown>
      <UserDropdown
        :avatar
        :menus
        :text="userStore.userInfo?.realName"
        description="chenkai@sqlview.cn"
        tag-text="Pro"
        trigger="both"
        @logout="handleLogout"
      />
    </template>
    <template #notification>
      <Notification
        :dot="showDot"
        :notifications="notifications"
        @clear="handleNoticeClear"
        @make-all="handleMakeAll"
      />
    </template>
    <template #extra>
      <AuthenticationLoginExpiredModal
        v-model:open="accessStore.loginExpired"
        :avatar
      >
        <LoginForm />
      </AuthenticationLoginExpiredModal>
    </template>
    <template #lock-screen>
      <LockScreen :avatar @to-login="handleLogout" />
    </template>
  </BasicLayout>
</template>
