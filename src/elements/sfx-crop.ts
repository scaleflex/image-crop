import { html, css, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { CICropView } from '../core/ci-crop-view';
import type {
  CICropViewConfig,
  CICropViewInstance,
  CropShapeName,
  CropRect,
  TransformState,
  TransformParams,
} from '../core/types';
import { SfxCropBaseElement } from './base';

const BOOL_PROPS = [
  'showGrid', 'showRotateSlider', 'showZoomSlider', 'showShapeSelector',
  'showRotateButton', 'showFlipButton', 'showFlipVButton', 'showToolbar',
  'showBleedMargin', 'enableAnimations', 'keyboard', 'pinchZoom', 'wheelZoom',
] as const;

/**
 * `<sfx-crop>` — main Scaleflex crop editor element.
 *
 * P1: thin Lit wrapper around the existing {@link CICropView} class.
 * The `CICropView` instance is created in `firstUpdated()` against the host
 * element itself (light DOM). Later phases will move the canvas + toolbar
 * into shadow DOM; the public attribute/event/method surface stays stable.
 *
 * All events bubble and cross shadow boundaries (`composed: true`) so light-DOM
 * listeners catch them regardless of where the element is mounted.
 */
export class SfxCropElement extends SfxCropBaseElement {
  /**
   * The Lit render root is `this` (light DOM) in P1 — the legacy `CICropView`
   * writes directly to the host. P2 will flip to an open shadow root.
   */
  protected createRenderRoot(): HTMLElement {
    return this;
  }

  static styles = css``;

  // === Attributes mirroring CICropViewConfig ===

  @property({ type: String, reflect: true }) src = '';
  @property({ type: String, attribute: 'crop-shape', reflect: true }) cropShape: CropShapeName = 'free';
  @property({ type: String, reflect: true }) theme: 'light' | 'dark' = 'dark';

  @property({ type: Number, attribute: 'initial-rotation' }) initialRotation = 0;
  @property({ type: Number, attribute: 'initial-scale' }) initialScale = 1;
  @property({ type: Number, attribute: 'min-scale' }) minScale = 0.5;
  @property({ type: Number, attribute: 'max-scale' }) maxScale = 5;
  @property({ type: Number, attribute: 'min-crop-size' }) minCropSize = 20;
  @property({ type: Number, attribute: 'handle-size' }) handleSize = 12;
  @property({ type: Number, attribute: 'border-radius' }) borderRadius = 20;
  @property({ type: Number, attribute: 'output-quality' }) outputQuality = 0.92;
  @property({ type: Number, attribute: 'max-output-width' }) maxOutputWidth = 0;
  @property({ type: Number, attribute: 'max-output-height' }) maxOutputHeight = 0;
  @property({ type: Number, attribute: 'bleed-margin-size' }) bleedMarginSize = 10;
  @property({ type: Number, attribute: 'animation-speed' }) animationSpeed = 1.0;

  @property({ type: String, attribute: 'handle-color' }) handleColor = '#ffffff';
  @property({ type: String, attribute: 'overlay-color' }) overlayColor = 'rgba(0, 0, 0, 0.55)';
  @property({ type: String, attribute: 'bleed-margin-color' }) bleedMarginColor = 'rgba(255, 0, 0, 0.5)';
  @property({ type: String, attribute: 'output-type' }) outputType = 'image/png';
  @property({ type: String, attribute: 'toolbar-position' }) toolbarPosition: 'bottom' | 'top' = 'bottom';

  // `show-grid` accepts "true" / "false" / "interaction" → parsed by hand.
  @property({ type: String, attribute: 'show-grid' }) showGridAttr: string | boolean = 'interaction';

  @property({ type: Boolean, attribute: 'show-toolbar' }) showToolbar = true;
  @property({ type: Boolean, attribute: 'show-rotate-slider' }) showRotateSlider = true;
  @property({ type: Boolean, attribute: 'show-zoom-slider' }) showZoomSlider = true;
  @property({ type: Boolean, attribute: 'show-shape-selector' }) showShapeSelector = true;
  @property({ type: Boolean, attribute: 'show-rotate-button' }) showRotateButton = true;
  @property({ type: Boolean, attribute: 'show-flip-button' }) showFlipButton = true;
  @property({ type: Boolean, attribute: 'show-flip-v-button' }) showFlipVButton = true;
  @property({ type: Boolean, attribute: 'show-bleed-margin' }) showBleedMargin = false;
  @property({ type: Boolean, attribute: 'enable-animations' }) enableAnimations = true;
  @property({ type: Boolean }) keyboard = true;
  @property({ type: Boolean, attribute: 'pinch-zoom' }) pinchZoom = true;
  @property({ type: Boolean, attribute: 'wheel-zoom' }) wheelZoom = true;

  @property({ attribute: 'available-shapes' })
  availableShapes: CropShapeName[] | string = ['free', 'square', 'circle', 'rounded-rect', '16:9', '4:3', '3:2'];

  /**
   * Optional initial crop rect as JSON string attribute, e.g.
   * `initial-crop='{"x":0,"y":0,"width":0.5,"height":0.5}'`.
   */
  @property({ attribute: 'initial-crop' })
  initialCrop: CropRect | string | null = null;

  // === Internal instance ===
  private instance: CICropViewInstance | null = null;

  // === Lifecycle ===

  firstUpdated(): void {
    const config = this.buildConfig();
    this.instance = new CICropView(this, config);
    // `sfx-crop-ready` is fired from the CICropView `onReady` bridge once the
    // image is loaded and the renderer is live — see buildConfig() below.
  }

  updated(changed: PropertyValues): void {
    if (!this.instance) return;
    const delta: Partial<CICropViewConfig> = {};
    let hasDelta = false;

    const forward = <K extends keyof CICropViewConfig>(propKey: keyof SfxCropElement, cfgKey: K, value: CICropViewConfig[K]): void => {
      if (changed.has(propKey as PropertyKey)) {
        delta[cfgKey] = value;
        hasDelta = true;
      }
    };

    forward('src', 'src', this.src);
    forward('cropShape', 'cropShape', this.cropShape);
    forward('theme', 'theme', this.theme);
    forward('minScale', 'minScale', this.minScale);
    forward('maxScale', 'maxScale', this.maxScale);
    forward('showToolbar', 'showToolbar', this.showToolbar);
    forward('borderRadius', 'borderRadius', this.borderRadius);
    forward('showBleedMargin', 'showBleedMargin', this.showBleedMargin);
    forward('bleedMarginSize', 'bleedMarginSize', this.bleedMarginSize);
    forward('bleedMarginColor', 'bleedMarginColor', this.bleedMarginColor);
    forward('enableAnimations', 'enableAnimations', this.enableAnimations);
    forward('animationSpeed', 'animationSpeed', this.animationSpeed);
    forward('keyboard', 'keyboard', this.keyboard);
    forward('pinchZoom', 'pinchZoom', this.pinchZoom);
    forward('wheelZoom', 'wheelZoom', this.wheelZoom);

    if (hasDelta) this.instance.update(delta);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.instance?.destroy();
    this.instance = null;
  }

  render(): unknown {
    // In P1 the `CICropView` writes into the host directly, so the Lit template
    // stays empty. P2 will replace this with shadow-DOM shape.
    return html``;
  }

  // === Public imperative API (matches CICropViewInstance) ===

  loadImage(src: string): Promise<void> {
    return this.ensure().loadImage(src);
  }
  getTransformState(): TransformState {
    return this.ensure().getTransformState();
  }
  setCropShape(shape: CropShapeName): void {
    this.ensure().setCropShape(shape);
  }
  setCropRect(rect: CropRect): void {
    this.ensure().setCropRect(rect);
  }
  getCropRect(): CropRect {
    return this.ensure().getCropRect();
  }
  rotateLeft(): void {
    this.ensure().rotateLeft();
  }
  flipHorizontal(): void {
    this.ensure().flipHorizontal();
  }
  flipVertical(): void {
    this.ensure().flipVertical();
  }
  setRotation(degrees: number): void {
    this.ensure().setRotation(degrees);
  }
  setScale(scale: number): void {
    this.ensure().setScale(scale);
  }
  reset(): void {
    this.ensure().reset();
  }
  toCanvas(): HTMLCanvasElement {
    return this.ensure().toCanvas();
  }
  toBlob(type?: string, quality?: number): Promise<Blob> {
    return this.ensure().toBlob(type, quality);
  }
  toDataURL(type?: string, quality?: number): string {
    return this.ensure().toDataURL(type, quality);
  }
  toTransformParams(): TransformParams {
    return this.ensure().toTransformParams();
  }

  /**
   * Emit `sfx-crop-save` carrying the current blob/dataURL/transform params.
   * UI cancel/save buttons will come in 2.1 — this is the imperative path for now.
   */
  async save(type?: string, quality?: number): Promise<void> {
    const blob = await this.toBlob(type, quality);
    const dataURL = this.toDataURL(type, quality);
    const params = this.toTransformParams();
    this.dispatch('sfx-crop-save', { blob, dataURL, params });
  }

  cancel(): void {
    this.dispatch('sfx-crop-cancel', undefined);
  }

  // === Internals ===

  private ensure(): CICropViewInstance {
    if (!this.instance) {
      throw new Error('<sfx-crop> has not been connected yet — wait for "sfx-crop-ready" or firstUpdated().');
    }
    return this.instance;
  }

  private dispatch(type: string, detail: unknown): void {
    this.dispatchEvent(new CustomEvent(type, {
      detail,
      bubbles: true,
      composed: true,
    }));
  }

  private parseShowGrid(): boolean | 'interaction' {
    const v = this.showGridAttr;
    if (v === true || v === 'true' || v === '') return true;
    if (v === false || v === 'false') return false;
    return 'interaction';
  }

  private parseAvailableShapes(): CropShapeName[] {
    if (Array.isArray(this.availableShapes)) return this.availableShapes;
    if (typeof this.availableShapes === 'string' && this.availableShapes.trim()) {
      return this.availableShapes.split(/[\s,]+/).filter(Boolean) as CropShapeName[];
    }
    return ['free', 'square', 'circle', 'rounded-rect', '16:9', '4:3', '3:2'];
  }

  private parseInitialCrop(): CropRect | null {
    const v = this.initialCrop;
    if (!v) return null;
    if (typeof v === 'object') return v;
    try {
      return JSON.parse(v) as CropRect;
    } catch {
      return null;
    }
  }

  private buildConfig(): Partial<CICropViewConfig> {
    return {
      src: this.src,
      cropShape: this.cropShape,
      theme: this.theme,
      initialRotation: this.initialRotation,
      initialScale: this.initialScale,
      initialCrop: this.parseInitialCrop(),
      minScale: this.minScale,
      maxScale: this.maxScale,
      minCropSize: this.minCropSize,
      availableShapes: this.parseAvailableShapes(),
      handleSize: this.handleSize,
      handleColor: this.handleColor,
      borderRadius: this.borderRadius,
      outputType: this.outputType,
      outputQuality: this.outputQuality,
      maxOutputWidth: this.maxOutputWidth,
      maxOutputHeight: this.maxOutputHeight,
      overlayColor: this.overlayColor,
      showGrid: this.parseShowGrid(),
      showToolbar: this.showToolbar,
      showRotateSlider: this.showRotateSlider,
      showZoomSlider: this.showZoomSlider,
      showShapeSelector: this.showShapeSelector,
      showRotateButton: this.showRotateButton,
      showFlipButton: this.showFlipButton,
      showFlipVButton: this.showFlipVButton,
      toolbarPosition: this.toolbarPosition,
      showBleedMargin: this.showBleedMargin,
      bleedMarginSize: this.bleedMarginSize,
      bleedMarginColor: this.bleedMarginColor,
      enableAnimations: this.enableAnimations,
      animationSpeed: this.animationSpeed,
      keyboard: this.keyboard,
      pinchZoom: this.pinchZoom,
      wheelZoom: this.wheelZoom,
      onReady: (instance) => this.dispatch('sfx-crop-ready', { element: this, instance }),
      onChange: (state) => this.dispatch('sfx-crop-change', state),
      onCropChange: (crop) => this.dispatch('sfx-crop-crop-change', crop),
      onImageLoad: (image) => this.dispatch('sfx-crop-image-load', { image }),
      onError: (error) => this.dispatch('sfx-crop-error', { error }),
    };
  }
}

// Static prop list used by the React wrapper in P4; kept here to avoid drift.
export const SFX_CROP_BOOL_PROPS: readonly string[] = BOOL_PROPS;

declare global {
  interface HTMLElementTagNameMap {
    'sfx-crop': SfxCropElement;
  }
}
