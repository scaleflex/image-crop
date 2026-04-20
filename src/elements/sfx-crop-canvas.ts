import { html, css } from 'lit';
import { query } from 'lit/decorators.js';
import { SfxCropBaseElement } from './base';

/**
 * `<sfx-crop-canvas>` — minimal host for the editor's `<canvas>`.
 *
 * Uses light DOM so the parent `<sfx-crop>`'s shadow-scoped stylesheet (which
 * carries the `--sfx-cr-*` tokens and the legacy `.ci-crop-canvas` rules)
 * applies here transparently. The `<canvas>` is rendered once and never
 * re-created, so `setPointerCapture`, non-passive `wheel` listeners, and
 * the ResizeObserver bound by the controller stay stable across Lit updates.
 *
 * Theme a consumer via `::part(canvas)` from light DOM.
 */
export class SfxCropCanvasElement extends SfxCropBaseElement {
  /** Light DOM — see class docs. */
  protected createRenderRoot(): HTMLElement {
    return this;
  }

  static styles = css``;

  @query('canvas')
  canvasEl!: HTMLCanvasElement;

  render(): unknown {
    return html`<canvas class="ci-crop-canvas" part="canvas"></canvas>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sfx-crop-canvas': SfxCropCanvasElement;
  }
}
