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
    top: 16px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    z-index: 5;
    animation: sfx-cr-toolbar-enter 300ms ease forwards;
    pointer-events: none;
  }

  :host([toolbar-position="bottom"]) {
    top: auto;
    bottom: 16px;
  }

  /* Hole-punch pattern: the toolbar host is pointer-transparent and
     individual interactive children below opt back in. Gaps between
     buttons fall through to the canvas — important when a crop handle
     ends up under the floating toolbar and the user wants to grab it.
     The rotate / zoom / shapes sub-elements already follow the same
     pattern in their own stylesheets. */
  .sfx-cr-toolbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    padding: 4px 8px;
    background: transparent;
    color: var(--sfx-cr-toolbar-color);
    border: none;
    border-radius: 0;
    box-shadow: none;
    pointer-events: none;
  }

  .sfx-cr-toolbar-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  /* Sub-element hosts — same hole-punch opt-in as the plain buttons.
     Their hosts are tight inline-flex wrappers around a single trigger,
     so re-enabling them adds no extra dead zone. */
  sfx-crop-rotate,
  sfx-crop-zoom,
  sfx-crop-shapes {
    pointer-events: auto;
  }

  .sfx-cr-toolbar-btn {
    pointer-events: auto;
    width: 52px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: var(--sfx-cr-text-secondary);
    /* Transparent default border → hover swaps in a colored ring without
       the layout shifting from 0 → 1 px. */
    border: 1px solid transparent;
    border-radius: 999px;
    cursor: pointer;
    padding: 0;
    transition:
      border-color var(--sfx-cr-transition),
      color var(--sfx-cr-transition),
      transform var(--sfx-cr-transition);
  }

  .sfx-cr-toolbar-btn:hover {
    border-color: var(--sfx-cr-primary);
    color: var(--sfx-cr-primary);
    transform: translateY(-1px);
  }

  .sfx-cr-toolbar-btn:active {
    transform: translateY(0) scale(0.96);
  }

  .sfx-cr-toolbar-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .sfx-cr-toolbar-btn:disabled:hover {
    border-color: transparent;
    color: var(--sfx-cr-text-muted);
    transform: none;
  }

  .sfx-cr-toolbar-btn:focus-visible {
    outline: 2px solid var(--sfx-cr-ring);
    outline-offset: 2px;
  }

  .sfx-cr-toolbar-btn svg {
    width: 20px;
    height: 20px;
    display: block;
  }

  /* Reset pill — mirrors the shape-selector trigger visual language:
     capsule border, transparent fill, primary-blue tint on hover. Lives
     before every other control so the user can wipe back to the initial
     state in one click. */
  .sfx-cr-reset-btn {
    pointer-events: auto;
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
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.1px;
    white-space: nowrap;
    transition:
      background var(--sfx-cr-transition),
      border-color var(--sfx-cr-transition),
      color var(--sfx-cr-transition),
      transform var(--sfx-cr-transition),
      box-shadow var(--sfx-cr-transition);
  }
  .sfx-cr-reset-btn:hover {
    border-color: var(--sfx-cr-primary);
    color: var(--sfx-cr-primary);
    transform: translateY(-1px);
  }
  .sfx-cr-reset-btn:focus-visible {
    outline: 2px solid var(--sfx-cr-ring);
    outline-offset: 2px;
  }
  .sfx-cr-reset-btn svg {
    width: 18px;
    height: 18px;
    display: block;
  }

  @media (max-width: 768px) {
    .sfx-cr-toolbar {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .sfx-cr-toolbar {
      padding: 6px 8px;
      gap: 8px;
    }
    .sfx-cr-toolbar-btn {
      width: 40px;
      height: 32px;
    }
    .sfx-cr-toolbar-btn svg {
      width: 18px;
      height: 18px;
      display: block;
    }
  }

  /* Narrow editor (component itself is small, regardless of viewport):
     stack the toolbar vertically along the LEFT edge, icons only.
     Tucked tight against the edge with a compact 30×30 footprint so
     the photo behind keeps maximum breathing room. Triggered by the
     sfxcrop container set on the sfx-crop host — matches editor
     width, not viewport width, so a narrow column on a wide desktop
     gets the same compact layout. */
  @container sfxcrop (max-width: 600px) {
    :host {
      top: 8px;
      bottom: 8px;
      left: 4px;
      right: auto;
      justify-content: flex-start;
      /* Cross-axis centers the stacked button column vertically inside
         the full-height host strip — toolbar floats in the middle of
         the photo regardless of its content height. */
      align-items: center;
    }
    :host([toolbar-position="bottom"]) {
      top: 8px;
      bottom: 8px;
    }
    .sfx-cr-toolbar {
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
      padding: 3px;
    }
    .sfx-cr-toolbar-group {
      flex-direction: column;
      gap: 4px;
    }
    .sfx-cr-toolbar-btn {
      width: 30px;
      height: 30px;
    }
    .sfx-cr-toolbar-btn svg {
      width: 16px;
      height: 16px;
    }
    .sfx-cr-reset-btn {
      width: 30px;
      height: 30px;
      min-width: 0;
      padding: 0;
      gap: 0;
      justify-content: center;
    }
    .sfx-cr-reset-btn svg {
      width: 16px;
      height: 16px;
    }
    .sfx-cr-reset-btn span {
      display: none;
    }
  }
`;
