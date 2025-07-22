import { computed } from 'vue';

import { preferences } from '@kris/preferences';
import '@kris/styles';

import { createDiscreteApi, darkTheme, lightTheme } from 'naive-ui';

const themeOverridesProviderProps = computed(() => ({
  themeOverrides: preferences.theme.mode === 'light' ? lightTheme : darkTheme,
}));

const themeProviderProps = computed(() => ({
  theme: preferences.theme.mode === 'light' ? lightTheme : darkTheme,
}));

export const { dialog, loadingBar, message, modal, notification } =
  createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar', 'modal'],
    {
      configProviderProps: themeProviderProps,
      loadingBarProviderProps: themeOverridesProviderProps,
      messageProviderProps: themeOverridesProviderProps,
      notificationProviderProps: themeOverridesProviderProps,
    },
  );
