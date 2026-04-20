import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { SfxCropBaseElement } from './base';
import { createToolbar, type ToolbarHandle } from '../ui/toolbar';
import type { CropShapeName } from '../core/types';

/**
 * Command descriptor dispatched as the `detail` of `sfx-crop-toolbar-command`.
 * One event shape for every toolbar interaction keeps the host's command
 * router trivial.
 */
export type SfxCropToolbarCommand =
  | { type: 'rotate-left' }
  | { type: 'flip-h' }
  | { type: 'rotation'; value: number }
  | { type: 'shape'; value: CropShapeName };

/**
 * `<sfx-crop-toolbar>` — P2 transitional wrapper around the existing
 * imperative {@link createToolbar} factory.
 *
 * Light DOM so the parent `<sfx-crop>`'s shadow stylesheet (with the legacy
 * `.ci-crop-toolbar*` rules) applies directly. Toolbar callbacks are bridged
 * to a single `sfx-crop-toolbar-command` CustomEvent (bubbles + composed) so
 * the host routes commands without holding function references.
 *
 * P3 will replace the imperative factory with full Lit sub-elements
 * (`<sfx-crop-rotate>`, `<sfx-crop-shapes>`).
 */
export class SfxCropToolbarElement extends SfxCropBaseElement {
  protected createRenderRoot(): HTMLElement {
    return this;
  }

  static styles = css``;

  @property({ type: String }) shape: CropShapeName = 'free';
  @property({ type: Number }) rotation = 0;
  @property({ type: Boolean, attribute: 'show-rotate-button' }) showRotateButton = true;
  @property({ type: Boolean, attribute: 'show-flip-button' }) showFlipButton = true;
  @property({ type: Boolean, attribute: 'show-flip-v-button' }) showFlipVButton = false;
  @property({ type: Boolean, attribute: 'show-rotate-slider' }) showRotateSlider = true;
  @property({ type: Boolean, attribute: 'show-shape-selector' }) showShapeSelector = true;
  @property({ type: String, attribute: 'toolbar-position' }) toolbarPosition: 'top' | 'bottom' = 'bottom';

  /** JSON-serialized array, or a CropShapeName[] set via property. */
  @property({ attribute: 'available-shapes' })
  availableShapes: CropShapeName[] | string | null = null;

  private toolbar: ToolbarHandle | null = null;

  firstUpdated(): void {
    this.toolbar = createToolbar(this, this.shape, {
      onRotateLeft: () => this.dispatchCommand({ type: 'rotate-left' }),
      onFlipH: () => this.dispatchCommand({ type: 'flip-h' }),
      onRotationChange: (value) => this.dispatchCommand({ type: 'rotation', value }),
      onShapeChange: (value) => this.dispatchCommand({ type: 'shape', value }),
    }, {
      showRotateButton: this.showRotateButton,
      showFlipButton: this.showFlipButton,
      showFlipVButton: this.showFlipVButton,
      showRotateSlider: this.showRotateSlider,
      showShapeSelector: this.showShapeSelector,
      toolbarPosition: this.toolbarPosition,
      availableShapes: this.parseAvailableShapes(),
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.toolbar?.destroy();
    this.toolbar = null;
  }

  render(): unknown {
    // Legacy factory owns the DOM; Lit just provides the host shell + lifecycle.
    return html``;
  }

  /** Sync the rotation slider to match controller state (no event fired). */
  setRotationValue(degrees: number): void {
    this.rotation = degrees;
    this.toolbar?.setRotation(degrees);
  }

  /** Sync the shape selector to match controller state (no event fired). */
  setShapeValue(shape: CropShapeName): void {
    this.shape = shape;
    this.toolbar?.setShape(shape);
  }

  private dispatchCommand(detail: SfxCropToolbarCommand): void {
    this.dispatchEvent(new CustomEvent('sfx-crop-toolbar-command', {
      detail,
      bubbles: true,
      composed: true,
    }));
  }

  private parseAvailableShapes(): CropShapeName[] | undefined {
    const v = this.availableShapes;
    if (!v) return undefined;
    if (Array.isArray(v)) return v;
    if (typeof v === 'string') {
      if (v.trim().startsWith('[')) {
        try { return JSON.parse(v) as CropShapeName[]; } catch { /* fall through */ }
      }
      return v.split(/[\s,]+/).filter(Boolean) as CropShapeName[];
    }
    return undefined;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sfx-crop-toolbar': SfxCropToolbarElement;
  }
}
