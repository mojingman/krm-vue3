import type { Preferences } from './types';

// 默认配置
import defaultAvatar from '../../../icons/src/svg/icons/default-avatar.svg';
import krisLogo from '../../../icons/src/svg/icons/kris-logo.svg';

const defaultPreferences: Preferences = {
  app: {
    // 全局配置
    accessMode: 'frontend',
    authPageLayout: 'panel-center',
    checkUpdatesInterval: 1,
    colorGrayMode: false,
    colorWeakMode: false,
    compact: false,
    contentCompact: 'wide',
    contentCompactWidth: 1200,
    contentPadding: 0,
    contentPaddingBottom: 0,
    contentPaddingLeft: 0,
    contentPaddingRight: 0,
    contentPaddingTop: 0,
    defaultAvatar,
    defaultHomePath: '/workspace',
    dynamicTitle: true,
    enableCheckUpdates: true,
    enablePreferences: true,
    enableRefreshToken: false,
    isMobile: false,
    layout: 'sidebar-nav',
    locale: 'en-US',
    loginExpiredMode: 'page',
    name: 'KRIS',
    preferencesButtonPosition: 'auto',
    watermark: false,
    zIndex: 200,
  },
  login: {
    /* ChenKai add 21:58 2025.7.18 */
    showCodeLogin: true,
    showForgetPassword: true,
    showQrcodeLogin: true,
    showRegister: true,
    showRememberMe: true,
    showThirdPartyLogin: true,
    submitButtonText: '',
    subTitle: '',
    title: '',
  },
  breadcrumb: {
    // 顶栏配置
    enable: true,
    hideOnlyOne: false,
    showHome: false,
    showIcon: true,
    styleType: 'normal',
  },
  copyright: {
    // 版权配置
    companyName: 'SQL VIEW PTE LTD',
    companySiteLink: 'https://sqlview.com.sg',
    date: '2025',
    enable: true,
    icp: '',
    icpLink: '',
    settingShow: true,
  },
  footer: {
    // 底栏配置
    enable: false,
    fixed: false,
    height: 32,
  },
  header: {
    // 面包屑配置
    enable: true,
    height: 50,
    hidden: false,
    menuAlign: 'start',
    mode: 'fixed',
  },
  logo: {
    // logo配置
    enable: true,
    fit: 'contain',
    source: krisLogo,
  },
  navigation: {
    // 导航配置
    accordion: true,
    split: true,
    styleType: 'rounded',
  },
  shortcutKeys: {
    // 快捷键配置
    enable: true,
    globalLockScreen: true,
    globalLogout: true,
    globalPreferences: true,
    globalSearch: true,
  },
  sidebar: {
    // 侧边栏配置
    autoActivateChild: false,
    collapsed: false,
    collapsedButton: true,
    collapsedShowTitle: false,
    collapseWidth: 60,
    enable: true,
    expandOnHover: true,
    extraCollapse: false,
    extraCollapsedWidth: 60,
    fixedButton: true,
    hidden: false,
    mixedWidth: 80,
    width: 224,
  },
  tabbar: {
    // 标签页配置
    draggable: true,
    enable: true,
    height: 38,
    keepAlive: true,
    maxCount: 0,
    middleClickToClose: false,
    persist: true,
    showIcon: true,
    showMaximize: true,
    showMore: true,
    styleType: 'chrome',
    wheelable: true,
  },
  theme: {
    // 主题配置
    builtinType: 'default',
    colorDestructive: 'hsl(348 100% 61%)',
    colorPrimary: 'hsl(212 100% 45%)',
    colorSuccess: 'hsl(144 57% 58%)',
    colorWarning: 'hsl(42 84% 61%)',
    mode: 'light',
    radius: '0.5',
    semiDarkHeader: false,
    semiDarkSidebar: false,
  },
  transition: {
    // 动画配置
    enable: true,
    loading: true,
    name: 'fade-slide',
    progress: true,
  },
  widget: {
    // 功能配置
    fullscreen: true,
    globalSearch: true,
    languageToggle: true,
    lockScreen: true,
    notification: true,
    refresh: true,
    sidebarToggle: true,
    themeToggle: true,
  },
};

export { defaultPreferences };
