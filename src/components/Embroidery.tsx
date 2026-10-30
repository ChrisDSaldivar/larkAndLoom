import { useId } from 'react';
import type { SVGProps } from 'react';
export type EmbroideryDesign = 'daisy' | 'sprig' | 'strawberry' | 'heart' | 'none';
export interface EmbroideryProps extends SVGProps<SVGSVGElement> { design?: EmbroideryDesign; size?: number }
/** Tiny thread illustrations. Shapes are SVG strokes, not emoji or raster stickers. */
export function Embroidery({ design = 'daisy', size = 42, ...props }: EmbroideryProps) {
  const tid = useId().replaceAll(':', '');
  if (design === 'none') return null;
  const green = '#48684a';
  return <svg {...props} width={size} height={size} viewBox="0 0 80 80" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id={`petal-yarn-${tid}`} width="2.7" height="2.7" patternUnits="userSpaceOnUse" patternTransform="rotate(21)">
        <rect width="2.7" height="2.7" fill="#faeed1"/>
        <path d="M0 0 H2.7" stroke="#fffaf0" opacity=".8" strokeWidth="1.3"/>
        <path d="M0 1.6 H2.7" stroke="#d1bb94" opacity=".5" strokeWidth=".6"/>
      </pattern>
      <pattern id={`red-yarn-${tid}`} width="3.1" height="3.1" patternUnits="userSpaceOnUse" patternTransform="rotate(-34)">
        <rect width="3.1" height="3.1" fill="#c65b50"/>
        <path d="M0 0 H3.1" stroke="#e99182" strokeWidth="1.25" opacity=".8"/>
        <path d="M0 2.4 H3.1" stroke="#8f3b34" strokeWidth=".55" opacity=".7"/>
      </pattern>
    </defs>
    {design === 'daisy' && <>
      <path d="M39 67 C37 58 37 48 39 37 M40 56 Q28 47 20 52 Q30 59 40 56 M39 48 Q50 40 56 46 Q49 52 39 48" stroke={green} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M39 66 C37 55 38 46 39 38 M40 55 Q28 48 22 52 M40 48 Q49 42 54 46" stroke="#91ab82" strokeWidth="1" strokeDasharray="3 2" strokeLinecap="round"/>
      {[0,45,90,135,180,225,270,315].map(a => <g key={a} transform={`rotate(${a} 39 30)`}><ellipse cx="39" cy="17.5" rx="5.7" ry="10.8" fill={`url(#petal-yarn-${tid})`} stroke="#fdf6e6" strokeWidth="1.2"/><path d="M39 9 L39 23" stroke="#cbb887" strokeWidth=".8" strokeDasharray="2 1.6"/></g>)}
      <circle cx="39" cy="30" r="7.4" fill="#d29a38" stroke="#a76f27" strokeWidth="1.1"/>
      <path d="M34 29 l2 1 m3 -3 l2 1 m-2 5 l2 1" stroke="#f2d87a" strokeWidth="1.1" strokeLinecap="round"/>
      <path d="M56 62 Q62 56 68 58" stroke="#a6663c" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="1.5 2"/>
    </>}
    {design === 'sprig' && <>
      <path d="M16 69 C28 58 31 42 43 31 Q52 22 63 12" stroke="#405a3c" strokeWidth="2.6" strokeLinecap="round"/>
      <path d="M16 69 C28 58 31 42 43 31 Q52 22 63 12" stroke="#a2b38b" strokeWidth=".8" strokeDasharray="2 1.4"/>
      {[[25,57,-65],[31,46,40],[40,34,-48],[51,24,56],[61,14,10]].map(([x,y,angle],i)=><g key={i} transform={`translate(${x} ${y}) rotate(${angle})`}>
        <defs><clipPath id={`leaf-${tid}-${i}`}><path d="M0 1 Q-13 -8 0 -25 Q12 -10 0 1Z"/></clipPath></defs>
        <path d="M0 1 Q-13 -8 0 -25 Q12 -10 0 1Z" fill={i%2?'#7b9060':'#506e47'} stroke="#455b39" strokeWidth=".7"/>
        <g clipPath={`url(#leaf-${tid}-${i})`} strokeLinecap="round">{Array.from({length:12},(_,j)=><g key={j}><path d={`M-10 ${-j*2-5} L0 ${-j*2} L10 ${-j*2-6}`} stroke={j%2?'#a9b58c':'#8f9e73'} strokeWidth=".85"/><path d={`M-9 ${-j*2-6} L0 ${-j*2-1} L9 ${-j*2-7}`} stroke="#3e5837" strokeWidth=".35" opacity=".55"/></g>)}</g>
        <path d="M0 0 Q-1 -12 0 -23" stroke="#c2cba0" strokeWidth=".65"/>
      </g>)}
    </>}
    {design === 'strawberry' && <>
      <path d="M20 24 C14 33 20 49 35 63 Q40 68 45 63 C62 49 66 31 56 24 Q49 17 40 23 Q28 15 20 24 Z" fill={`url(#red-yarn-${tid})`} stroke="#a5423b" strokeWidth="2.5"/>
      <path d="M18 21 Q30 17 40 22 Q51 17 61 22 Q52 31 44 27 Q41 35 38 28 Q27 31 18 21 Z" fill="#567e4d" stroke="#305a3c" strokeWidth="1.5"/>
      <path d="M39 21 Q39 12 46 10" stroke="#547a4e" strokeWidth="3" strokeLinecap="round"/>
      {[[27,34],[39,34],[51,34],[32,45],[44,45],[39,55]].map(([x,y],i)=><path key={i} d={`M${x-1} ${y-2} l2 4`} stroke="#f8dab5" strokeWidth="2.4" strokeLinecap="round"/>)}
      <path d="M22 28 Q16 41 32 56" stroke="#e68b7d" strokeWidth="1" strokeDasharray="3 3"/>
    </>}
    {design === 'heart' && <>
      <path d="M40 65 C18 52 12 40 14 29 C16 12 33 13 40 25 C47 13 64 12 66 29 C68 40 62 52 40 65 Z" fill={`url(#red-yarn-${tid})`} stroke="#913b36" strokeWidth="2.4" strokeLinejoin="round"/>
      <path d="M40 57 C22 46 19 37 21 29 C23 20 33 22 40 32 C47 22 57 20 59 29 C61 37 58 46 40 57 Z" stroke="#f2bcac" strokeWidth="1.5" strokeDasharray="2.7 3" strokeLinecap="round"/>
    </>}
  </svg>;
}
