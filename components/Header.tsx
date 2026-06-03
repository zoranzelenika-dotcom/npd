import React, { useState } from 'react';
import { Search, Bell, Settings } from 'lucide-react';
export function Header({ onSignOut }) { const [open, setOpen] = useState(false); return <header className="topbar"><b>Food Innovate</b><div className="actions"><Search size={18} /><Bell size={18} /><Settings size={18} /><div className="avatarWrap"><button className="avatar" onClick={() => setOpen(!open)}>SC</button>{open && <div className="menu"><b>Sarah Chen</b><small>Food Innovate workspace</small><button onClick={onSignOut}>Sign out</button></div>}</div></div></header>; }
