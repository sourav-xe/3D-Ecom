import React, { useEffect, useMemo, useRef, useState, useDeferredValue } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { motion } from "framer-motion";
import { ShoppingCart, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Shop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState(null);
  const [search, setSearch] = useState("");
  const productRef = useRef(null);

  // Fallback placeholder if image fails
  const fallbackImage =
    "https://via.placeholder.com/400x300.png?text=Image+Not+Available";

  // Fast CDN Images (Unsplash)
  const SHOES = useMemo(
    () => [
      {
        id: 1,
        name: "Nike Air Zoom Pegasus",
        price: 120,
        stock: 8,
        category: "Men",
        description: "Everyday responsive trainer for road running.",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=70",
      },
      {
        id: 2,
        name: "Adidas Ultraboost 22",
        price: 180,
        stock: 6,
        category: "Unisex",
        description: "Boost cushioning with knit upper comfort.",
        image:
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
      },
      {
        id: 3,
        name: "New Balance 327",
        price: 110,
        stock: 10,
        category: "Women",
        description: "Retro silhouette with modern comfort.",
        image:
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=70",
      },
      {
        id: 4,
        name: "Puma RS-X",
        price: 99,
        stock: 12,
        category: "Men",
        description: "Bulky dad-sneaker vibes with soft ride.",
        image:
          "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=70",
      },
      {
        id: 5,
        name: "Converse Chuck 70",
        price: 85,
        stock: 15,
        category: "Unisex",
        description: "Canvas classic with upgraded build.",
        image:
          "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=1200&q=70",
      },
      {
        id: 6,
        name: "ASICS Gel-Kayano",
        price: 160,
        stock: 5,
        category: "Sports",
        description: "Stability running shoe with gel cushioning.",
        image:
          "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=70",
      },
      {
        id: 7,
        name: "Jordan 1 Retro High",
        price: 200,
        stock: 3,
        category: "Men",
        description: "Iconic high-top with premium leather.",
        image:
          "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1025",
      },
      {
        id: 8,
        name: "On Cloud X",
        price: 140,
        stock: 7,
        category: "Women",
        description: "Lightweight cross-training comfort.",
        image:
          "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=1200&q=70",
      },
      {
        id: 9,
        name: "Reebok Nano X3",
        price: 150,
        stock: 9,
        category: "Unisex",
        description: "Versatile cross-training shoe.",
        image:
          "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
      },
      {
        id: 10,
        name: "Under Armour HOVR Phantom",
        price: 130,
        stock: 11,
        category: "Sports",
        description: "HOVR technology for maximum cushioning.",
        image:
          "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1112",
      },
      {
        id: 11,
        name: "Nike Air Max 270",
        price: 170,
        stock: 6,
        category: "Men",
        description: "Visible Air cushioning with sporty design.",
        image:
          "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      },
      {
        id: 12,
        name: "Vans Old Skool",
        price: 75,
        stock: 14,
        category: "Unisex",
        description: "Skate classic with canvas and suede upper.",
        image:
          "https://images.unsplash.com/photo-1570464197285-9949814674a7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      },
      {
        id: 13,
        name: "Fila Disruptor II",
        price: 95,
        stock: 8,
        category: "Women",
        description: "Chunky design with street style.",
        image:
          "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      },
      {
        id: 14,
        name: "Salomon XT-6",
        price: 210,
        stock: 5,
        category: "Sports",
        description: "Trail running shoe built for endurance.",
        image:
          "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      },
      {
        id: 15,
        name: "Balenciaga Triple S",
        price: 900,
        stock: 2,
        category: "Unisex",
        description: "Luxury sneaker with iconic bulky sole.",
        image:
          "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      },
      {
        id: 16,
        name: "Puma Triple S",
        price: 700,
        stock: 2,
        category: "Unisex",
        description: " olajs Luxury sneaker with iconic bulky sole.",
        image:
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      },
    ],
    []
  );

  useEffect(() => {
    setTimeout(() => setItems(SHOES), 200);
  }, [SHOES]);

  const filtered = useMemo(() => {
    const base =
      category === "All"
        ? items
        : items.filter(
            (s) => s.category?.toLowerCase() === category.toLowerCase()
          );

    const bySearch = search
      ? base.filter((s) =>
          `${s.name} ${s.description} ${s.category}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      : base;

    if (sort === "low") return [...bySearch].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...bySearch].sort((a, b) => b.price - a.price);
    return bySearch;
  }, [items, category, sort, search]);

  const deferred = useDeferredValue(filtered);
  const categories = ["All", "Men", "Women", "Unisex", "Sports"];

  const handleAddToCart = (shoe) => dispatch(addToCart(shoe));
  const handleBuyNow = (shoe) => {
    dispatch(addToCart(shoe));
    navigate("/cart");
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

     

      {/* Hero */}
      <div className="relative min-h-[60vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=60"
          alt="Sneaker wall"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="relative z-10 w-full max-w-2xl px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5">
            Find Your <span className="text-pink-500">Perfect Pair</span>
          </h1>

          <div className="relative">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search shoes..."
              className="w-full py-3.5 px-5 rounded-full text-black border border-gray-200
                         shadow-[0_10px_20px_rgba(0,0,0,0.35),inset_0_2px_6px_rgba(255,255,255,0.5)]
                         placeholder:text-gray-700 focus:outline-none focus:ring-4 focus:ring-pink-400"
            />
            <Search className="absolute right-4 top-3.5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Products */}
      <section ref={productRef} className="max-w-7xl mx-auto py-14 px-4 sm:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Explore the Collection
        </motion.h2>

        {/* Filter + Sort */}
      <div className="sticky top-[56px] z-40 bg-black/70 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 px-4 sm:px-8 py-3">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm transition shadow-sm ${
                  category === c
                    ? "bg-gradient-to-r from-pink-500 to-purple-600"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSort("low")}
              className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm"
            >
              Price ↑
            </button>
            <button
              onClick={() => setSort("high")}
              className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm"
            >
              Price ↓
            </button>
            <button
              onClick={() => {
                setCategory("All");
                setSort(null);
                setSearch("");
              }}
              className="px-3.5 py-2 rounded-full text-red-400 hover:text-red-300 text-sm"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {deferred.map((shoe) => (
            <motion.div
              key={shoe.id}
              className="rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition"
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl">
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  onError={(e) => (e.currentTarget.src = fallbackImage)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-base md:text-lg font-semibold truncate">
                    {shoe.name}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {shoe.description}
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-500">
                    Category: {shoe.category}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg md:text-xl font-bold">
                    ${shoe.price}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    {shoe.stock <= 0
                      ? "Out of stock"
                      : `${shoe.stock} in stock`}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => handleAddToCart(shoe)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:brightness-110 disabled:opacity-40"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(shoe)}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-extrabold shadow hover:brightness-110"
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
