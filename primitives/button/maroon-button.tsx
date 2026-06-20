import { component$, useStyles$ } from '@builder.io/qwik';

interface MaroonButtonProps {
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const MaroonButton = component$<MaroonButtonProps>(({ variant = 'filled', size = 'md', disabled = false }) => {
  useStyles$(`
    .maroon-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid transparent;
      border-radius: var(--maroon-base-radius-md, 8px);
      font-family: var(--maroon-base-typography-fontFamily-sans, sans-serif);
      font-size: var(--maroon-base-typography-fontSize-${size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'base'}, 1rem);
      padding: var(--maroon-base-spacing-2, 8px) var(--maroon-base-spacing-4, 16px);
      cursor: pointer;
      transition: background-color var(--maroon-base-motion-duration-fast, 150ms), opacity var(--maroon-base-motion-duration-fast, 150ms);
    }
    .maroon-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .maroon-button.filled {
      background-color: var(--maroon-semantic-intent-inform-color, #2563eb);
      color: var(--maroon-base-palette-white, #ffffff);
    }
    .maroon-button.outlined {
      background-color: transparent;
      border-color: var(--maroon-semantic-intent-inform-color, #2563eb);
      color: var(--maroon-semantic-intent-inform-color, #2563eb);
    }
    .maroon-button.ghost {
      background-color: transparent;
      border-color: transparent;
      color: var(--maroon-semantic-intent-inform-color, #2563eb);
    }
  `);

  return (
    <button class={`maroon-button ${variant}`} disabled={disabled}>
      <slot />
    </button>
  );
});
