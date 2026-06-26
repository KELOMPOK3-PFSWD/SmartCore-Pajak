"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);

  // Simulasi progres loading agar bar terlihat bergerak nyata
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      
      {/* Dynamic Glow Background */}
      <div className="absolute h-96 w-96 animate-pulse rounded-full bg-cyan-500/10 blur-[120px]"></div>
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]"></div>

      <div className="relative text-center">
        
        {/* Advanced Spinner Container */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute h-full w-full animate-spin rounded-full border-[3px] border-slate-800 border-t-cyan-500 duration-[1.5s]"></div>
          
          {/* Inner Pulsing Core */}
          <div className="h-12 w-12 animate-pulse rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
          </div>
        </div>

        {/* Text Section with Slide Up Animation */}
        <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
          <h1 className="text-4xl font-black tracking-tighter text-white lg:text-5xl">
            Smart Core
            <span className="ml-2 text-cyan-400 shadow-cyan-500/20 drop-shadow-sm">
              Pajak
            </span>
          </h1>
          
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-500 animate-ping"></span>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
              Initializing Secure Environment
            </p>
          </div>
        </div>

        {/* Precision Loading Bar */}
        <div className="mx-auto mt-12 w-72">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-left">System Core</span>
            <span className="text-[10px] font-black text-cyan-500 tabular-nums">{progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/50 p-[2px] border border-white/5">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(34,211,238,0.4)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

      </div>

      {/* Security Overlay Text - Subtle Deco */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20">
        <p className="text-[10px] font-bold tracking-[0.5em] text-slate-500 uppercase">
          Department of Finance Digital Infrastructure
        </p>
      </div>
    </div>
  );
}