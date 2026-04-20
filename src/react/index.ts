/**
 * React entry for `@scaleflex/crop/react`.
 *
 * Exports:
 *   - `SfxCrop` — forwardRef component rendering `<sfx-crop>`
 *   - `useSfxCrop` — hook variant for consumers that render the element manually
 *   - `SfxCropElement`, `SfxCropProps`, `SfxCropSaveDetail` — types
 *
 * The wrapper dynamically imports `../define` on module load so the custom
 * element auto-registers whenever this module is evaluated in the browser.
 * SSR-safe: the import is guarded behind a `typeof customElements` check.
 */

export { SfxCrop } from './sfx-crop';
export type { SfxCropProps, SfxCropElement, SfxCropSaveDetail } from './sfx-crop';
export { useSfxCrop } from './use-sfx-crop';
export type { UseSfxCropReturn } from './use-sfx-crop';

export type {
  TransformState,
  TransformParams,
  CropShapeName,
  CropShape,
  CropRect,
  NormalizedRect,
  HandlePosition,
  Point,
  Size,
} from '../core/types';
