"use client";

import React, { useRef, useState, useCallback } from "react";

interface TikTokPlayerProps {
  src: string;
  className?: string;
}

export function TikTokPlayer({ src, className = "" }: TikTokPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  }, []);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <div className={`flex justify-center ${className}`}>
      {/* iPhone frame */}
      <div className="relative" style={{ width: 340 }}>
        {/* Device bezel */}
        <div
          className="relative rounded-[52px] bg-[#1a1a1a] p-[12px] shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.08)_inset]"
        >
          {/* Side button accents */}
          <div className="absolute -right-[2px] top-[120px] w-[3px] h-[38px] bg-[#2a2a2a] rounded-r-sm" />
          <div className="absolute -left-[2px] top-[96px] w-[3px] h-[28px] bg-[#2a2a2a] rounded-l-sm" />
          <div className="absolute -left-[2px] top-[144px] w-[3px] h-[48px] bg-[#2a2a2a] rounded-l-sm" />
          <div className="absolute -left-[2px] top-[204px] w-[3px] h-[48px] bg-[#2a2a2a] rounded-l-sm" />

          {/* Screen area */}
          <div className="relative rounded-[42px] overflow-hidden bg-black" style={{ aspectRatio: "9/19.5" }}>
            {/* Dynamic Island */}
            <div className="absolute top-[12px] left-1/2 -translate-x-1/2 z-20 w-[110px] h-[34px] bg-black rounded-full" />

            {/* Video */}
            <video
              ref={videoRef}
              src={src}
              autoPlay
              loop
              muted
              playsInline
              onClick={togglePlay}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            />

            {/* Play/pause overlay */}
            {!playing && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="ml-1">
                    <path d="M8 5v14l11-7L8 5z" fill="white" />
                  </svg>
                </div>
              </button>
            )}

            {/* Mute/unmute button */}
            <button
              onClick={toggleMute}
              className="absolute bottom-5 right-3 z-10 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center transition-all hover:bg-black/70 hover:scale-105 cursor-pointer"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M19.07 4.93a10 10 0 010 14.14" opacity="0.4" />
                  <path d="M15.54 8.46a5 5 0 010 7.07" />
                </svg>
              )}
            </button>

            {/* Bottom home indicator */}
            <div className="absolute bottom-[7px] left-1/2 -translate-x-1/2 z-20 w-[120px] h-[4px] bg-white/30 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
