<script lang="ts" setup>
import type { VbenFormSchema } from '@kris/common-ui';
import type { BasicOption } from '@kris/types';

import { computed, markRaw } from 'vue';

import { AuthenticationLogin, SliderCaptcha, z } from '@kris/common-ui';
import { $t } from '@kris/locales';
import { preferences } from '@kris/preferences';

import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();

const MOCK_USER_OPTIONS: BasicOption[] = [
  {
    label: 'Super',
    value: 'chenkai',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'User',
    value: 'jack',
  },
];

const formSchema = computed((): VbenFormSchema[] => {
  return [
    /* {
      component: 'VbenSelect',
      componentProps: {
        options: MOCK_USER_OPTIONS,
        placeholder: $t('authentication.selectAccount'),
      },
      fieldName: 'selectAccount',
      label: $t('authentication.selectAccount'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.selectAccount') })
        .optional()
        .default('vben'),
    }, */
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      dependencies: {
        trigger(values, form) {
          if (values.selectAccount) {
            const findUser = MOCK_USER_OPTIONS.find(
              (item) => item.value === values.selectAccount,
            );
            if (findUser) {
              form.setValues({
                password: '123456',
                username: findUser.value,
              });
            }
          }
        },
        triggerFields: ['selectAccount'],
      },
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    {
      component: markRaw(SliderCaptcha),
      fieldName: 'captcha',
      rules: z.boolean().refine((value) => value, {
        message: $t('authentication.verifyRequiredTip'),
      }),
    },
  ];
});
// 根据实际需求控制功能
const showCodeLogin = computed(() => preferences.login.showCodeLogin);
const showQrcodeLogin = computed(() => preferences.login.showQrcodeLogin);
const showRegister = computed(() => preferences.login.showRegister);
const showThirdPartyLogin = computed(
  () => preferences.login.showThirdPartyLogin,
);
const showForgetPassword = computed(() => preferences.login.showForgetPassword);
</script>

<template>
  <AuthenticationLogin
    :show-code-login="showCodeLogin"
    :show-qrcode-login="showQrcodeLogin"
    :show-register="showRegister"
    :show-third-party-login="showThirdPartyLogin"
    :show-forget-password="showForgetPassword"
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    @submit="authStore.authLogin"
  />
</template>
