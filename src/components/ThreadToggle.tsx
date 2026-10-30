import { useId } from 'react';
export interface ThreadToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}
export function ThreadToggle({ label, description, checked, onChange }: ThreadToggleProps) {
  const id = useId();
  return <label htmlFor={id} className="ll-toggle-row">
    <span className="ll-toggle-copy"><strong>{label}</strong>{description && <small>{description}</small>}</span>
    <span className="ll-toggle">
      <input id={id} type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="ll-toggle__track" aria-hidden="true"><span className="ll-toggle__knob" /></span>
    </span>
  </label>;
}
