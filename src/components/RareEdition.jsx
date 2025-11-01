// src/components/RareEdition.jsx
import React from 'react';
import { motion } from 'framer-motion';
import nikeban from './RareEdition.png'; // ✅ file is in the same folder

export default function RareEditionBanner() {
  const fallback = './nikeban.jpg'; // or any placeholder in /public

  return (
    <section className="relative w-full h-[60vh] md:h-[50vh] overflow-hidden">
      {/* Background Image */}
      <img
        src={nikeban}
        onError={(e) => { e.currentTarget.src = fallback; }}
        alt="banner  Shoes"
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />

      {/* Animated Heading Overlay */}
      {/* ... */}
    </section>
  );
}
