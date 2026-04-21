import { css } from 'lit';

/**
 * `<sfx-crop>` host + container + loading/error overlay rules.
 *
 * Paired with {@link designTokens} and {@link baseStyles} from
 * `../styles/shared.css` in the element's `static styles`.
 */
export const sfxCropStyles = css`
  :host {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
  }

  :host([hidden]) { display: none; }

  :host(:focus-visible) {
    outline: 2px solid var(--sfx-cr-accent);
    outline-offset: 2px;
  }

  .sfx-cr-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background: var(--sfx-cr-bg);
    border-radius: 12px;
    font-family: var(--sfx-cr-font);
    user-select: none;
    -webkit-user-select: none;
  }

  .sfx-cr-loading {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background: var(--sfx-cr-bg);
    z-index: 10;
    transition: opacity 300ms ease;
  }
  .sfx-cr-loading--hidden {
    opacity: 0;
    pointer-events: none;
  }

  .sfx-cr-loading-spinner {
    width: 36px;
    height: 36px;
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-top-color: var(--sfx-cr-accent);
    border-radius: 50%;
    animation: sfx-cr-spin 0.8s linear infinite;
  }

  .sfx-cr-loading-text {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
  }

  .sfx-cr-error {
    position: absolute;
    inset: 0;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: var(--sfx-cr-bg);
    z-index: 10;
    color: var(--sfx-cr-error-color);
    font-size: 14px;
  }
  .sfx-cr-error--visible { display: flex; }
`;
