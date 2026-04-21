import { css } from 'lit';

/**
 * Capsule shape-selector. Trigger + dropdown follow uploader's source-pill
 * language: glassy trigger, primary tint on hover, 12px dropdown radius
 * with a soft shadow, primary-blue accent on the active option.
 */
export const sfxCropShapesStyles = css`
  :host {
    position: relative;
    display: inline-block;
  }

  .sfx-cr-shape-trigger {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    min-width: 84px;
    height: 36px;
    background: transparent;
    color: var(--sfx-cr-text-secondary);
    border: 1.5px solid var(--sfx-cr-border);
    border-radius: 50px;
    cursor: pointer;
    font-family: var(--sfx-cr-font);
    font-size: 13px;
    font-weight: 500;
    transition:
      background var(--sfx-cr-transition),
      border-color var(--sfx-cr-transition),
      color var(--sfx-cr-transition),
      transform var(--sfx-cr-transition),
      box-shadow var(--sfx-cr-transition);
    white-space: nowrap;
    letter-spacing: 0.1px;
  }

  .sfx-cr-shape-trigger:hover {
    background: var(--sfx-cr-btn-hover-bg);
    border-color: var(--sfx-cr-primary);
    color: var(--sfx-cr-primary);
    transform: translateY(-1px);
    box-shadow: 0 2px 10px var(--sfx-cr-primary-glow);
  }

  .sfx-cr-shape-trigger:focus-visible {
    outline: 2px solid var(--sfx-cr-ring);
    outline-offset: 2px;
  }

  .sfx-cr-shape-trigger-icon {
    display: flex;
    width: 18px;
    height: 18px;
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
    bottom: calc(100% + 10px);
    right: 0;
    min-width: 180px;
    padding: 6px;
    background: var(--sfx-cr-dropdown-bg);
    border: 1px solid var(--sfx-cr-border);
    border-radius: 12px;
    box-shadow: var(--sfx-cr-dropdown-shadow);
    z-index: 100;
    opacity: 0;
    transform: translateY(6px) scale(0.96);
    pointer-events: none;
    transition: opacity 120ms ease-in, transform 120ms ease-in;
  }

  :host([open]) .sfx-cr-shape-dropdown {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
    transition: opacity 220ms cubic-bezier(0.34, 1.2, 0.64, 1),
                transform 220ms cubic-bezier(0.34, 1.2, 0.64, 1);
  }

  .sfx-cr-shape-option {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 8px 12px;
    height: 36px;
    background: transparent;
    color: var(--sfx-cr-text);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: var(--sfx-cr-font);
    font-size: 13px;
    font-weight: 500;
    text-align: left;
    transition: background var(--sfx-cr-transition), color var(--sfx-cr-transition);
  }

  .sfx-cr-shape-option:hover {
    background: var(--sfx-cr-dropdown-hover);
    color: var(--sfx-cr-primary);
  }

  .sfx-cr-shape-option:focus-visible {
    outline: 2px solid var(--sfx-cr-ring);
    outline-offset: -2px;
  }

  .sfx-cr-shape-option--active {
    background: var(--sfx-cr-primary-bg);
    color: var(--sfx-cr-primary);
  }

  .sfx-cr-shape-option-icon {
    display: flex;
    width: 18px;
    height: 18px;
  }
  .sfx-cr-shape-option-icon svg { width: 100%; height: 100%; }

  @media (max-width: 768px) {
    .sfx-cr-shape-trigger-label { display: none; }
    .sfx-cr-shape-trigger { min-width: 0; padding: 8px 10px; }
  }
`;
