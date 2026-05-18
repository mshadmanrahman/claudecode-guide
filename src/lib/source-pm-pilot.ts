import { pmPilot } from '../../.source/server';
import { loader } from 'fumadocs-core/source';

export const pmPilotSource = loader({
  baseUrl: '/pm-pilot/guide',
  source: pmPilot.toFumadocsSource(),
});
