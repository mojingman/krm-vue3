<script lang="ts" setup>
import { Settings } from '@kris/icons';

import { KrisIconButton } from '@kris-core/shadcn-ui';

import Preferences from './preferences.vue';

const emit = defineEmits<{ clearPreferencesAndLogout: [] }>();

function clearPreferencesAndLogout() {
  emit('clearPreferencesAndLogout');
}
</script>
<template>
  <Preferences @clear-preferences-and-logout="clearPreferencesAndLogout">
    <KrisIconButton>
      <Settings class="text-foreground size-4" />
    </KrisIconButton>
  </Preferences>
</template>
