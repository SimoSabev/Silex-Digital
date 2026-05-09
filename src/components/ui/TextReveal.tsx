"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  // Split into words so we can animate word by word or character by character
  // For Awwwards style, usually we split by word and mask the Y axis.
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "120%", opacity: 0, rotateZ: 5 },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotateZ: 0,
      transition: { type: "spring" as const, stiffness: 200, damping: 20 }
    },
  };

  return (
    <motion.span
      className={`flex flex-wrap justify-center ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-block mr-[0.25em]">
          <motion.span
            variants={wordVariants}
            className="inline-block origin-bottom-left"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
