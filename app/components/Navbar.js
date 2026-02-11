"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b fixed top-0 w-full">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">

        
          <Link href="/" className="text-lg font-bold text-blue-600">
            PlacementPrep
          </Link>

     
          <div className="hidden md:flex gap-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/jobs" className="text-gray-700 hover:text-blue-600">
              Jobs
            </Link>
            <Link href="/quiz" className="text-gray-700 hover:text-blue-600">
              Quiz
            </Link>
            <Link href="/profile" className="text-gray-700 hover:text-blue-600">
              Profile
            </Link>
          </div>

          <button
            className="md:hidden text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>

        {menuOpen && (
          <div className="md:hidden py-3 space-y-2">
            <Link
              href="/"
              className="block text-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/jobs"
              className="block text-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link
              href="/quiz"
              className="block text-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Quiz
            </Link>
            <Link
              href="/profile"
              className="block text-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
          </div>
        )}

      </div>
    </nav>
  );
}
