"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, className = "", direction = "up", delay = 0, immediate = false }: { children: ReactNode; className?: string; direction?: "up" | "left" | "right" | "none"; delay?: number; immediate?: boolean }) {
  const reduced = useReducedMotion();
  const offset = direction === "up" ? { y: 28 } : direction === "left" ? { x: -34 } : direction === "right" ? { x: 34 } : {};
  const visible = { opacity: 1, x: 0, y: 0 };
  return <motion.div className={className} initial={reduced || immediate ? false : { opacity: 0, ...offset }} animate={immediate ? visible : undefined} whileInView={immediate ? undefined : visible} viewport={{ once: true, amount: .18 }} transition={{ type: "spring", stiffness: 86, damping: 20, delay }}>{children}</motion.div>;
}

export function Stagger({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: .12 }} variants={{ hidden: {}, show: { transition: { staggerChildren: .09 } } }}>{children}</motion.div>;
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} variants={reduced ? undefined : { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 95, damping: 18 } } }}>{children}</motion.div>;
}

export function ProcessReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true, amount: .25 }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
