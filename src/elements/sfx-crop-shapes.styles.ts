import { css } from 'lit';

export const sfxCropShapesStyles = css`
  :host {
    position: relative;
    display: inline-block;
  }

  .sfx-cr-shape-trigger {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    min-width: 80px;
    height: 36px;
    background: transparent;
    color: var(--sfx-cr-toolbar-color);
    border: 1px solid var(--sfx-cr-separator-color);
    border-radius: var(--sfx-cr-btn-radius);
    cursor: pointer;
    font-family: var(--sfx-cr-font);
    font-size: 12px;
    font-weight: 400;
    transition:
      background var(--sfx-cr-transition),
      border-color var(--sfx-cr-transition);
    white-space: nowrap;
  }

  .sfx-cr-shape-trigger:hover {
    background: var(--sfx-cr-btn-hover-bg);
    border-color: rgba(255, 255, 255, 0.25);
  }

  .sfx-cr-shape-trigger:focus-visible {
    outline: 2px solid var(--sfx-cr-accent);
    outline-offset: 2px;
  }

  .sfx-cr-shape-trigger-icon {
    display: flex;
    width: 20px;
    height: 20px;
  }
  .sfx-cr-shape-trigger-icon svg { width: 100%; height: 100%; }

  .sfx-cr-shape-trigger-label { line-height: 1; }

  .sfx-cr-shape-chevron {
    display: flex;
    width: 12px;
    height: 12px;
    margin-left: auto;
    transition: transform var(--sfx-cr-transition);
  }
  .sfx-cr-shape-chevron svg { width: 100%; height: 100%; }

  :host([open]) .sfx-cr-shape-chevron {
    transform: rotate(180deg);
  }

  .sfx-cr-shape-dropdown {
    position: absolute;
    bottom: calc(100% + 8px);
    right: 0;
    min-width: 160px;
    padding: 4px;
    background: var(--sfx-cr-dropdown-bg);
    border-radius: 10px;
    box-shadow: var(--sfx-cr-dropdown-shadow);
    z-index: 100;
    opacity: 0;
    transform: translateY(4px) scale(0.95);
    pointer-events: none;
    transition: opacity 120ms ease-in, transform 120ms ease-in;
  }

  :host([open]) .sfx-cr-shape-dropdown {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
    transition: opacity 180ms ease-out, transform 180ms ease-out;
  }

  .sfx-cr-shape-option {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 12px;
    height: 36px;
    background: transparent;
    color: var(--sfx-cr-toolbar-color);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-family: var(--sfx-cr-font);
    font-size: 13px;
    font-weight: 400;
    text-align: left;
    transition: background var(--sfx-cr-transition);
  }

  .sfx-cr-shape-option:hover {
    background: var(--sfx-cr-dropdown-hover);
  }

  .sfx-cr-shape-option:focus-visible {
    outline: 2px solid var(--sfx-cr-accent);
    outline-offset: -2px;
  }

  .sfx-cr-shape-option--active {
    background: rgba(79, 195, 247, 0.12);
    color: var(--sfx-cr-accent);
  }

  .sfx-cr-shape-option-icon {
    display: flex;
    width: 20px;
    height: 20px;
  }
  .sfx-cr-shape-option-icon svg { width: 100%; height: 100%; }

  @media (max-width: 768px) {
    .sfx-cr-shape-trigger-label { display: none; }
  }
`;
