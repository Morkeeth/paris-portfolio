import { compareOgImage, ogSize } from '../shared/og';
import { COMPARE_META } from '../shared/data';

export const alt = COMPARE_META.title;
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return compareOgImage();
}
