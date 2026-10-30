import type { ButtonHTMLAttributes } from 'react';

export type SwatchPattern = 'gingham' | 'rose' | 'denim' | 'butterfly' | 'butter' | 'linen';
export interface FabricSwatchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  pattern: SwatchPattern;
  selected?: boolean;
  showLabel?: boolean;
}

export function FabricSwatch({ label, pattern, selected = false, showLabel = true, className = '', ...rest }: FabricSwatchProps) {
  return (
    <button {...rest} type={rest.type ?? 'button'} className={`ll-swatch ${selected ? 'll-swatch--selected' : ''} ${className}`} aria-label={label} aria-pressed={selected}>
      <span className={`ll-swatch__cloth ll-swatch__cloth--${pattern}`}>
        {selected && <span className="ll-swatch__check" aria-hidden="true">✓</span>}
      </span>
      {showLabel && <span className="ll-swatch__label">{label}</span>}
    </button>
  );
}
