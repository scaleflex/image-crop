import { css } from 'lit';

/**
 * Zoom bar styled as a secondary glassy pill floating above the toolbar —
 * mirrors uploader's compact utility bars.
 */
export const sfxCropZoomStyles = css`
  :host {
    position: absolute;
    bottom: 72px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 14px;
    background: var(--sfx-cr-zoom-bar-bg);
    border: 1px solid var(--sfx-cr-toolbar-border);
    border-radius: 50px;
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
    width: 26px;
    height: 26px;
    background: transparent;
    border: none;
    color: var(--sfx-cr-text-secondary);
    cursor: pointer;
    padding: 0;
    border-radius: 50%;
    transition:
      color var(--sfx-cr-transition),
      background var(--sfx-cr-transition),
      transform var(--sfx-cr-transition);
  }
  button:hover {
    color: var(--sfx-cr-primary);
    background: var(--sfx-cr-btn-hover-bg);
    transform: translateY(-1px);
  }
  button:active {
    transform: translateY(0) scale(0.96);
  }
  button:focus-visible {
    outline: 2px solid var(--sfx-cr-ring);
    outline-offset: 2px;
  }
  button svg {
    width: 14px;
    height: 14px;
  }

  input[type="range"] {
    width: 110px;
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
    font-weight: 600;
    color: var(--sfx-cr-text-secondary);
    min-width: 40px;
    text-align: center;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.2px;
    transition: color 150ms ease;
  }

  :host(:hover) .sfx-cr-zoom-label { color: var(--sfx-cr-primary); }

  @media (max-width: 480px) { input[type="range"] { width: 80px; } }
`;
