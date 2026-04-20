import {
  createElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type CSSProperties,
  type ForwardedRef,
} from 'react';
import type { SfxCropElement } from '../elements/sfx-crop';
import type { CropShapeName, CropRect, TransformState, TransformParams } from '../core/types';

// Auto-register the custom element as soon as this module loads in the
// browser. Wrapped in a feature check so SSR imports don't explode.
if (typeof customElements !== 'undefined') {
  void import('../define');
}

export type { SfxCropElement };

export interface SfxCropSaveDetail {
  blob: Blob;
  dataURL: string;
  params: TransformParams;
}

export interface SfxCropProps {
  // --- Core config ---
  src?: string;
  cropShape?: CropShapeName;
  theme?: 'light' | 'dark';
  initialCrop?: CropRect | null;
  initialRotation?: number;
  initialScale?: number;
  minScale?: number;
  maxScale?: number;
  minCropSize?: number;
  availableShapes?: CropShapeName[];
  handleSize?: number;
  handleColor?: string;
  borderRadius?: number;
  overlayColor?: string;
  outputType?: string;
  outputQuality?: number;
  maxOutputWidth?: number;
  maxOutputHeight?: number;

  // --- UI toggles ---
  showGrid?: boolean | 'interaction';
  showToolbar?: boolean;
  showRotateSlider?: boolean;
  showZoomSlider?: boolean;
  showShapeSelector?: boolean;
  showRotateButton?: boolean;
  showFlipButton?: boolean;
  showFlipVButton?: boolean;
  toolbarPosition?: 'top' | 'bottom';
  showBleedMargin?: boolean;
  bleedMarginSize?: number;
  bleedMarginColor?: string;

  // --- Behaviour ---
  enableAnimations?: boolean;
  animationSpeed?: number;
  keyboard?: boolean;
  pinchZoom?: boolean;
  wheelZoom?: boolean;

  // --- Event callbacks (bridged from CustomEvent.detail) ---
  onReady?: (detail: { element: SfxCropElement }) => void;
  onImageLoad?: (detail: { image: HTMLImageElement }) => void;
  onChange?: (state: TransformState) => void;
  onCropChange?: (crop: CropRect) => void;
  onSave?: (detail: SfxCropSaveDetail) => void;
  onCancel?: () => void;
  onError?: (detail: { error: Error }) => void;

  // --- Layout passthrough ---
  className?: string;
  style?: CSSProperties;
  id?: string;
}

/**
 * Writes a property on the underlying element *if* the property key exists on
 * the custom-element class. Falls back to setAttribute for values that survive
 * as strings (numbers, strings, the empty-string boolean shorthand).
 *
 * Using properties for arrays/objects (e.g. `availableShapes`) keeps identity
 * intact so Lit's diffing doesn't thrash.
 */
function applyPropOrAttr(el: SfxCropElement, key: string, value: unknown): void {
  if (value === undefined) return;

  if (key in el) {
    // Property path — Lit reads the raw value (string/number/boolean/array).
    (el as unknown as Record<string, unknown>)[key] = value;
    return;
  }

  // Fallback to attribute — kebab-case the camelCase key.
  const attr = key.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
  if (value === null || value === false) {
    el.removeAttribute(attr);
  } else if (value === true) {
    el.setAttribute(attr, '');
  } else {
    el.setAttribute(attr, String(value));
  }
}

/** Property names (camelCase) that `<sfx-crop>` reads directly. Listed once so
 *  the React wrapper stays in sync with the element class. Mirrors the
 *  `@property` declarations in `src/elements/sfx-crop.ts`. */
const FORWARDED_PROPS: readonly (keyof SfxCropProps)[] = [
  'src', 'cropShape', 'theme', 'initialRotation', 'initialScale', 'initialCrop',
  'minScale', 'maxScale', 'minCropSize', 'availableShapes', 'handleSize', 'handleColor',
  'borderRadius', 'overlayColor', 'outputType', 'outputQuality', 'maxOutputWidth',
  'maxOutputHeight',
  'showToolbar', 'showRotateSlider', 'showZoomSlider', 'showShapeSelector',
  'showRotateButton', 'showFlipButton', 'showFlipVButton', 'toolbarPosition',
  'showBleedMargin', 'bleedMarginSize', 'bleedMarginColor', 'enableAnimations',
  'animationSpeed', 'keyboard', 'pinchZoom', 'wheelZoom',
];

/**
 * Maps a React prop onto the `<sfx-crop>` element's `show-grid` attribute,
 * which accepts 'true' | 'false' | 'interaction' (not a boolean).
 */
function applyShowGrid(el: SfxCropElement, value: boolean | 'interaction' | undefined): void {
  if (value === undefined) return;
  // The element keeps the raw string on `showGridAttr`.
  (el as unknown as { showGridAttr: boolean | string }).showGridAttr =
    value === true ? 'true' : value === false ? 'false' : 'interaction';
}

/**
 * `<SfxCrop>` — React wrapper around the `<sfx-crop>` custom element.
 *
 * Pattern follows `@scaleflex/uploader`'s React wrapper: hand-rolled
 * `forwardRef` + dynamic `import('../define')` at module load to auto-register
 * the element, + `useEffect` bridges from CustomEvent to prop callbacks with
 * stable handler identities so re-renders don't thrash listeners.
 *
 * The ref is the bare element — call imperative methods via
 * `ref.current.rotateLeft()`, `ref.current.toBlob()`, etc.
 */
export const SfxCrop = forwardRef<SfxCropElement, SfxCropProps>(function SfxCrop(
  props,
  forwardedRef,
) {
  const elRef = useRef<SfxCropElement | null>(null);
  const cbRef = useRef<SfxCropProps>(props);
  cbRef.current = props;

  useImperativeHandle(forwardedRef, () => elRef.current as SfxCropElement, []);

  // --- Event bridge ---
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const handlers: Array<[string, EventListener]> = [
      ['sfx-crop-ready',        (e) => cbRef.current.onReady?.((e as CustomEvent).detail)],
      ['sfx-crop-image-load',   (e) => cbRef.current.onImageLoad?.((e as CustomEvent).detail)],
      ['sfx-crop-change',       (e) => cbRef.current.onChange?.((e as CustomEvent).detail)],
      ['sfx-crop-crop-change',  (e) => cbRef.current.onCropChange?.((e as CustomEvent).detail)],
      ['sfx-crop-save',         (e) => cbRef.current.onSave?.((e as CustomEvent).detail)],
      ['sfx-crop-cancel',       () => cbRef.current.onCancel?.()],
      ['sfx-crop-error',        (e) => cbRef.current.onError?.((e as CustomEvent).detail)],
    ];

    for (const [name, h] of handlers) el.addEventListener(name, h);
    return () => {
      for (const [name, h] of handlers) el.removeEventListener(name, h);
    };
  }, []);

  // --- Property / attribute sync ---
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    for (const k of FORWARDED_PROPS) applyPropOrAttr(el, k as string, props[k]);
    applyShowGrid(el, props.showGrid);
    // `src` last so a change triggers `loadImage` after other props apply.
    applyPropOrAttr(el, 'src', props.src);
  });

  return createElement('sfx-crop', {
    ref: elRef,
    className: props.className,
    style: props.style,
    id: props.id,
  });
});
