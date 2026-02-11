"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const auth = localStorage.getItem('isAuthenticated');
      setIsAuthenticated(auth === 'true');
    };
    
    checkAuth();
    
    // Listen for storage changes
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('placementProfile');
    setIsAuthenticated(false);
    router.push('/Login');
  };

  // Function to manually trigger auth check (can be called from other components)
  const refreshAuth = () => {
    const auth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(auth === 'true');
  };

  return (
    <nav className="bg-[#222831] border-b border-[#393E46] fixed top-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">

        
          <Link href="/" className="text-xl font-bold text-[#00ADB5] hover:text-[#EEEEEE] transition-colors">
            PlacementPrep
          </Link>

     
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/" className="text-[#EEEEEE] hover:text-[#00ADB5] transition-colors font-medium">
              Home
            </Link>
            <Link href="/opportunities" className="text-[#EEEEEE] hover:text-[#00ADB5] transition-colors font-medium">
              Jobs
            </Link>
            <Link href="/quiz" className="text-[#EEEEEE] hover:text-[#00ADB5] transition-colors font-medium">
              Quiz
            </Link>
            <Link href="/profile" className="text-[#EEEEEE] hover:text-[#00ADB5] transition-colors font-medium">
              Profile
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-[#00ADB5] text-[#EEEEEE] px-4 py-2 rounded-lg font-medium hover:bg-[#393E46] transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link href="/Login" className="bg-[#00ADB5] text-[#EEEEEE] px-4 py-2 rounded-lg font-medium hover:bg-[#393E46] transition-colors">
                Login
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-2xl text-[#EEEEEE]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>

        {menuOpen && (
          <div className="md:hidden py-3 space-y-2 border-t border-[#393E46]">
            <Link
              href="/"
              className="block text-[#EEEEEE] hover:text-[#00ADB5] transition-colors py-2"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/opportunities"
              className="block text-[#EEEEEE] hover:text-[#00ADB5] transition-colors py-2"
              onClick={() => setMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link
              href="/quiz"
              className="block text-[#EEEEEE] hover:text-[#00ADB5] transition-colors py-2"
              onClick={() => setMenuOpen(false)}
            >
              Quiz
            </Link>
            <Link
              href="/profile"
              className="block text-[#EEEEEE] hover:text-[#00ADB5] transition-colors py-2"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left bg-[#00ADB5] text-[#EEEEEE] px-4 py-2 rounded-lg font-medium hover:bg-[#393E46] transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/Login"
                className="block bg-[#00ADB5] text-[#EEEEEE] px-4 py-2 rounded-lg font-medium hover:bg-[#393E46] transition-colors text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}

      </div>
    </nav>
  );
}
