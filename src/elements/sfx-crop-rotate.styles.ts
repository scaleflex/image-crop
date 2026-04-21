import { css } from 'lit';

export const sfxCropRotateStyles = css`
  :host {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 4px;
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
    height: 8px;
    background: rgba(255, 255, 255, 0.4);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .sfx-cr-rotate-range-label {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.4);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  input[type="range"] {
    width: 120px;
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
    color: rgba(255, 255, 255, 0.6);
    min-width: 40px;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }

  @media (max-width: 768px) { input[type="range"] { width: 100px; } }
  @media (max-width: 480px) {
    input[type="range"] { width: 80px; }
    .sfx-cr-rotate-range-label { display: none; }
  }
`;
