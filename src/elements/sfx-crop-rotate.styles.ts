import { css } from 'lit';

export const sfxCropRotateStyles = css`
  :host {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 8px;
  }

  .sfx-cr-rotate-track {
    position: relative;
    display: flex;
    align-items: center;
  }

  .sfx-cr-rotate-center-tick {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1px;
    height: 10px;
    background: var(--sfx-cr-text-muted);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .sfx-cr-rotate-range-label {
    font-size: 10px;
    font-weight: 500;
    color: var(--sfx-cr-text-muted);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.2px;
  }

  input[type="range"] {
    width: 128px;
    height: 3px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--sfx-cr-slider-track);
    border-radius: 1.5px;
    outline: none;
    cursor: pointer;
  }

  .sfx-cr-rotate-value {
    font-size: 11px;
    font-weight: 500;
    color: var(--sfx-cr-text-secondary);
    min-width: 44px;
    text-align: center;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.2px;
  }

  @media (max-width: 768px) { input[type="range"] { width: 100px; } }
  @media (max-width: 480px) {
    input[type="range"] { width: 72px; }
    .sfx-cr-rotate-range-label { display: none; }
  }
`;
