// src/pages/Cart.jsx
import React, { useMemo, useState, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';
import Navbar from '../components/Navbar'; // Assuming Navbar is dark-theme-compatible

// Helper to format currency
const currency = (n) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);

// Your Stripe Checkout Link
const STRIPE_CHECKOUT_LINK = 'https://buy.stripe.com/test_5kQ5kxaYx1cBb1O7KCa7C01';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items, shallowEqual);
  const dispatch = useDispatch();

  const [sizes, setSizes] = useState({});
  const [colors, setColors] = useState({});

  const handleRemove = useCallback((id) => {
    dispatch(removeFromCart({ id }));
  }, [dispatch]);

  const handleQuantityChange = useCallback((id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  }, [dispatch]);

  // --- Summary Calculations ---
  const subtotal = useMemo(
    () => cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [cartItems]
  );

  const shipping = subtotal > 0 && subtotal < 100 ? 9.99 : 0;
  const total = subtotal + shipping;
  const isEmpty = cartItems.length === 0;

  return (
    <>
      <Navbar /> 
      {/* Ensure Navbar component also fits the dark theme */}

      <section className="min-h-screen bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-left mb-10">
            Shopping Cart
          </h1>

          {isEmpty ? (
            <p className="text-center text-xl text-gray-400">
              Your cart is empty.
            </p>
          ) : (
            // --- Two-Column Layout ---
            <div className="lg:grid lg:grid-cols-3 lg:gap-12">
              {/* --- Column 1: Cart Items List --- */}
              <div className="lg:col-span-2">
                <ul role="list" className="divide-y divide-gray-700">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex py-6">
                      {/* Item Image */}
                      <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border border-gray-700">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-white">
                            <h3>{item.name}</h3>
                            <p className="ml-4">{currency(item.price)}</p>
                          </div>
                        </div>

                        {/* Options: Size, Color */}
                        <div className="flex gap-4 mt-3">
                          <select
                            id={`size-${item.id}`}
                            className="text-sm px-3 py-1 bg-gray-800 border border-gray-600 rounded-md text-white"
                            value={sizes[item.id] ?? ''}
                            onChange={(e) =>
                              setSizes((s) => ({ ...s, [item.id]: e.target.value }))
                            }
                            aria-label="Select size"
                          >
                            <option value="">Size</option>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                          </select>

                          <select
                            id={`color-${item.id}`}
                            className="text-sm px-3 py-1 bg-gray-800 border border-gray-600 rounded-md text-white"
                            value={colors[item.id] ?? ''}
                            onChange={(e) =>
                              setColors((c) => ({ ...c, [item.id]: e.target.value }))
                            }
                            aria-label="Select color"
                          >
                            <option value="">Color</option>
                            <option value="White">White</option>
                            <option value="Black">Black</option>
                            <option value="Red">Red</option>
                          </select>
                        </div>

                        {/* Bottom Row: Quantity + Remove */}
                        <div className="flex flex-1 items-end justify-between text-sm mt-4">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-gray-600 rounded-md">
                            <button
                              type="button"
                              className="px-3 py-1 text-gray-300 hover:bg-gray-700 rounded-l-md"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              aria-label="Decrease quantity"
                            >
                              &ndash;
                            </button>
                            <span className="px-4 py-1 text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="px-3 py-1 text-gray-300 hover:bg-gray-700 rounded-r-md"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          {/* Remove Button */}
                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-indigo-400 hover:text-indigo-300"
                              onClick={() => handleRemove(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* --- Column 2: Order Summary (Sticky) --- */}
              <div className="lg:col-span-1 mt-10 lg:mt-0">
                <div className="lg:sticky lg:top-24 rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-xl">
                  <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-4">
                    Order Summary
                  </h2>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <dt className="text-base text-gray-300">Subtotal</dt>
                      <dd className="text-base font-medium text-white">
                        {currency(subtotal)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-base text-gray-300">
                        Estimated Shipping
                      </dt>
                      <dd className="text-base font-medium text-white">
                        {shipping === 0 ? 'Free' : currency(shipping)}
                      </dd>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-700 flex items-center justify-between">
                    <dt className="text-lg font-bold text-white">
                      Total
                    </dt>
                    <dd className="text-lg font-bold text-white">
                      {currency(total)}
                    </dd>
                  </div>

                  {/* --- Stripe Checkout Link --- */}
                  <a
                    href={!isEmpty ? STRIPE_CHECKOUT_LINK : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    // Add "block" for full width, and disable-like styles when cart is empty
                    className={`w-full block mt-8 px-6 py-3 bg-white rounded-full text-black font-semibold text-center hover:bg-gray-200 transition ${
                      isEmpty ? 'opacity-50 pointer-events-none' : ''
                    }`}
                    aria-disabled={isEmpty}
                    role="link"
                  >
                    Proceed to Checkout
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}