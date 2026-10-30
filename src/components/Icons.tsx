import type { ReactNode, SVGProps } from 'react';

export type IconName = 'arrow' | 'bag' | 'heart' | 'check' | 'plus' | 'minus' | 'search' | 'close' | 'spark' | 'sun' | 'moon' | 'chevron' | 'thread' | 'menu' | 'home' | 'user' | 'grid' | 'filter' | 'sort' | 'back' | 'up' | 'left' | 'right' | 'gift' | 'tag' | 'truck' | 'package' | 'pin' | 'mail' | 'chat' | 'info' | 'help' | 'warning' | 'trash' | 'edit' | 'copy' | 'share' | 'refresh' | 'lock' | 'leaf' | 'star' | 'clock' | 'calendar' | 'credit-card' | 'receipt';
export type IconProps = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export function Icon({ name, size = 18, ...props }: IconProps) {
  const shared = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const, ...props };
  const shapes: Record<IconName, ReactNode> = {
    'menu': <path d="M4 6h16M4 12h16M4 18h16"/>,
    'home': <path d="m3 11 9-8 9 8M5 10v11h5v-7h4v7h5V10"/>,
    'user': <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M4 21v-2a8 8 0 0 1 16 0v2"/>,
    'grid': <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/>,
    'filter': <path d="M3 6h18M6 12h12M9 18h6"/>,
    'sort': <path d="M7 3v18m-4-4 4 4 4-4M14 5h7M14 10h5M14 15h3"/>,
    'back': <path d="M20 12H4m6-6-6 6 6 6"/>,
    'up': <path d="m6 15 6-6 6 6"/>,
    'left': <path d="m15 5-7 7 7 7"/>,
    'right': <path d="m9 5 7 7-7 7"/>,
    'gift': <path d="M3 8h18v5H3zM5 13v8h14v-8M12 8v13M12 8C2 8 5 0 9 3l3 5c10 0 7-8 3-5z"/>,
    'tag': <path d="M3 3h8l10 10-8 8L3 11zM7 7h.1"/>,
    'truck': <path d="M2 5h12v12H2zM14 10h4l4 5v2h-8M8 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0M20 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>,
    'package': <path d="m3 7 9-5 9 5v10l-9 5-9-5zM3 7l9 5 9-5M12 12v10M7 4.5l10 5"/>,
    'pin': <path d="M19 9c0 5-7 12-7 12S5 14 5 9a7 7 0 1 1 14 0M14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>,
    'mail': <path d="M3 5h18v14H3zM3 5l9 8 9-8"/>,
    'chat': <path d="M3 3h18v14H9l-6 4zM7 8h10M7 12h6"/>,
    'info': <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M12 11v6M12 7h.1"/>,
    'help': <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M9 8a3 3 0 1 1 5 3l-2 2M12 17h.1"/>,
    'warning': <path d="m12 3 10 18H2zM12 9v5M12 17h.1"/>,
    'trash': <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>,
    'edit': <path d="m3 16 13-13 5 5L8 21H3zM13 6l5 5"/>,
    'copy': <path d="M9 9h12v12H9zM15 9V3H3v12h6"/>,
    'share': <path d="M12 15V2m-5 5 5-5 5 5M5 12H3v9h18v-9h-2"/>,
    'refresh': <path d="M20 10a8 8 0 0 0-14-5L3 8m0-5v5h5M4 14a8 8 0 0 0 14 5l3-3m0 5v-5h-5"/>,
    'lock': <path d="M5 10h14v11H5zM8 10V6a4 4 0 0 1 8 0v4M12 14v3"/>,
    'leaf': <path d="M20 3C4 1 1 12 7 18S23 15 20 3M3 22 16 8"/>,
    'star': <path d="m12 2 3 6 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1z"/>,
    'clock': <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M12 6v6l4 3"/>,
    'calendar': <path d="M3 5h18v16H3zM7 2v6M17 2v6M3 10h18M7 14h2M14 14h2M7 18h2"/>,
    'credit-card': <path d="M2 5h20v14H2zM2 10h20M6 15h4"/>,
    'receipt': <path d="M5 2l3 2 4-2 4 2 3-2v20l-3-2-4 2-4-2-3 2zM8 8h8M8 12h8M8 16h4"/>,
    arrow: <><path d="M4 12h15M13 6l6 6-6 6" /></>,
    bag: <><path d="M4.6 8.5h14.8l1.1 12H3.5l1.1-12Z"/><path d="M8.2 9V6.2a3.8 3.8 0 0 1 7.6 0V9"/></>,
    heart: <path d="M20.2 8.7c0 4.1-8.2 10.4-8.2 10.4S3.8 12.8 3.8 8.7a4.4 4.4 0 0 1 8.2-2.2 4.4 4.4 0 0 1 8.2 2.2Z" />,
    check: <path d="M5 12.1l4.4 4.2L19 6.9" />,
    plus: <path d="M12 4v16M4 12h16" />,
    minus: <path d="M4 12h16" />,
    search: <><circle cx="10.8" cy="10.8" r="6.6"/><path d="m16 16 5 5"/></>,
    close: <path d="m5 5 14 14M19 5 5 19" />,
    spark: <><path d="M12 2.5 13.8 10 21.5 12 13.8 14 12 21.5 10.2 14 2.5 12l7.7-2Z" /></>,
    sun: <><circle cx="12" cy="12" r="3.7"/><path d="M12 2v2.3M12 19.7V22M2 12h2.3M19.7 12H22M4.9 4.9l1.6 1.6m11 11 1.6 1.6M19.1 4.9l-1.6 1.6m-11 11-1.6 1.6"/></>,
    moon: <path d="M20.3 14.4A8.7 8.7 0 0 1 9.6 3.7 8.8 8.8 0 1 0 20.3 14.4Z" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    thread: <><circle cx="12" cy="12" r="7"/><path d="M9 6.2c6 5 6 6.5 0 11.5M15 6.2c-6 5-6 6.5 0 11.5M3 21l4-4"/></>,
  };
  return <svg {...shared} className={`embroidered-icon ${props.className||''}`}><g stroke="#302719" strokeWidth="3" opacity=".18" transform="translate(0 .45)">{shapes[name]}</g><g stroke="currentColor" strokeWidth="2.5">{shapes[name]}</g><g stroke="#fff4d9" strokeWidth=".8" strokeDasharray=".65 1.25" opacity=".7" transform="translate(-.2 -.2)">{shapes[name]}</g><g stroke="currentColor" strokeWidth=".4" opacity=".6">{shapes[name]}</g></svg>;
}
