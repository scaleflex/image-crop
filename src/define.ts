/**
 * Side-effect entry for `@scaleflex/crop/define`.
 *
 * Importing this module registers all public custom elements:
 *   - <sfx-crop>
 *
 * Later phases will grow this list to also register:
 *   - <sfx-crop-canvas>, <sfx-crop-toolbar>, <sfx-crop-zoom>,
 *     <sfx-crop-rotate>, <sfx-crop-shapes>
 *
 * The import is idempotent — repeated imports and React StrictMode double
 * mounts won't throw, thanks to the `safeDefine` guard used by each element.
 */
import { safeDefine } from './elements/base';
import { SfxCropElement } from './elements/sfx-crop';
import { SfxCropCanvasElement } from './elements/sfx-crop-canvas';
import { SfxCropToolbarElement } from './elements/sfx-crop-toolbar';

safeDefine('sfx-crop-canvas', SfxCropCanvasElement);
safeDefine('sfx-crop-toolbar', SfxCropToolbarElement);
safeDefine('sfx-crop', SfxCropElement);

export {};
