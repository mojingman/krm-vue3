<script lang="ts" setup>
import { AuthenticationQrCodeLogin } from '@kris/common-ui';
import { LOGIN_PATH } from '@kris/constants';

defineOptions({ name: 'QrCodeLogin' });
</script>

<template>
  <AuthenticationQrCodeLogin :login-path="LOGIN_PATH" />
</template>
