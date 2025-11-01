// src/components/Hero.jsx
import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero3D = lazy(() => import('./Hero3D'));

function useOnScreen(ref, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setIntersecting(e.isIntersecting), { rootMargin });
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [ref, rootMargin]);
  return isIntersecting;
}

export default function Hero() {
  const mountRef = useRef(null);
  const visible = useOnScreen(mountRef, '200px'); // warm-load a bit before entering
  const [readyToShow3D, setReadyToShow3D] = useState(false);

  // Small delay to let text animate first (feels faster)
  useEffect(() => {
    if (!visible) return;
    const id = setTimeout(() => setReadyToShow3D(true), 400);
    return () => clearTimeout(id);
  }, [visible]);

  return (
    <div ref={mountRef} className="w-full h-screen bg-gradient-to-br from-black to-gray-900 text-white font-sans relative overflow-hidden">

      {/* Poster image (instant), hidden once 3D mounts */}
      {!readyToShow3D && (
        <img
          src="/images/hero-shoe-poster.jpg" // export a ~60–120KB WebP
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          loading="eager"
          fetchpriority="high"
        />
      )}

      {/* 3D Canvas (loads after visible) */}
      {readyToShow3D && (
        <Suspense fallback={null}>
          <Hero3D dropIn />
        </Suspense>
      )}

      {/* Text Content */}
      <div className="relative z-20 flex flex-col justify-center h-full p-8 md:p-16 max-w-2xl">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 text-white"
          style={{
            fontFamily: "'Poppins', sans-serif",
            textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(0,255,255,0.3)',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          Get Ready to
          <br />Step Into the Future
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-6"
          style={{
            fontFamily: "'Roboto', sans-serif",
            textShadow: '0 0 8px rgba(255,255,255,0.2)',
            opacity: 0.9
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          Discover our latest tech-driven sneakers designed for performance and style.
        </motion.p>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.35 }}
        >
          <Link to="/shop">
            <motion.button
              className="relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg overflow-hidden hover:scale-105 transition-transform"
              style={{ boxShadow: '0 0 20px rgba(255, 0, 255, 0.5)' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
            >
              <span className="relative z-10">Shop Now</span>
              <span className="absolute inset-0 bg-white/10 animate-pulse" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
