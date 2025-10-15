'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/destinations', label: 'Destinations', icon: '🗺️' },
  { href: '/calendar', label: 'Calendar', icon: '📅' },
  { href: '/tours', label: 'Tours', icon: '✈️' },
  { href: '/about', label: 'About', icon: 'ℹ️' },
  { href: '/contact', label: 'Contact', icon: '📧' },
];

export default function MobileMenuOverlay({ isOpen, onClose }: MobileMenuOverlayProps) {
  const pathname = usePathname();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={onClose}
    >
      {/* Enhanced Backdrop with animated blur and gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/40 to-blue-900/40 backdrop-blur-md animate-in fade-in duration-300" />

      {/* Menu Panel with Glassmorphism */}
      <div
        className="absolute left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-white/20 transform transition-all duration-500 ease-out animate-in slide-in-from-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
        {/* Navigation Items with staggered animation */}
        <nav className="relative px-4 py-8 overflow-y-auto h-[calc(100%-12rem)]">
          <ul className="space-y-1.5">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <li
                  key={item.href}
                  className="animate-in slide-in-from-left duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`
                      group relative flex items-center gap-4 px-5 py-3.5 rounded-2xl
                      transition-all duration-300 ease-out overflow-hidden
                      ${isActive
                        ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-[1.02]'
                        : 'hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:scale-[1.02] text-gray-700 hover:shadow-md'
                      }
                    `}
                  >
                    {/* Hover shine effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    {/* Icon with enhanced animation */}
                    <span className={`
                      relative text-2xl transition-all duration-300
                      group-hover:scale-125 group-hover:rotate-12
                      ${isActive ? 'drop-shadow-lg' : ''}
                    `}>
                      {item.icon}
                    </span>

                    {/* Label */}
                    <span className="relative font-semibold text-base tracking-wide">
                      {item.label}
                    </span>

                    {/* Active indicator with animation */}
                    {isActive && (
                      <span className="ml-auto relative animate-in zoom-in duration-300">
                        <svg
                          className="w-5 h-5 drop-shadow-md"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}

                    {/* Hover arrow */}
                    {!isActive && (
                      <span className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Modern Footer Section with glassmorphism */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-5 bg-gradient-to-t from-white/80 via-white/60 to-transparent backdrop-blur-lg border-t border-gray-200/50">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
              <p className="text-xs font-medium text-gray-600">Tour App © 2025</p>
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse delay-300" />
            </div>
            <p className="text-[10px] text-gray-400 font-medium">v1.0.0 • Made with ❤️</p>
          </div>
        </div>
      </div>
    </div>
  );
}
