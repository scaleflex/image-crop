/**
 * Side-effect entry for `@scaleflex/image-crop/define`.
 *
 * Importing this module registers all six public custom elements:
 *   - <sfx-crop>          — main editor host
 *   - <sfx-crop-canvas>   — stable <canvas> host inside the shadow root
 *   - <sfx-crop-toolbar>  — action bar (rotate/flip/sliders/shape selector)
 *   - <sfx-crop-zoom>     — zoom slider popover
 *   - <sfx-crop-rotate>   — fine-rotation slider popover
 *   - <sfx-crop-shapes>   — shape preset dropdown
 *
 * The import is idempotent — repeated imports and React StrictMode double
 * mounts won't throw, thanks to the `safeDefine` guard used by each element.
 */
import { safeDefine } from './elements/base';
import { SfxCropElement } from './elements/sfx-crop';
import { SfxCropCanvasElement } from './elements/sfx-crop-canvas';
import { SfxCropToolbarElement } from './elements/sfx-crop-toolbar';
import { SfxCropZoomElement } from './elements/sfx-crop-zoom';
import { SfxCropRotateElement } from './elements/sfx-crop-rotate';
import { SfxCropShapesElement } from './elements/sfx-crop-shapes';

safeDefine('sfx-crop-zoom', SfxCropZoomElement);
safeDefine('sfx-crop-rotate', SfxCropRotateElement);
safeDefine('sfx-crop-shapes', SfxCropShapesElement);
safeDefine('sfx-crop-canvas', SfxCropCanvasElement);
safeDefine('sfx-crop-toolbar', SfxCropToolbarElement);
safeDefine('sfx-crop', SfxCropElement);

export {};
