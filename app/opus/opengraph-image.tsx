import { modelOgImage, ogSize } from '../shared/og';
import { modelBySlug } from '../shared/data';

export const alt = `oscar morke · ${modelBySlug('opus').name}`;
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return modelOgImage('opus');
}
