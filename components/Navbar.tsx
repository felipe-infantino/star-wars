"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/people", label: "People" },
  { href: "/planets", label: "Planets" },
  { href: "/films", label: "Films" },
  { href: "/species", label: "Species" },
  { href: "/starships", label: "Starships" },
  { href: "/vehicles", label: "Vehicles" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-black text-yellow-400">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-bold tracking-widest text-lg hover:text-yellow-200 transition-colors">STAR WARS</Link>

        <button
          className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className={`block h-0.5 w-6 bg-yellow-400 transition-transform duration-300 origin-center ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-yellow-400 transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-yellow-400 transition-transform duration-300 origin-center ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>

        <ul className="hidden md:flex gap-6 items-center">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-semibold tracking-wide hover:text-yellow-200 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <ul
        className={`md:hidden flex flex-col gap-0 overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-4" : "max-h-0"}`}
      >
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={() => setOpen(false)}
              className="block px-6 py-2 font-semibold tracking-wide hover:text-yellow-200 hover:bg-yellow-400/10 transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
