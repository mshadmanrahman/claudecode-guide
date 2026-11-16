import { docs, docsBn } from '../../.source/server';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});

/** Bangla docs. A page here has the same slug as its English page in `source`. */
export const sourceBn = loader({
  baseUrl: '/bn/docs',
  source: docsBn.toFumadocsSource(),
});
