import React, { useState, memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

function ShopMain({
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder,
  productRef,
}) {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const categories = useMemo(() => ['All', 'Men', 'Women', 'Unisex', 'Sports'], []);
  const suggestions = useMemo(
    () => ['Men', 'Women', 'Unisex', 'Sports', 'Sneakers', 'Running', 'Casual'],
    []
  );

  const handleSort = (order) => {
    setSortOrder(order);
    setShowFilterMenu(false);
  };

  const handleReset = () => {
    setSelectedCategory('All');
    setSortOrder(null);
    setShowFilterMenu(false);
  };

  const handleSearchChange = (e) => {
    const v = e.target.value;
    setSearchQuery(v);
    setShowSuggestions(v.length > 0);
  };

  const triggerSearch = (query) => {
    const match = suggestions.find((sug) => sug.toLowerCase() === query.toLowerCase());
    if (match) setSelectedCategory(match);
    setShowSuggestions(false);
    setSearchQuery(match || query);
    setTimeout(() => productRef?.current?.scrollIntoView({ behavior: 'smooth' }), 60);
  };

  const handleSearchSubmit = () => triggerSearch(searchQuery);
  const handleKeyPress = (e) => e.key === 'Enter' && handleSearchSubmit();

  return (
    <div className="relative bg-black text-white">
      {/* Sticky controls */}
      <div className="sticky top-[64px] z-20 bg-zinc-950/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm transition shadow-sm
                    ${active
                      ? 'bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white'
                      : 'bg-white/10 hover:bg-white/20'
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Filters */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu((p) => !p)}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition text-sm"
            >
              Filters
            </button>
            {showFilterMenu && (
              <div className="absolute top-12 right-0 bg-white text-black shadow-xl rounded-md w-52 z-30">
                <div className="p-3 border-b text-sm font-bold text-gray-800">Sort by Price</div>
                <button onClick={() => handleSort('low')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Low to High
                </button>
                <button onClick={() => handleSort('high')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  High to Low
                </button>
                <button
                  onClick={handleReset}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative min-h-[70vh] sm:min-h-[78vh] flex flex-col items-center justify-center text-center overflow-hidden pt-24">
        <img
          src="/images/ShopBg.jpg"
          alt="Shoe Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-25 z-0"
          loading="lazy"
          decoding="async"
          draggable={false}
        />

        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 max-w-5xl">
          {/* Search */}
          <div className="relative w-[90%] sm:w-[70%] max-w-3xl z-20 mb-2">
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyPress}
              placeholder="Search for shoes..."
              className="w-full py-3.5 px-6 text-lg sm:text-xl rounded-full text-black border border-gray-200 
              shadow-[0_10px_20px_rgba(0,0,0,0.35),inset_0_2px_6px_rgba(255,255,255,0.5)]
              focus:outline-none focus:ring-4 focus:ring-fuchsia-400
              placeholder:text-gray-700 placeholder:opacity-90 bg-white pr-14"
            />
            <button
              onClick={handleSearchSubmit}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-fuchsia-600 hover:text-fuchsia-800"
            >
              <FaSearch />
            </button>

            {showSuggestions && (
              <ul className="absolute left-0 right-0 top-[100%] mt-2 bg-white text-black rounded-md shadow-lg z-50">
                {suggestions
                  .filter((sug) => sug.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((sug) => (
                    <li
                      key={sug}
                      onClick={() => triggerSearch(sug)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {sug}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Title */}
          <div className="relative flex flex-wrap justify-center items-end gap-6 min-h-[120px] z-10 select-none">
            {['Kick', 'Your', 'Fits'].map((word, wordIndex) => (
              <div key={wordIndex} className="flex gap-[2px] items-end">
                {word.split('').map((char, i) => {
                  const isThread =
                    (wordIndex === 0 && i === 0) ||
                    (wordIndex === 2 && i === word.length - 1);
                  const globalIndex = wordIndex * 10 + i;
                  const color = globalIndex % 2 === 0 ? 'text-red-500' : 'text-white';

                  return (
                    <motion.div
                      key={i}
                      className="relative flex flex-col items-center justify-end"
                      initial={{ y: -60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: globalIndex * 0.045, type: 'spring', stiffness: 200 }}
                    >
                      {isThread && (
                        <div className="absolute -top-6 flex flex-col items-center">
                          <div className="w-[2px] h-6 bg-red-500 mb-1" style={{ boxShadow: '0 0 6px rgba(255, 0, 0, 0.6)' }} />
                          <div className="w-2 h-2 rounded-full bg-red-600" style={{ boxShadow: '0 0 10px rgba(255, 0, 0, 0.8)' }} />
                        </div>
                      )}
                      <span
                        className={`text-[44px] sm:text-[64px] font-extrabold ${color}`}
                        style={{
                          fontFamily: "'Luckiest Guy', cursive",
                          textShadow: '2px 2px 0 rgba(0,0,0,0.8)',
                        }}
                      >
                        {char}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Explore Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => productRef?.current?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-6"
          >
            <div className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-fuchsia-500 rounded-full text-black font-extrabold shadow-lg transition cursor-pointer">
              Explore More
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default memo(ShopMain);
