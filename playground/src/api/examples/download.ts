import type { RequestResponse } from '@kris/request';

import { requestClient } from '../request';

/**
 * 下载文件，获取Blob
 * @returns Blob
 */
async function downloadFile1() {
  return requestClient.download<Blob>(
    'https://mykris.sqlview.com.sg/KRIS/images/KRIS.png',
  );
}

/**
 * 下载文件，获取完整的Response
 * @returns RequestResponse<Blob>
 */
async function downloadFile2() {
  return requestClient.download<RequestResponse<Blob>>(
    'https://mykris.sqlview.com.sg/KRIS/images/KRIS.png',
    {
      responseReturn: 'raw',
    },
  );
}

export { downloadFile1, downloadFile2 };
