"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Download", href: "/download" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="bg-linear-to-r from-slate-900 to-blue-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-white transition-colors">
              <span className="text-blue-900 font-bold text-xl">B</span>
            </div>
            <span className="text-white font-bold text-xl group-hover:text-slate-200 transition-colors">
              Balance
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-all duration-200 relative ${
                  pathname === item.href
                    ? "text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-slate-100 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
