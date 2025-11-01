// src/pages/Shop.jsx
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  useDeferredValue,
} from 'react';
import { motion } from 'framer-motion';

import Navbar from '../components/Navbar';
import ShopMain from '../components/ShopMain';
import ShoeCard from '../components/ShoeCard';
import dummyShoes from '../data/dummyShoes';

export default function Shoes() {
  const [shoes, setShoes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState(null);
  const productRef = useRef();

  useEffect(() => {
    let mounted = true;
    const fetchShoes = async () => {
      await new Promise((res) => setTimeout(res, 300));
      if (mounted) setShoes(dummyShoes);
    };
    fetchShoes();
    return () => { mounted = false; };
  }, []);

  const filteredShoes = useMemo(() => {
    const list =
      selectedCategory === 'All'
        ? shoes
        : shoes.filter(
            (s) => s.category?.toLowerCase() === selectedCategory.toLowerCase()
          );

    if (sortOrder === 'low') return [...list].sort((a, b) => a.price - b.price);
    if (sortOrder === 'high') return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [shoes, selectedCategory, sortOrder]);

  // Smooth typing/clicks while long list re-renders
  const deferredShoes = useDeferredValue(filteredShoes);

  // Stable callbacks to avoid child rerenders
  const handleCategory = useCallback((v) => setSelectedCategory(v), []);
  const handleSort = useCallback((v) => setSortOrder(v), []);

  return (
    <>
      <Navbar />

      <ShopMain
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategory}
        sortOrder={sortOrder}
        setSortOrder={handleSort}
        productRef={productRef}
      />

      <section
        ref={productRef}
        className="min-h-screen bg-black text-white py-14 px-4 sm:px-6"
      >
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold text-center mb-10"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          Explore the Collection
        </motion.h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {deferredShoes.map((shoe) => (
            <ShoeCard key={shoe.id} shoe={shoe} />
          ))}
        </div>
      </section>
    </>
  );
}
