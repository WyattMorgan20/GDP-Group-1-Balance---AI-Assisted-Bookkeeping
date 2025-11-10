"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/home" },
        { name: "Download", href: "/download" },
        { name: "Features", href: "/features" },
        { name: "About", href: "/about" }
    ];

    return (
        <nav className="flex justify-center gap-6 p-4 bg-blue-600 text-white shadow-md">
            {navItems.map((item) => (
                <Link
                    key = {item.href}
                    href = {item.href}
                    className={`hover:text-yellow-300 transition-colors ${
                        pathname === item.href ? "font-bold underline" : ""
                    }`}
                >
                    {item.name}
                </Link>
            ))}
        </nav>
    );
}