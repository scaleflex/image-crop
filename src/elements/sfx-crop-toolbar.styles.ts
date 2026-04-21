import { css } from 'lit';

/**
 * Floating pill toolbar — mirrors the glassy source-pill row in
 * `@scaleflex/uploader`. The bar is centered horizontally above or below
 * the canvas with a translucent white background, backdrop blur, and a
 * soft shadow ring.
 */
export const sfxCropToolbarStyles = css`
  :host {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    animation: sfx-cr-toolbar-enter 300ms ease forwards;
  }

  :host([toolbar-position="top"]) {
    bottom: auto;
    top: 16px;
  }

  .sfx-cr-toolbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    background: var(--sfx-cr-toolbar-bg);
    color: var(--sfx-cr-toolbar-color);
    border: 1px solid var(--sfx-cr-toolbar-border);
    border-radius: 50px;
    box-shadow: var(--sfx-cr-toolbar-shadow);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .sfx-cr-toolbar-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }

  .sfx-cr-toolbar-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: var(--sfx-cr-text-secondary);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    padding: 0;
    transition:
      background var(--sfx-cr-transition),
      color var(--sfx-cr-transition),
      transform var(--sfx-cr-transition);
  }

  .sfx-cr-toolbar-btn:hover {
    background: var(--sfx-cr-btn-hover-bg);
    color: var(--sfx-cr-primary);
    transform: translateY(-1px);
  }

  .sfx-cr-toolbar-btn:active {
    background: var(--sfx-cr-btn-active-bg);
    transform: translateY(0) scale(0.96);
  }

  .sfx-cr-toolbar-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .sfx-cr-toolbar-btn:disabled:hover {
    background: transparent;
    color: var(--sfx-cr-text-muted);
    transform: none;
  }

  .sfx-cr-toolbar-btn:focus-visible {
    outline: 2px solid var(--sfx-cr-ring);
    outline-offset: 2px;
  }

  .sfx-cr-toolbar-btn svg {
    width: 18px;
    height: 18px;
  }

  .sfx-cr-toolbar-separator {
    width: 1px;
    height: 22px;
    margin: 0 4px;
    background: var(--sfx-cr-separator-color);
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .sfx-cr-toolbar {
      flex-wrap: wrap;
      justify-content: center;
      border-radius: 20px;
    }
  }

  @media (max-width: 480px) {
    .sfx-cr-toolbar {
      padding: 6px 8px;
      gap: 2px;
    }
    .sfx-cr-toolbar-btn {
      width: 32px;
      height: 32px;
    }
    .sfx-cr-toolbar-btn svg {
      width: 16px;
      height: 16px;
    }
  }
`;
