import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type TextileMaterial = 'linen' | 'padded' | 'gingham' | 'quilt' | 'raw-edge';
export type TextileTone = 'clay' | 'sage' | 'blue' | 'rose' | 'oat';
export type TextileSize = 'sm' | 'md' | 'lg';

export interface TextileButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  material?: TextileMaterial;
  tone?: TextileTone;
  size?: TextileSize;
  leading?: ReactNode;
  trailing?: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

/** Semantic native button with decorative, pointer-events-none faux fabric layers. */
export const TextileButton = forwardRef<HTMLButtonElement, TextileButtonProps>(function TextileButton(
  { children, material = 'padded', tone = 'clay', size = 'md', leading, trailing, fullWidth = false, loading = false, className = '', disabled, ...rest },
  ref,
) {
  return (
    <button
      {...rest}
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`ll-button ll-button--${material} ll-button--${tone} ll-button--${size} ${fullWidth ? 'll-button--full' : ''} ${className}`.trim()}
    >
      <span className="ll-button__content">
        {loading ? <span className="ll-spinner" aria-hidden="true" /> : leading}
        <span>{children}</span>
        {trailing}
      </span>
    </button>
  );
});
