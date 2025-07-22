<script lang="ts" setup>
import { computed } from 'vue';

import { AuthPageLayout } from '@kris/layouts';
import { preferences } from '@kris/preferences';

import { $t } from '#/locales';

const appName = computed(() => preferences.app.name);
const logo = computed(() => preferences.logo.source);
const clickLogo = () => {};
const sloganImage =
  'https://mykris.sqlview.com.sg/KRIS/images/newLogin/New_login_screen.svg';
</script>

<template>
  <AuthPageLayout
    :app-name="appName"
    :logo="logo"
    :slogan-image="sloganImage"
    :page-description="$t('authentication.pageDesc')"
    :page-title="$t('authentication.pageTitle')"
    :click-logo="clickLogo"
  >
    <!-- 自定义工具栏 -->
    <!-- <template #toolbar></template> -->
  </AuthPageLayout>
</template>
