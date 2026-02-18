"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Stat {
  value: string;
  label: string;
}

interface StatCardsProps {
  stats: Stat[];
  theme?: "dark" | "light";
}

export function StatCards({ stats, theme = "dark" }: StatCardsProps) {
  const isDark = theme === "dark";
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${
            isDark 
              ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-supplied-amber/20" 
              : "bg-supplied-ink/5 border-supplied-ink/10 hover:bg-supplied-ink/10 hover:border-supplied-amber/20"
          } border rounded-[20px] p-6 text-center backdrop-blur-md transition-all duration-300 relative overflow-hidden group`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={stat.value + stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-[32px] font-extrabold bg-gradient-to-br from-supplied-amber-bright to-supplied-amber bg-clip-text text-transparent leading-none mb-1.5">
                {stat.value}
              </div>
              <div className={`${
                isDark 
                  ? "text-white/40 group-hover:text-white/60" 
                  : "text-supplied-ink/40 group-hover:text-supplied-ink/60"
              } text-[10px] uppercase tracking-[1.2px] font-medium transition-colors`}>
                {stat.label}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
