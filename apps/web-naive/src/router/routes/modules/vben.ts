import type { RouteRecordRaw } from 'vue-router';

import {
  VBEN_ANT_PREVIEW_URL,
  VBEN_DOC_URL,
  VBEN_ELE_PREVIEW_URL,
  VBEN_GITHUB_URL,
  VBEN_PREVIEW_URL,
} from '@kris/constants';
import { SvgAntdvLogoIcon } from '@kris/icons';

import { IFrameView } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      badgeType: 'dot',
      icon: 'eos-icons:project-outlined',
      order: 9998,
      title: $t('demos.kris.title'),
    },
    name: 'VbenProject',
    path: '/kris',
    children: [
      {
        name: 'VbenDocument',
        path: '/kris/document',
        component: IFrameView,
        meta: {
          icon: 'lucide:book-open-text',
          link: VBEN_DOC_URL,
          title: $t('demos.kris.document'),
        },
      },
      {
        name: 'VbenGithub',
        path: '/kris/github',
        component: IFrameView,
        meta: {
          icon: 'mdi:github',
          link: VBEN_GITHUB_URL,
          title: 'Github',
        },
      },
      {
        name: 'Full version',
        path: '/kris/naive',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: 'logos:vuetifyjs',
          link: VBEN_PREVIEW_URL,
          title: $t('demos.kris.full-version'),
        },
      },
      {
        name: 'VbenAntd',
        path: '/kris/antd',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: SvgAntdvLogoIcon,
          link: VBEN_ANT_PREVIEW_URL,
          title: $t('demos.kris.antdv'),
        },
      },
      {
        name: 'VbenElementPlus',
        path: '/vben-admin/ele',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: 'logos:element',
          link: VBEN_ELE_PREVIEW_URL,
          title: $t('demos.kris.element-plus'),
        },
      },
    ],
  },
  {
    name: 'VbenAbout',
    path: '/vben-admin/about',
    component: () => import('#/views/_core/about/index.vue'),
    meta: {
      icon: 'lucide:copyright',
      title: $t('demos.kris.about'),
      order: 9999,
    },
  },
];

export default routes;
