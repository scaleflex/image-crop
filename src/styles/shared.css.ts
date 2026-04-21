import { css } from 'lit';

/**
 * Design tokens — declared on `:host` of the top-level `<sfx-crop>` only.
 * Children inherit the resolved values through CSS custom-property
 * inheritance (tokens cascade across shadow boundaries automatically), so
 * sub-elements' `var(--sfx-cr-*)` lookups always see the parent's current
 * theme values. Consumers override any of these from light DOM, e.g.
 * `<sfx-crop style="--sfx-cr-accent:#ff3366">`.
 */
export const designTokens = css`
  :host {
    --sfx-cr-bg: #1a1a1a;
    --sfx-cr-canvas-bg: #111111;
    --sfx-cr-toolbar-bg: rgba(28, 28, 30, 0.92);
    --sfx-cr-toolbar-color: #f0f0f0;
    --sfx-cr-toolbar-border-radius: 10px;
    --sfx-cr-toolbar-shadow: 0 -4px 20px rgba(0, 0, 0, 0.25);
    --sfx-cr-btn-size: 36px;
    --sfx-cr-btn-radius: 8px;
    --sfx-cr-btn-hover-bg: rgba(255, 255, 255, 0.08);
    --sfx-cr-btn-active-bg: rgba(255, 255, 255, 0.14);
    --sfx-cr-accent: #4fc3f7;
    --sfx-cr-accent-hover: #81d4fa;
    --sfx-cr-separator-color: rgba(255, 255, 255, 0.1);
    --sfx-cr-slider-track: rgba(255, 255, 255, 0.15);
    --sfx-cr-slider-fill: #4fc3f7;
    --sfx-cr-slider-thumb: #ffffff;
    --sfx-cr-dropdown-bg: rgba(38, 38, 40, 0.96);
    --sfx-cr-dropdown-hover: rgba(255, 255, 255, 0.06);
    --sfx-cr-dropdown-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2);
    --sfx-cr-transition: 200ms ease;
    --sfx-cr-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --sfx-cr-error-color: #ff6b6b;
    --sfx-cr-success-color: #69db7c;
    --sfx-cr-zoom-bar-bg: rgba(28, 28, 30, 0.6);
  }

  :host([theme="light"]) {
    --sfx-cr-bg: #f5f5f7;
    --sfx-cr-canvas-bg: #e8e8e8;
    --sfx-cr-toolbar-bg: rgba(255, 255, 255, 0.92);
    --sfx-cr-toolbar-color: #1d1d1f;
    --sfx-cr-btn-hover-bg: rgba(0, 0, 0, 0.05);
    --sfx-cr-btn-active-bg: rgba(0, 0, 0, 0.1);
    --sfx-cr-accent: #0071e3;
    --sfx-cr-accent-hover: #0077ed;
    --sfx-cr-separator-color: rgba(0, 0, 0, 0.1);
    --sfx-cr-slider-track: rgba(0, 0, 0, 0.12);
    --sfx-cr-slider-fill: #0071e3;
    --sfx-cr-slider-thumb: #ffffff;
    --sfx-cr-dropdown-bg: rgba(255, 255, 255, 0.96);
    --sfx-cr-dropdown-hover: rgba(0, 0, 0, 0.06);
    --sfx-cr-dropdown-shadow: 0 8px 32px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.08);
    --sfx-cr-zoom-bar-bg: rgba(255, 255, 255, 0.6);
  }
`;

/**
 * Shared helpers reused across multiple elements' shadow trees:
 * - `.sfx-cr-sr-only` — visually-hidden, screen-reader-visible region
 * - reduced-motion transition clamp
 */
export const baseStyles = css`
  .sfx-cr-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    :host, :host *, :host *::before, :host *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }
  }
`;

export const spinKeyframes = css`
  @keyframes sfx-cr-spin { to { transform: rotate(360deg); } }
`;

export const toolbarEnterKeyframes = css`
  @keyframes sfx-cr-toolbar-enter {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
`;

export const zoomEnterKeyframes = css`
  @keyframes sfx-cr-zoom-enter {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
`;

/** Shared slider-thumb styling used by zoom + rotate inputs. */
export const sliderThumbStyles = css`
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--sfx-cr-slider-thumb);
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    transition: transform 150ms ease, box-shadow 150ms ease;
  }
  input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.15);
    box-shadow: 0 0 0 4px rgba(79, 195, 247, 0.25);
  }
  input[type="range"]::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--sfx-cr-slider-thumb);
    border: none;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }
`;
