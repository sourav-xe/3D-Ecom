import React, { useEffect, useState, memo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import logo from '../assets/logo.png';

const activeClass =
  "text-cyan-300 relative after:content-[''] after:block after:h-[3px] after:w-full after:bg-cyan-400 after:rounded-full after:mt-1 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]";
const baseClass =
  "hover:text-cyan-300 transition duration-300 hover:drop-shadow-[0_0_6px_cyan]";

function Navbar() {
  const totalItems = useSelector(
    (state) => state.cart.items.reduce((t, i) => t + i.quantity, 0),
    shallowEqual
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/user');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-zinc-950/70 backdrop-blur-md text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            NeoKicks
          </span>
        </div>

        {/* Links */}
        <ul className="flex gap-8 text-sm md:text-base font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? activeClass : baseClass}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={({isActive}) => isActive ? activeClass : baseClass}>Shop</NavLink>
          </li>
          <li className="relative">
            <NavLink to="/cart" className={({isActive}) => isActive ? activeClass : baseClass}>
              Cart
            </NavLink>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 text-xs sm:text-sm bg-red-600 text-white rounded-full px-2 py-0.5">
                {totalItems}
              </span>
            )}
          </li>
          <li>
            <NavLink to="/about" className={({isActive}) => isActive ? activeClass : baseClass}>About</NavLink>
          </li>
          <li>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="hover:text-red-500 transition duration-300 hover:drop-shadow-[0_0_6px_red]">
                Logout
              </button>
            ) : (
              <NavLink to="/user" className={({isActive}) => isActive ? activeClass : baseClass}>Login</NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default memo(Navbar);
