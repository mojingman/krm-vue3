<script setup lang="ts">
import type { SupportedLanguagesType } from '@kris/locales';

import { SUPPORT_LANGUAGES } from '@kris/constants';
import { Languages } from '@kris/icons';
import { loadLocaleMessages } from '@kris/locales';
import { preferences, updatePreferences } from '@kris/preferences';

import { VbenDropdownRadioMenu, VbenIconButton } from '@kris-core/shadcn-ui';

defineOptions({
  name: 'LanguageToggle',
});

async function handleUpdate(value: string | undefined) {
  if (!value) return;
  const locale = value as SupportedLanguagesType;
  updatePreferences({
    app: {
      locale,
    },
  });
  await loadLocaleMessages(locale);
}
</script>

<template>
  <div>
    <VbenDropdownRadioMenu
      :menus="SUPPORT_LANGUAGES"
      :model-value="preferences.app.locale"
      @update:model-value="handleUpdate"
    >
      <VbenIconButton>
        <Languages class="text-foreground size-4" />
      </VbenIconButton>
    </VbenDropdownRadioMenu>
  </div>
</template>
