import { css } from 'lit';

/**
 * Rotate popover: ruler-style scrubber with dotted tick marks and a
 * centered indicator + degree readout, floating transparently over the
 * photo. No pill container, no range labels.
 */
export const sfxCropRotateStyles = css`
  :host {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .sfx-cr-rotate-root {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Trigger — reuses the toolbar's pill-shaped icon-button visual language. */
  .sfx-cr-rotate-trigger {
    width: 44px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: transparent;
    color: var(--sfx-cr-text-secondary);
    border: 1px solid transparent;
    border-radius: 999px;
    cursor: pointer;
    transition:
      border-color var(--sfx-cr-transition),
      color var(--sfx-cr-transition),
      transform var(--sfx-cr-transition);
  }
  .sfx-cr-rotate-trigger:hover {
    border-color: var(--sfx-cr-primary);
    color: var(--sfx-cr-primary);
    transform: translateY(-1px);
  }
  .sfx-cr-rotate-trigger:active {
    transform: translateY(0) scale(0.96);
  }
  .sfx-cr-rotate-trigger:focus-visible {
    outline: 2px solid var(--sfx-cr-ring);
    outline-offset: 2px;
  }
  .sfx-cr-rotate-trigger svg {
    width: 20px;
    height: 20px;
    display: block;
  }

  :host([open]) .sfx-cr-rotate-trigger {
    color: var(--sfx-cr-primary);
  }

  /* Popover — transparent container, no pill. Just the ruler + value. */
  .sfx-cr-rotate-popover {
    position: fixed;
    top: var(--sfx-cr-popover-top, 50%);
    left: var(--sfx-cr-popover-left, 50%);
    transform: translateX(-50%) translateY(6px) scale(0.98);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 0;
    background: transparent;
    border: none;
    box-shadow: none;
    opacity: 0;
    pointer-events: none;
    transition: opacity 120ms ease-in, transform 120ms ease-in;
    white-space: nowrap;
    z-index: 10;
  }

  :host([open]) .sfx-cr-rotate-popover {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
    pointer-events: auto;
    transition: opacity 220ms cubic-bezier(0.34, 1.2, 0.64, 1),
                transform 220ms cubic-bezier(0.34, 1.2, 0.64, 1);
  }

  /* Ruler viewport — fixed width, overflow clipped. Ticks scroll inside. */
  .sfx-cr-rotate-ruler {
    position: relative;
    width: var(--ruler-w, 260px);
    height: 30px;
    overflow: hidden;
    cursor: grab;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
  }
  .sfx-cr-rotate-ruler.is-dragging { cursor: grabbing; }
  .sfx-cr-rotate-ruler:focus-visible {
    outline: 2px solid var(--sfx-cr-ring);
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* Tick strip — absolutely positioned ticks, the whole strip is
     translated along X in sync with the current value. */
  .sfx-cr-rotate-ticks {
    position: absolute;
    top: 50%;
    left: 0;
    height: 100%;
    will-change: transform;
  }

  .sfx-cr-rotate-tick {
    position: absolute;
    top: 50%;
    width: 1px;
    height: 8px;
    margin-left: -0.5px;
    margin-top: -4px;
    border-radius: 0.5px;
    background: var(--sfx-cr-text);
    opacity: 0.55;
  }
  .sfx-cr-rotate-tick--major {
    width: 1px;
    height: 12px;
    margin-left: -0.5px;
    margin-top: -6px;
    opacity: 0.9;
  }

  /* Fixed center indicator — single vertical line, slightly taller than ticks. */
  .sfx-cr-rotate-indicator {
    position: absolute;
    top: calc(50% + 4px);
    height: 16px;
    left: 50%;
    width: 4px;
    margin-left: -2px;
    background: var(--sfx-cr-text);
    border-radius: 2px;
    pointer-events: none;
  }

  .sfx-cr-rotate-value {
    font-size: 14px;
    font-weight: 600;
    color: var(--sfx-cr-text);
    text-align: center;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.2px;
  }

  @media (max-width: 768px) {
    /* Slimmer ruler, shorter ticks + indicator, smaller value readout
       so the rotate scrubber doesn't dominate the photo on phones.
       Also nudge the popover a few px lower (additional translateY)
       so it sits clear of the toolbar instead of pressing against it. */
    .sfx-cr-rotate-ruler { width: 220px; height: 22px; }
    .sfx-cr-rotate-tick { height: 6px; margin-top: -3px; }
    .sfx-cr-rotate-tick--major { height: 9px; margin-top: -4.5px; }
    .sfx-cr-rotate-indicator {
      top: calc(50% + 3px);
      height: 12px;
      width: 3px;
      margin-left: -1.5px;
    }
    .sfx-cr-rotate-value { font-size: 12px; }
    /* The popover anchor positions the ruler 72px above the canvas
       bottom edge. On phones we want it closer to the edge — push it
       down further so it doesn't sit in the middle of the photo. */
    :host([open]) .sfx-cr-rotate-popover {
      transform: translateX(-50%) translateY(24px) scale(1);
    }
  }
  @media (max-width: 480px) {
    .sfx-cr-rotate-ruler { width: 180px; height: 20px; }
    .sfx-cr-rotate-tick { height: 5px; margin-top: -2.5px; }
    .sfx-cr-rotate-tick--major { height: 8px; margin-top: -4px; }
    .sfx-cr-rotate-indicator {
      top: calc(50% + 2px);
      height: 10px;
    }
    .sfx-cr-rotate-value { font-size: 11px; }
    :host([open]) .sfx-cr-rotate-popover {
      transform: translateX(-50%) translateY(30px) scale(1);
    }
  }

  /* Narrow editor — match the compact 30×30 trigger sizing of the
     rest of the vertical left-rail toolbar. */
  @media (max-width: 600px) {
    .sfx-cr-rotate-trigger {
      width: 30px;
      height: 30px;
    }
    .sfx-cr-rotate-trigger svg {
      width: 16px;
      height: 16px;
    }
  }
`;
