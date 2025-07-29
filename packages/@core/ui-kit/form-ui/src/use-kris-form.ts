import type {
  BaseFormComponentType,
  ExtendedFormApi,
  KrisFormProps,
} from './types';

import { defineComponent, h, isReactive, onBeforeUnmount, watch } from 'vue';

import { useStore } from '@kris-core/shared/store';

import { FormApi } from './form-api';
import KrisUseForm from './kris-use-form.vue';

export function useKrisForm<
  T extends BaseFormComponentType = BaseFormComponentType,
>(options: KrisFormProps<T>) {
  const IS_REACTIVE = isReactive(options);
  const api = new FormApi(options);
  const extendedApi: ExtendedFormApi = api as never;
  extendedApi.useStore = (selector) => {
    return useStore(api.store, selector);
  };

  const Form = defineComponent(
    (props: KrisFormProps, { attrs, slots }) => {
      onBeforeUnmount(() => {
        api.unmount();
      });
      api.setState({ ...props, ...attrs });
      return () =>
        h(KrisUseForm, { ...props, ...attrs, formApi: extendedApi }, slots);
    },
    {
      name: 'KrisUseForm',
      inheritAttrs: false,
    },
  );
  // Add reactivity support
  if (IS_REACTIVE) {
    watch(
      () => options.schema,
      () => {
        api.setState({ schema: options.schema });
      },
      { immediate: true },
    );
  }

  return [Form, extendedApi] as const;
}
