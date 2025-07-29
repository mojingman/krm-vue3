import type { RouteRecordRaw } from 'vue-router';

import {
  KRIS_DOC_URL,
  KRIS_GITHUB_URL,
  KRIS_PREVIEW_URL,
} from '@kris/constants';

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
    name: 'KrisProject',
    path: '/kris',
    children: [
      {
        name: 'KrisDocument',
        path: '/kris/document',
        component: IFrameView,
        meta: {
          icon: 'lucide:book-open-text',
          link: KRIS_DOC_URL,
          title: $t('demos.kris.document'),
        },
      },
      {
        name: 'KrisGithub',
        path: '/kris/github',
        component: IFrameView,
        meta: {
          icon: 'mdi:github',
          link: KRIS_GITHUB_URL,
          title: 'Github',
        },
      },
      {
        name: 'Full version',
        path: '/kris/play',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: 'logos:vuetifyjs',
          link: KRIS_PREVIEW_URL,
          title: $t('demos.kris.full-version'),
        },
      },
    ],
  },
  {
    name: 'KrisAbout',
    path: '/kris/about',
    component: () => import('#/views/_core/about/index.vue'),
    meta: {
      icon: 'lucide:copyright',
      title: $t('demos.kris.about'),
      order: 9999,
    },
  },
];

export default routes;
