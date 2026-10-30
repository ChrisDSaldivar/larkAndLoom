import WebGLClothLab from './WebGLClothLab';
import MaterialLab from './MaterialLab';
import {IconSampler,MotionStudio,BasketDrawer} from './NotionStudio';
import ClothBrand from './ClothBrand';
import SewingBox from './SewingBox';
import { useState } from 'react';
import { FabricButton, FabricLabel, Embroidery, FabricSwatch, QuantityStepper, StitchField, ThreadToggle, Icon } from './components';
import type { FabricCut, FabricTexture, FabricColor, EmbroideryDesign } from './components';
import './styles/atelier.css';

// Retained studies: switch on to restore both sections without rebuilding them.
const SHOW_MATERIAL_STUDIES = false;

const samples: {label:string;cut:FabricCut;texture:FabricTexture;color:FabricColor;motif:EmbroideryDesign;caption:string}[] = [
  {label:'Add to basket',cut:'pillow',texture:'cotton',color:'terracotta',motif:'daisy',caption:'Padded cotton / little daisy'},
  {label:'Shop the collection',cut:'pillow',texture:'gingham',color:'sage',motif:'none',caption:'Gingham / woven check'},
  {label:'A little gift',cut:'scallop',texture:'linen',color:'cream',motif:'sprig',caption:'Scalloped / linen edge'},
  {label:'Browse fabrics',cut:'pinked',texture:'cotton',color:'rose',motif:'none',caption:'Pinked / rotary-cut edge'},
  {label:'Read our story',cut:'ticket',texture:'linen',color:'mustard',motif:'strawberry',caption:'Ticket / clipped sides'},
  {label:'Save',cut:'pillow',texture:'quilt',color:'denim',motif:'heart',caption:'Quilted / tiny heart'},
];
const colors: {name:FabricColor;hex:string}[]=[{name:'terracotta',hex:'#bb5b43'},{name:'sage',hex:'#839270'},{name:'cream',hex:'#ece0c9'},{name:'rose',hex:'#db9fa3'},{name:'denim',hex:'#6e8ea7'},{name:'mustard',hex:'#d9a54b'}];
const cuts:FabricCut[]=['pillow','scallop','pinked','ticket','circle','flower'];
const motifs:EmbroideryDesign[]=['daisy','sprig','strawberry','heart','none'];
const fabricImages=[{name:'Butterflies',pattern:'butterfly' as const,src:'./images/butterfly.webp'},{name:'Green gingham',pattern:'gingham' as const,src:'./images/green-gingham.webp'},{name:'Strawberries',pattern:'rose' as const,src:'./images/strawberry.webp'},{name:'Denim floral',pattern:'denim' as const,src:'./images/denim.webp'},{name:'Sunshine',pattern:'butter' as const,src:'./images/yellow-gingham.webp'}];
function Brand(){return <ClothBrand/>}
function SectionTitle({n,title,sub}:{n:string;title:string;sub:string}){return <div className="at-section-heading"><div><span className="at-overline">{n} / THE NOTIONS DRAWER</span><h2>{title}</h2><p>{sub}</p></div><span className="at-flower" aria-hidden="true"><Embroidery design="sprig" size={54}/></span></div>}
export default function App(){
 const [cut,setCut]=useState<FabricCut>('pillow');
 const [texture,setTexture]=useState<FabricTexture>('cotton');
 const [color,setColor]=useState<FabricColor>('terracotta');
 const [motif,setMotif]=useState<EmbroideryDesign>('daisy');
 const [count,setCount]=useState(1);
 const [basket,setBasket]=useState(0);
 const [cartOpen,setCartOpen]=useState(false);
 const [liked,setLiked]=useState(false);
 const [gift,setGift]=useState(false);
 const [email,setEmail]=useState('');
 const [fabric,setFabric]=useState(0);
 const [message,setMessage]=useState('');
 const toast=(s:string)=>setMessage(s);
 const add=()=>{setBasket(n=>Math.min(99,n+count));toast(`${count} ${count===1?'item':'items'} added to the sample basket`)};
 return <div className="at-app">
  <header className="at-top"><div className="at-wrapper at-top__inside"><Brand/><span className="at-top__small">TEXTILE COMPONENT ATELIER <span className="at-top__star">✳</span> EDITION 03</span><div className="at-top__links"><a href="#components">Notions</a><a href="#sewing-box">Elements</a><a href="#icons">Icons</a><a href="#motion">Motion</a><button onClick={()=>setCartOpen(true)} aria-label={`${basket} items in sample basket`}><Icon name="bag" size={19}/><i>{basket}</i></button></div></div></header>
  <main className="at-wrapper">
   <section className="at-intro"><div className="at-intro__copy"><span className="at-overline">✳ &nbsp; LARK & LOOM / THE COMPONENT STUDY</span><h1>A softer side<br/><em>of interface design.</em></h1><p>A hands-on playground for the Lark & Loom component collection. Explore woven textures, shaped edges, and embroidered details—then make something of your own.</p></div>
    <div className="at-sample-stage"><div className="at-stage-head"><span>THE INTERACTIVE SPECIMEN</span><span>01 / TOUCH & FEEL</span></div><span className="at-pencil at-pencil--a">a little<br/>raised seam <span>↘</span></span><div className="at-stage-main"><FabricButton cut={cut} texture={texture} color={color} motif={motif} size="large" onClick={add} trailing={<span>↗</span>}>{cut==='circle'||cut==='flower'?<Embroidery design="heart" size={32}/>: 'Add to basket'}</FabricButton></div><span className="at-pencil at-pencil--b">tiny thread<br/>details <span>↖</span></span><div className="at-stage-foot">CUT: {cut.toUpperCase()} <span>FABRIC: {texture.toUpperCase()}</span> <span>THREAD: {motif.toUpperCase()}</span></div></div>
   </section>
   {SHOW_MATERIAL_STUDIES && <><WebGLClothLab/><MaterialLab/></>}<section id="components" className="at-section"><SectionTitle n="01" title="Buttons with a little personality." sub="Woven surfaces and shaped seams instead of glossy gradients. Every specimen below is a working button."/>
   <div className="at-button-collection">{samples.map((s,i)=><div className="at-sample" key={s.label}><div className="at-sample__meta"><span>{String(i+1).padStart(2,'0')}</span><span>{i===0?'SIGNATURE':i===1?'SECONDARY':'SPECIAL DETAIL'}</span></div><div className="at-sample__stage"><FabricButton cut={s.cut} texture={s.texture} color={s.color} motif={s.motif} onClick={()=>{setCut(s.cut);setTexture(s.texture);setColor(s.color);setMotif(s.motif);toast(`Selected ${s.caption}`)}}>{s.label}</FabricButton></div><p>{s.caption}</p></div>)}</div>
   <div className="at-state-strip"><div><b>INTERACTION STATES</b><small>Try hovering, pressing, tabbing, or disabling.</small></div><FabricButton cut="pillow" color="terracotta" motif="daisy" size="small" onClick={()=>toast('Pressed!')}>Default / press me</FabricButton><FabricButton cut="pillow" color="terracotta" motif="daisy" size="small" disabled>Disabled</FabricButton><FabricButton cut="scallop" texture="linen" color="cream" size="small" onClick={()=>toast('A small stitched selection')}>Selected ✓</FabricButton></div>
   </section>
   <section id="materials" className="at-section"><SectionTitle n="02" title="Cuts, curves, and tiny stitches." sub="Silhouettes should feel like individual scraps from a sewing table—not the same pill button everywhere."/>
    <div className="at-lower-grid">
     <article className="at-panel"><div className="at-panel-heading"><span>01 / CUT THE FABRIC</span><span>CHOOSE A SHAPE</span></div><h3>Not everything needs corners.</h3><div className="at-shapes">
      {cuts.map(shape=><div className={`at-shape-choice ${cut===shape?'is-active':''}`} key={shape}><span className="at-shape-figure"><FabricButton cut={shape} texture={texture} color={color} motif={shape==='circle'||shape==='flower'?'heart':'none'} onClick={()=>setCut(shape)} aria-label={`Choose ${shape} edge`} aria-pressed={cut===shape} size="small">{shape==='circle'||shape==='flower'?<Embroidery design="heart" size={30}/>: 'hello!'}</FabricButton></span><small>{shape}</small></div>)}
     </div><p className="at-note">Scallops, pinking-shear zigzags, notched labels and flower-like rosettes.</p></article>
     <article className="at-panel"><div className="at-panel-heading"><span>02 / PICK THE THREAD</span><span>EMBROIDERED MOTIFS</span></div><h3>A tiny stitch goes a long way.</h3><div className="at-motifs">{motifs.map(m=><button aria-label={`Select ${m} embroidery`} aria-pressed={motif===m} className={`at-motif-choice ${motif===m?'is-active':''}`} onClick={()=>setMotif(m)} key={m}><span className="at-motif-patch">{m==='none'?<span className="at-no-motif">—</span>:<Embroidery design={m} size={48}/>}</span><small>{m}</small></button>)}</div><p className="at-note">Daisies, leaves, strawberries and hearts drawn as embroidery—not sticker icons.</p></article>
     <article className="at-panel"><div className="at-panel-heading"><span>03 / CHOOSE THE CLOTH</span><span>COLOR & TEXTURE</span></div><h3>A fabric for every feeling.</h3><div className="at-textures">{(['cotton','gingham','linen','quilt','denim'] as FabricTexture[]).map(t=><button key={t} className={`at-texture-choice ${texture===t?'is-active':''}`} aria-pressed={texture===t} onClick={()=>setTexture(t)}><span className={`at-texture-sample at-texture-sample--${t}`}></span><small>{t}</small></button>)}</div><div className="at-colors">{colors.map(c=><button type="button" key={c.name} title={c.name} aria-label={`${c.name} fabric color`} aria-pressed={color===c.name} onClick={()=>setColor(c.name)} className={color===c.name?'is-active':''}><span style={{background:c.hex}}/></button>)}</div></article>
    </div>
   </section>
   <section className="at-section"><SectionTitle n="03" title="The rest of the sewing box." sub="Useful storefront controls with just enough hand-finished character, never at the expense of clarity."/>
    <div className="at-utilities-grid">
     <article className="at-panel at-panel--labels"><div className="at-panel-heading"><span>THE LITTLE LABELS</span><span>NON-INTERACTIVE</span></div><h3>Sewn-in details.</h3><div className="at-tags"><FabricLabel color="rose" edge="scallop" motif="heart">New</FabricLabel><FabricLabel color="sage" edge="pinked">Bestseller</FabricLabel><FabricLabel color="cream" edge="folded" motif="strawberry">Handmade</FabricLabel><FabricLabel color="denim" edge="scallop">Small batch</FabricLabel><FabricLabel color="mustard" edge="plain">One of a kind</FabricLabel></div></article>
     <article className="at-panel"><div className="at-panel-heading"><span>BUTTON BOX</span><span>ICON CONTROLS</span></div><h3>Button-sized keepsakes.</h3><div className="at-icon-row"><FabricButton cut="circle" texture="linen" color="cream" aria-label="Favorite" aria-pressed={liked} onClick={()=>setLiked(!liked)}><Embroidery design="heart" size={34} style={{opacity:liked?1:.5}}/></FabricButton><FabricButton cut="flower" texture="cotton" color="rose" aria-label="Search" onClick={()=>toast('Search clicked')}><Icon name="search" size={21}/></FabricButton><FabricButton cut="circle" texture="cotton" color="sage" aria-label="Shopping basket" onClick={()=>setCartOpen(true)}><Icon name="bag" size={21}/></FabricButton><FabricButton cut="flower" texture="cotton" color="mustard" aria-label="Next" onClick={()=>toast('Next clicked')}>→</FabricButton></div></article>
     <article className="at-panel"><div className="at-panel-heading"><span>FORM DRAWER</span><span>CALM & READABLE</span></div><h3>Everyday controls.</h3><div className="at-input-row"><StitchField label="An email, please" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="hello@example.com"/><FabricButton size="small" cut="pillow" color="sage" onClick={()=>toast(email.includes('@')?'Demo form only; nothing was sent':'Please enter an email address')}>Join</FabricButton></div><div className="at-inline-controls"><QuantityStepper value={count} onChange={setCount} min={1} max={10}/><ThreadToggle label="Gift wrap" checked={gift} onChange={setGift}/></div></article>
    </div>
   </section>
   <section className="at-section at-final"><div className="at-final__heading"><span className="at-overline">04 / IN CONTEXT</span><h2>Then let the <em>product</em> shine.</h2><p>The fabric treatment belongs in the small shopping moments. A real photograph takes center stage.</p></div><div className="at-product"><div className="at-product__image"><img src={fabricImages[fabric].src} alt={`Actual Lark & Loom fabric goods: ${fabricImages[fabric].name}`}/><span>PHOTOGRAPH FROM THE MARKET BOOTH</span></div><div className="at-product__copy"><FabricLabel edge="scallop" color="cream" motif="daisy">Made with care</FabricLabel><h3>{fabricImages[fabric].name}</h3><p>Colorful cotton, careful seams, and a little extra personality. An example of how tactile controls can frame the real item without overwhelming it.</p><span className="at-overline">EXPLORE FABRICS</span><div className="at-product__swatches">{fabricImages.map((f,i)=><FabricSwatch key={f.name} pattern={f.pattern} selected={fabric===i} label={f.name} showLabel={false} onClick={()=>setFabric(i)}/>)}</div><div className="at-product__buy"><FabricButton color="terracotta" motif="daisy" cut="pillow" fullWidth size="large" onClick={add}>Add to basket ↗</FabricButton><span>Demo product · no checkout</span></div></div></div></section>
  <SewingBox basket={basket} onOpenCart={()=>setCartOpen(true)} onAdd={n=>setBasket(b=>Math.min(99,b+n))}/><IconSampler/><MotionStudio onOpenCart={()=>setCartOpen(true)} onAdd={()=>setBasket(n=>Math.min(99,n+1))}/></main><BasketDrawer open={cartOpen} onClose={()=>setCartOpen(false)} count={basket} onCount={setBasket}/>
  <footer className="at-wrapper at-footer"><Brand/><span>THE TEXTILE ATELIER — A WORKING REACT COMPONENT STUDY</span><span>✳ &nbsp;MADE FOR LITTLE THINGS</span></footer>
  {message&&<div className="at-toast" role="status">{message}<button onClick={()=>setMessage('')} aria-label="Dismiss notification">×</button></div>}
 </div>;
}
