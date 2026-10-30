import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
export interface StitchFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}
export function StitchField({ label, hint, error, id, className = '', ...rest }: StitchFieldProps) {
  const generated = useId();
  const actualId = id ?? generated;
  const helpId = `${actualId}-help`;
  return (
    <div className={`ll-field ${error ? 'll-field--error' : ''} ${className}`}>
      <label className="ll-field__label" htmlFor={actualId}>{label}</label>
      <input {...rest} id={actualId} className="ll-field__input" aria-invalid={error ? true : undefined} aria-describedby={hint || error ? helpId : undefined} />
      {(hint || error) && <small id={helpId} className="ll-field__hint">{error ?? hint}</small>}
    </div>
  );
}
