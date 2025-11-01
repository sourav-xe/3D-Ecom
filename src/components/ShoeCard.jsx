import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { addToCart, updateQuantity } from '../features/cart/cartSlice';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ShoeCard({ shoe }) {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const itemInCart = useSelector(
    (state) => state.cart.items.find((it) => it.id === shoe.id),
    shallowEqual
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (itemInCart) {
      setIsAdded(true);
      setQuantity(itemInCart.quantity);
    } else {
      setIsAdded(false);
      setQuantity(1);
    }
  }, [itemInCart, shoe.id]);

  const handleAddToCart = () => {
    dispatch(addToCart(shoe));
    setIsAdded(true);
  };

  const handleBuyNow = () => {
    dispatch(addToCart(shoe));
    navigate('/cart');
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    dispatch(updateQuantity({ id: shoe.id, quantity: newQuantity }));
  };

  const outOfStock = shoe?.stock <= 0;

  return (
    <div className="p-px rounded-2xl bg-gradient-to-br from-white/15 via-white/5 to-transparent">
      <div
        className="rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700
                   shadow-[0_8px_30px_rgba(0,0,0,0.25)] p-4 transition will-change-transform
                   hover:translate-y-[-2px]"
      >
        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl">
          <img
            src={shoe.image}
            alt={shoe.name}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            draggable={false}
            sizes="(max-width:768px) 100vw, (max-width:1280px) 33vw, 25vw"
          />
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base md:text-lg font-semibold truncate">{shoe.name}</h3>
            <p className="text-xs text-zinc-400 line-clamp-2">{shoe.description}</p>
            <p className="mt-1 text-[11px] text-zinc-500">Category: {shoe.category}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-lg md:text-xl font-bold">${shoe.price}</div>
            <div className="text-[11px] text-zinc-500">
              {outOfStock ? 'Out of stock' : `${shoe.stock} in stock`}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {isAdded ? (
            <>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-4 py-2 rounded-full bg-zinc-700 text-white hover:bg-zinc-600"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-4 py-2 rounded-full bg-zinc-700 text-white hover:bg-zinc-600"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={outOfStock}
                className="px-6 py-2 rounded-full bg-white text-black font-semibold
                           hover:brightness-110 disabled:opacity-40"
              >
                Add More
              </button>
            </>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full
                         bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white font-medium
                         hover:brightness-110 disabled:opacity-40"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          )}

          <button
            onClick={handleBuyNow}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-fuchsia-500
                       text-black font-extrabold shadow hover:brightness-110"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

// Re-render only if relevant shoe fields change
const areEqual = (prev, next) => {
  const a = prev.shoe, b = next.shoe;
  return (
    a?.id === b?.id &&
    a?.price === b?.price &&
    a?.stock === b?.stock &&
    a?.image === b?.image &&
    a?.name === b?.name
  );
};

export default memo(ShoeCard, areEqual);
