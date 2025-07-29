import type { RouteRecordRaw } from 'vue-router';

import {
  KRIS_ANT_PREVIEW_URL,
  KRIS_DOC_URL,
  KRIS_GITHUB_URL,
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
    name: 'KRISProject',
    path: '/kris',
    children: [
      {
        name: 'KRISDocument',
        path: '/kris/document',
        component: IFrameView,
        meta: {
          icon: 'lucide:book-open-text',
          link: KRIS_DOC_URL,
          title: $t('demos.kris.document'),
        },
      },
      {
        name: 'KRISGithub',
        path: '/kris/github',
        component: IFrameView,
        meta: {
          icon: 'mdi:github',
          link: KRIS_GITHUB_URL,
          title: 'Github',
        },
      },
      {
        name: 'KRISAntdv',
        path: '/kris/antdv',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: SvgAntdvLogoIcon,
          link: KRIS_ANT_PREVIEW_URL,
          title: $t('demos.kris.antdv'),
        },
      },
    ],
  },
  {
    component: () => import('#/views/_core/about/index.vue'),
    meta: {
      icon: 'lucide:copyright',
      order: 9999,
      title: $t('demos.kris.about'),
    },
    name: 'KRISAbout',
    path: '/kris/about',
  },
];

export default routes;
