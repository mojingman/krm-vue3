<script lang="ts" setup>
import { Settings } from '@kris/icons';

import { VbenIconButton } from '@kris-core/shadcn-ui';

import Preferences from './preferences.vue';

const emit = defineEmits<{ clearPreferencesAndLogout: [] }>();

function clearPreferencesAndLogout() {
  emit('clearPreferencesAndLogout');
}
</script>
<template>
  <Preferences @clear-preferences-and-logout="clearPreferencesAndLogout">
    <VbenIconButton>
      <Settings class="text-foreground size-4" />
    </VbenIconButton>
  </Preferences>
</template>
