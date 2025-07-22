const BasicLayout = () => import('./basic.vue');
const AuthPageLayout = () => import('./auth.vue');

const IFrameView = () => import('@kris/layouts').then((m) => m.IFrameView);

export { AuthPageLayout, BasicLayout, IFrameView };
