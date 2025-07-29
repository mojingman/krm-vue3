<script lang="ts" setup>
import { KrisSpinner } from '@kris-core/shadcn-ui';

import { useContentSpinner } from './use-content-spinner';

defineOptions({ name: 'LayoutContentSpinner' });

const { spinning } = useContentSpinner();
</script>
<template>
  <KrisSpinner :spinning="spinning" />
</template>
