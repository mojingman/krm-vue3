<script setup lang="ts">
import type { AuthPageLayoutType } from '@kris/types';

import type { KrisDropdownMenuItem } from '@kris-core/shadcn-ui';

import { computed } from 'vue';

import { InspectionPanel, PanelLeft, PanelRight } from '@kris/icons';
import { $t } from '@kris/locales';
import {
  preferences,
  updatePreferences,
  usePreferences,
} from '@kris/preferences';

import { KrisDropdownRadioMenu, KrisIconButton } from '@kris-core/shadcn-ui';

defineOptions({
  name: 'AuthenticationLayoutToggle',
});

const menus = computed((): KrisDropdownMenuItem[] => [
  {
    icon: PanelLeft,
    label: $t('authentication.layout.alignLeft'),
    value: 'panel-left',
  },
  {
    icon: InspectionPanel,
    label: $t('authentication.layout.center'),
    value: 'panel-center',
  },
  {
    icon: PanelRight,
    label: $t('authentication.layout.alignRight'),
    value: 'panel-right',
  },
]);

const { authPanelCenter, authPanelLeft, authPanelRight } = usePreferences();

function handleUpdate(value: string | undefined) {
  if (!value) return;
  updatePreferences({
    app: {
      authPageLayout: value as AuthPageLayoutType,
    },
  });
}
</script>

<template>
  <KrisDropdownRadioMenu
    :menus="menus"
    :model-value="preferences.app.authPageLayout"
    @update:model-value="handleUpdate"
  >
    <KrisIconButton>
      <PanelRight v-if="authPanelRight" class="size-4" />
      <PanelLeft v-if="authPanelLeft" class="size-4" />
      <InspectionPanel v-if="authPanelCenter" class="size-4" />
    </KrisIconButton>
  </KrisDropdownRadioMenu>
</template>
