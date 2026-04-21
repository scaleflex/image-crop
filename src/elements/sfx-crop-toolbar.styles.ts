import { css } from 'lit';

export const sfxCropToolbarStyles = css`
  :host {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
  }

  :host([toolbar-position="top"]) {
    bottom: auto;
    top: 12px;
  }

  .sfx-cr-toolbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    padding: 6px 10px;
    background: var(--sfx-cr-toolbar-bg);
    color: var(--sfx-cr-toolbar-color);
    border-radius: var(--sfx-cr-toolbar-border-radius);
    box-shadow: var(--sfx-cr-toolbar-shadow);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    animation: sfx-cr-toolbar-enter 300ms ease forwards;
  }

  .sfx-cr-toolbar-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }

  .sfx-cr-toolbar-btn {
    width: var(--sfx-cr-btn-size);
    height: var(--sfx-cr-btn-size);
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: var(--sfx-cr-toolbar-color);
    border: none;
    border-radius: var(--sfx-cr-btn-radius);
    cursor: pointer;
    padding: 0;
    opacity: 0.8;
    transition:
      background var(--sfx-cr-transition),
      transform var(--sfx-cr-transition),
      opacity var(--sfx-cr-transition);
  }

  .sfx-cr-toolbar-btn:hover {
    background: var(--sfx-cr-btn-hover-bg);
    opacity: 1;
    transform: scale(1.02);
  }

  .sfx-cr-toolbar-btn:active {
    background: var(--sfx-cr-btn-active-bg);
    transform: scale(0.96);
  }

  .sfx-cr-toolbar-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .sfx-cr-toolbar-btn:disabled:hover {
    background: transparent;
    transform: none;
  }

  .sfx-cr-toolbar-btn:focus-visible {
    outline: 2px solid var(--sfx-cr-accent);
    outline-offset: 2px;
  }

  .sfx-cr-toolbar-btn svg {
    width: 20px;
    height: 20px;
  }

  .sfx-cr-toolbar-separator {
    width: 1px;
    height: 20px;
    margin: 0 6px;
    background: var(--sfx-cr-separator-color);
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .sfx-cr-toolbar {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .sfx-cr-toolbar {
      padding: 4px 6px;
      gap: 2px;
      flex-wrap: wrap;
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
