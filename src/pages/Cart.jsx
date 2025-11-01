// src/pages/Cart.jsx
import React, { useMemo, useState, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';
import Navbar from '../components/Navbar';

const currency = (n) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items, shallowEqual);
  const dispatch = useDispatch();

  const [sizes, setSizes] = useState({});  // { [id]: 'Medium' }
  const [colors, setColors] = useState({}); // { [id]: 'Black' }

  const handleRemove = useCallback((id) => {
    dispatch(removeFromCart({ id }));
    setSizes((s) => {
      const n = { ...s }; delete n[id]; return n;
    });
    setColors((c) => {
      const n = { ...c }; delete n[id]; return n;
    });
  }, [dispatch]);

  const handleQuantityChange = useCallback((id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  }, [dispatch]);

  const total = useMemo(
    () => cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [cartItems]
  );

  const isEmpty = cartItems.length === 0;

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black text-white py-16 px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-10">Your Cart</h1>

        {isEmpty ? (
          <p className="text-center text-xl">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
            {cartItems.map((item) => (
              <article key={item.id} className="bg-gray-800 p-8 rounded-lg shadow-xl flex flex-col">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={600}
                  className="w-full h-72 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold text-white">{item.name}</h2>
                <p className="text-gray-400 mt-1">{currency(item.price)}</p>

                {/* Choose Size */}
                <div className="mt-4">
                  <label className="text-white block mb-2" htmlFor={`size-${item.id}`}>Choose Size:</label>
                  <select
                    id={`size-${item.id}`}
                    className="w-full px-4 py-2 bg-gray-700 rounded-full text-white"
                    value={sizes[item.id] ?? ''}
                    onChange={(e) => setSizes((s) => ({ ...s, [item.id]: e.target.value }))}
                  >
                    <option value="">Select Size</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                </div>

                {/* Choose Color */}
                <div className="mt-4">
                  <label className="text-white block mb-2" htmlFor={`color-${item.id}`}>Choose Color:</label>
                  <select
                    id={`color-${item.id}`}
                    className="w-full px-4 py-2 bg-gray-700 rounded-full text-white"
                    value={colors[item.id] ?? ''}
                    onChange={(e) => setColors((c) => ({ ...c, [item.id]: e.target.value }))}
                  >
                    <option value="">Select Color</option>
                    <option value="White">White</option>
                    <option value="Black">Black</option>
                    <option value="Red">Red</option>
                  </select>
                </div>

                {/* Item Description */}
                <p className="mt-4 text-gray-300">
                  This is a premium quality product with excellent durability and comfort. Perfect for all-day wear.
                </p>

                {/* Quantity + Remove */}
                <div className="flex items-center gap-4 mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-600 rounded-full text-white font-semibold hover:bg-red-700 transition"
                    onClick={() => handleRemove(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>

                  <div className="flex items-center" role="group" aria-label={`Quantity for ${item.name}`}>
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-600 rounded-l-full text-white"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      –
                    </button>
                    <span className="px-3 py-1 bg-gray-700 text-white">{item.quantity}</span>
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-600 rounded-r-full text-white"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-center">Total: {currency(total)}</h2>

          {/* Shipping Details */}
          <div className="mt-8">
            <h3 className="text-xl text-white font-semibold mb-4">Shipping Details</h3>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter your address"
                className="px-4 py-2 bg-gray-700 rounded-md text-white"
                aria-label="Shipping address"
              />
              <input
                type="date"
                className="px-4 py-2 bg-gray-700 rounded-md text-white"
                aria-label="Preferred delivery date"
              />
              <button
                type="button"
                className="px-6 py-2 bg-green-600 rounded-full text-white font-semibold hover:bg-green-700 transition disabled:opacity-50"
                disabled={isEmpty}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
