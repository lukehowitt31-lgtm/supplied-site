"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Stat {
  value: string;
  label: string;
}

interface StatCardsProps {
  stats: Stat[];
}

export function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/5 border border-white/10 rounded-[20px] p-6 text-center backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-supplied-amber/20 relative overflow-hidden group"
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
              <div className="text-[10px] text-white/40 uppercase tracking-[1.2px] font-medium group-hover:text-white/60 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
