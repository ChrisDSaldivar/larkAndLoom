import type { HTMLAttributes, ReactNode } from 'react';

type TagKind = 'sewn' | 'pinked' | 'paper' | 'plain';
type TagColor = 'rose' | 'sage' | 'oat' | 'blue' | 'clay';
export interface TextileTagProps extends HTMLAttributes<HTMLSpanElement> {
  kind?: TagKind;
  color?: TagColor;
  icon?: ReactNode;
}

export function TextileTag({ children, kind = 'sewn', color = 'oat', icon, className = '', ...rest }: TextileTagProps) {
  return <span {...rest} className={`ll-tag ll-tag--${kind} ll-tag--${color} ${className}`}>{icon}<span>{children}</span></span>;
}
