import React from 'react';
import { nav } from '../data';
export function Sidebar({ screen, setScreen }) { return <aside className="sidebar">{nav.map(([id, label, Icon]) => <button key={id} className={screen === id ? 'active' : ''} onClick={() => setScreen(id)}><Icon size={18} /><span>{label}</span></button>)}</aside>; }
