import { css } from 'lit';

export const sfxCropCanvasStyles = css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    background: var(--sfx-cr-canvas-bg);
  }

  canvas {
    display: block;
    width: 100%;
    height: 100%;
    outline: none;
    touch-action: none;
  }
`;
