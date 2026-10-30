import { forwardRef, useId } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Embroidery } from './Embroidery';
import type { EmbroideryDesign } from './Embroidery';

export type FabricCut = 'pillow' | 'scallop' | 'pinked' | 'ticket' | 'flower' | 'circle';
export type FabricTexture = 'cotton' | 'gingham' | 'linen' | 'quilt' | 'denim';
export type FabricColor = 'terracotta' | 'sage' | 'cream' | 'rose' | 'denim' | 'mustard';
export interface FabricButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  cut?: FabricCut;
  texture?: FabricTexture;
  color?: FabricColor;
  motif?: EmbroideryDesign;
  trailing?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
}
function scallopPath(inset=0) {
  // Round, embroidered scallops. Curved lobes are intentionally distinct from pinked zigzags.
  const x0=12+inset, y0=12+inset, x1=288-inset, y1=88-inset;
  let d=`M ${x0} ${y0}`;
  const h=(x1-x0)/13, v=(y1-y0)/4;
  for(let i=0;i<13;i++){const x=x0+i*h;d+=` Q ${(x+h/2).toFixed(2)} ${(y0-8).toFixed(2)} ${(x+h).toFixed(2)} ${y0}`;}
  for(let i=0;i<4;i++){const y=y0+i*v;d+=` Q ${(x1+9).toFixed(2)} ${(y+v/2).toFixed(2)} ${x1} ${(y+v).toFixed(2)}`;}
  for(let i=0;i<13;i++){const x=x1-i*h;d+=` Q ${(x-h/2).toFixed(2)} ${(y1+8).toFixed(2)} ${(x-h).toFixed(2)} ${y1}`;}
  for(let i=0;i<4;i++){const y=y1-i*v;d+=` Q ${(x0-9).toFixed(2)} ${(y-v/2).toFixed(2)} ${x0} ${(y-v).toFixed(2)}`;}
  return d+' Z';
}
function zigzagPath(inset=0) {
  const pts:string[]=[];const x0=5+inset,x1=295-inset,y0=5+inset,y1=95-inset;
  for(let x=x0;x<=x1;x+=10){pts.push(`${x},${(Math.round((x-x0)/10)%2===0?y0+6:y0).toFixed(1)}`)}
  for(let y=y0+10;y<=y1;y+=10){pts.push(`${(Math.round((y-y0)/10)%2===0?x1-6:x1).toFixed(1)},${y}`)}
  for(let x=x1-10;x>=x0;x-=10){pts.push(`${x},${(Math.round((x1-x)/10)%2===0?y1-6:y1).toFixed(1)}`)}
  for(let y=y1-10;y>=y0;y-=10){pts.push(`${(Math.round((y1-y)/10)%2===0?x0+6:x0).toFixed(1)},${y}`)}
  return `M${pts.join(' L')} Z`;
}
function rosettePath(inner=false) {
  const points:string[]=[];
  for(let i=0;i<=240;i++){
    const t=Math.PI*2*i/240;
    const scallop=(inner ? .92 : .92)+.065*Math.cos(8*t);
    const rad=(inner? 42:47)*scallop;
    const x=50+rad*Math.cos(t),y=50+rad*Math.sin(t);
    points.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `M ${points.join(' L ')} Z`;
}
function outlinePath(cut:FabricCut) {
  if(cut==='circle') return 'M 50 4 A 46 46 0 1 1 49.99 4 Z';
  if(cut==='flower') return rosettePath();
  if(cut==='pinked') return zigzagPath();
  if(cut==='scallop') return scallopPath();
  if(cut==='ticket') return 'M23 5 H277 Q295 5 295 25 V36 Q281 50 295 64 V75 Q295 95 277 95 H23 Q5 95 5 75 V64 Q19 50 5 36 V25 Q5 5 23 5 Z';
  return 'M46 5 H254 C279 5 295 25 295 50 C295 75 279 95 254 95 H46 C21 95 5 75 5 50 C5 25 21 5 46 5 Z';
}
function stitchPath(cut:FabricCut) {
  if(cut==='circle') return 'M50 11 A39 39 0 1 1 49.99 11 Z';
  if(cut==='flower') return rosettePath(true);
  if(cut==='pinked') return 'M21 16 H279 V84 H21 Z';
  if(cut==='ticket') return 'M27 14 H273 Q287 14 287 27 V34 Q273 50 287 66 V74 Q287 86 273 86 H27 Q13 86 13 74 V66 Q27 50 13 34 V27 Q13 14 27 14 Z';
  if(cut==='scallop') return 'M26 15 H274 Q284 15 284 25 V75 Q284 85 274 85 H26 Q16 85 16 75 V25 Q16 15 26 15 Z';
  return 'M47 14 H253 C275 14 286 29 286 50 C286 71 275 86 253 86 H47 C25 86 14 71 14 50 C14 29 25 14 47 14 Z';
}
/** Material layer: woven raster fibers under actual SVG seams, piping and cloth folds.
 * We do not use a glossy button highlight. Every texture is woven at yarn scale.
 * The relief is mostly local to the threads and to the perimeter seam.
 */
export function TextileUnderlay({cut,texture,color}:{cut:FabricCut; texture:FabricTexture; color:FabricColor}) {
  const uid=useId().replaceAll(':','');
  const round=cut==='circle'||cut==='flower';
  const view=round?'0 0 100 100':'0 0 300 100';
  const path=outlinePath(cut),stitch=stitchPath(cut);
  const main=`fb-clip-${uid}`;
  const weave=`fb-real-weave-${uid}`;
  const shading=`fb-shade-${uid}`;
  const edge=`fb-edge-${uid}`;
  const finish=`fb-finish-${uid}`;
  return <svg className="fb-underlay" viewBox={view} preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <defs>
      <clipPath id={main}><path d={path}/></clipPath>
      <pattern id={weave} width="220" height="220" patternUnits="userSpaceOnUse">
        <image href={`./textures/${texture}-${color}.webp`} x="0" y="0" width="220" height="220" preserveAspectRatio="none"/>
      </pattern>
      <linearGradient id={shading} x1="0" x2=".12" y1="0" y2="1">
        <stop offset="0" stopColor="#fff8e9" stopOpacity=".17"/>
        <stop offset=".18" stopColor="#fff8e9" stopOpacity="0"/>
        <stop offset=".63" stopColor="#231b14" stopOpacity="0"/>
        <stop offset="1" stopColor="#231b14" stopOpacity=".20"/>
      </linearGradient>
      <linearGradient id={finish} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="var(--fb-highlight)" stopOpacity=".16"/>
        <stop offset=".55" stopColor="var(--fb-highlight)" stopOpacity="0"/>
        <stop offset="1" stopColor="var(--fb-seam)" stopOpacity=".09"/>
      </linearGradient>
      <filter id={edge} x="-10%" y="-18%" width="120%" height="136%" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation="3.4"/>
      </filter>
    </defs>
    {/* A separate layer for cloth thickness gives the cut fabric a visible edge. */}
    <path d={path} transform={round?'translate(0 1.1)':'translate(0 1.8)'} stroke="var(--fb-seam)" strokeWidth="2.5" fill="var(--fb-edge)" />
    <g clipPath={`url(#${main})`}>
      <path d={path} fill="var(--fb-color)"/>
      <path d={path} fill={`url(#${weave})`}/>
      {/* Diffuse seam shadows; not a high-gloss plastic edge. */}
      <path d={path} fill="none" stroke="var(--fb-seam)" strokeWidth="12" opacity=".38" filter={`url(#${edge})`}/>
      <path d={path} fill={`url(#${shading})`}/>
      <path d={path} fill={`url(#${finish})`}/>
      <path d={path} fill="none" stroke="var(--fb-highlight)" strokeWidth="1.9" opacity=".35" />
    </g>
    {/* Machine seam: darker indentation under shorter, rounded thread segments. */}
    <path d={stitch} fill="none" stroke="var(--fb-thread-shadow)" strokeWidth="2.3" opacity=".72" strokeDasharray="3.1 4.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" transform={round?'translate(0 .45)':'translate(0 .55)'}/>
    <path d={stitch} fill="none" stroke="var(--fb-thread)" strokeWidth="1.3" strokeDasharray="3.1 4.4" strokeLinecap="round" vectorEffect="non-scaling-stroke"/>
  </svg>;
}
export const FabricButton=forwardRef<HTMLButtonElement,FabricButtonProps>(function FabricButton(
  {children,cut='pillow',texture='cotton',color='terracotta',motif='none',trailing,size='medium',loading=false,fullWidth=false,className='',disabled,...rest},ref
) {
 const iconOnly=cut==='flower'||cut==='circle';
 return <button {...rest} ref={ref} type={rest.type??'button'} disabled={disabled||loading} aria-busy={loading||undefined}
   className={`fb-btn fb-btn--${cut} fb-btn--${texture} fb-btn--${color} fb-btn--${size} ${fullWidth?'fb-btn--full':''} ${className}`.trim()}>
   <TextileUnderlay cut={cut} texture={texture} color={color}/>
   <span className="fb-btn__body">
     {motif!=='none' && <span className="fb-btn__motif"><Embroidery design={motif} size={iconOnly? 27:33}/></span>}
     <span className="fb-btn__label">{loading?'Sewing…':children}</span>
     {trailing&&!iconOnly&&<span className="fb-btn__trailing" aria-hidden="true">{trailing}</span>}
   </span>
 </button>;
});
