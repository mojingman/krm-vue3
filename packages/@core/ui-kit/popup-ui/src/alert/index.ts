export type {
  AlertProps,
  BeforeCloseScope,
  IconType,
  PromptProps,
} from './alert';
export { useAlertContext } from './alert';
export { default as Alert } from './alert.vue';
export {
  krisAlert as alert,
  clearAllAlerts,
  krisConfirm as confirm,
  krisPrompt as prompt,
} from './AlertBuilder';
