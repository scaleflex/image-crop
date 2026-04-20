/**
 * `@scaleflex/crop` — public, side-effect-free entry.
 *
 * Exports types + pure helpers. For the custom element itself, import
 * `@scaleflex/crop/define` (side-effect) or the React wrapper at
 * `@scaleflex/crop/react`.
 *
 * Note: `CICropView` stays exported during the 2.0.0-alpha series as a
 * transitional imperative API. It will be removed in 2.0.0 (P5) — new code
 * should use `<sfx-crop>` + the React wrapper.
 */

export { SfxCropElement } from './elements/sfx-crop';
export { CICropView } from './core/ci-crop-view';

export type {
  CICropViewConfig,
  CICropViewInstance,
  TransformState,
  TransformParams,
  CropShapeName,
  CropShape,
  CropShapeConfig,
  CropRect,
  NormalizedRect,
  DisplayState,
  HitTarget,
  HandlePosition,
  Point,
  Size,
  SpringConfig,
  LerpConfig,
} from './core/types';

export { imageToCanvas, canvasToImage, buildTransformMatrix } from './transforms/matrix';
