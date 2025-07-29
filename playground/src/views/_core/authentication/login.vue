<script lang="ts" setup>
import type { KrisFormSchema } from '@kris/common-ui';
import type { BasicOption, Recordable } from '@kris/types';

import { computed, markRaw, useTemplateRef } from 'vue';

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

const formSchema = computed((): KrisFormSchema[] => {
  return [
    /* {
      component: 'KrisSelect',
      // componentProps(_values, form) {
      //   return {
      //     'onUpdate:modelValue': (value: string) => {
      //       const findItem = MOCK_USER_OPTIONS.find(
      //         (item) => item.value === value,
      //       );
      //       if (findItem) {
      //         form.setValues({
      //           password: '123456',
      //           username: findItem.label,
      //         });
      //       }
      //     },
      //     options: MOCK_USER_OPTIONS,
      //     placeholder: $t('authentication.selectAccount'),
      //   };
      // },
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
        .default('kris'),
    },*/
    {
      component: 'KrisInput',
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
      component: 'KrisInputPassword',
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

const loginRef =
  useTemplateRef<InstanceType<typeof AuthenticationLogin>>('loginRef');

async function onSubmit(params: Recordable<any>) {
  authStore.authLogin(params).catch(() => {
    // 登陆失败，刷新验证码的演示
    const formApi = loginRef.value?.getFormApi();
    // 重置验证码组件的值
    formApi?.setFieldValue('captcha', false, false);
    // 使用表单API获取验证码组件实例，并调用其resume方法来重置验证码
    formApi
      ?.getFieldComponentRef<InstanceType<typeof SliderCaptcha>>('captcha')
      ?.resume();
  });
}
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
    ref="loginRef"
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    @submit="onSubmit"
  />
</template>
