import { css } from 'lit';

export const sfxCropZoomStyles = css`
  :host {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: var(--sfx-cr-zoom-bar-bg);
    border-radius: 20px;
    box-shadow: var(--sfx-cr-toolbar-shadow);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: 5;
    animation: sfx-cr-zoom-enter 300ms ease 60ms forwards;
    opacity: 0;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    padding: 0;
    border-radius: 4px;
    transition: color var(--sfx-cr-transition), background var(--sfx-cr-transition);
  }
  button:hover {
    color: rgba(255, 255, 255, 0.8);
    background: var(--sfx-cr-btn-hover-bg);
  }
  button:focus-visible {
    outline: 2px solid var(--sfx-cr-accent);
    outline-offset: 2px;
  }
  button svg {
    width: 16px;
    height: 16px;
  }

  input[type="range"] {
    width: 100px;
    height: 3px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--sfx-cr-slider-track);
    border-radius: 1.5px;
    outline: none;
    cursor: pointer;
  }

  .sfx-cr-zoom-label {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.6);
    min-width: 36px;
    text-align: center;
    font-variant-numeric: tabular-nums;
    opacity: 0;
    transition: opacity 150ms ease;
    pointer-events: none;
  }

  :host(:hover) .sfx-cr-zoom-label { opacity: 1; }

  @media (max-width: 480px) { input[type="range"] { width: 70px; } }
`;
