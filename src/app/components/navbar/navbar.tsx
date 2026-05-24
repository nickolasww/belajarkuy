"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { FaBars, FaTimes, FaUserCircle, FaBell } from "react-icons/fa"

const Navbar = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkUserLogin = () => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        } else {
          setUser(null)
        }
      }
    }

    checkUserLogin()
    window.addEventListener("storage", checkUserLogin)

    return () => {
      window.removeEventListener("storage", checkUserLogin)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Function to check if link is active
  const isActiveLink = (path: string) => {
    return pathname === path
  }

  // Navigation links data
  const navigationLinks = [
    { href: "/pages/courses", label: "Courses" },
    { href: "/pages/quiz", label: "Quiz" },
  ]

  return (
    <div className="relative">
      {/* Desktop Navbar */}
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-5 border-b border-gray-200">
        {/* Logo - Left */}
        <div className="flex items-center">
          <Link href="/pages/home">
            <h1 className="text-2xl md:text-3xl font-bold transition-colors">BelajarKuy</h1>
          </Link>
        </div>

        {/* Navigation Links - Center (Hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className="relative group">
              <span
                className={`text-base lg:text-lg font-medium transition-colors duration-200 ${
                  isActiveLink(link.href) ? "text-orange-600" : "text-gray-700 hover:text-orange-600"
                }`}
              >
                {link.label}
              </span>
              {/* Active indicator line */}
              <span
                className={`absolute -bottom-2 left-0 right-0 h-0.5 bg-orange-600 transition-all duration-200 ${
                  isActiveLink(link.href) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Hamburger Menu Icon - Visible on mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none" aria-label="Toggle menu">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Auth Buttons - Right (Hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
          {user ? (
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsNotifOpen((prev) => !prev)}
                  className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-haspopup="menu"
                  aria-expanded={isNotifOpen}
                  aria-label="Notifications"
                >
                  <FaBell size={18} className="text-gray-700" />
                  <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-orange-500"></span>
                </button>
                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">Notifikasi</p>
                      <p className="text-xs text-gray-500">Terbaru untuk Anda</p>
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="rounded-md px-3 py-2 hover:bg-gray-50">
                        <p className="text-sm text-gray-800">Kelas baru tersedia: Next.js Dasar</p>
                        <p className="text-xs text-gray-500">2 jam yang lalu</p>
                      </div>
                      <div className="rounded-md px-3 py-2 hover:bg-gray-50">
                        <p className="text-sm text-gray-800">Progress Anda mencapai 80%</p>
                        <p className="text-xs text-gray-500">Kemarin</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link
                href="/pages/profile"
                className="flex items-center space-x-2 hover:text-orange-600 transition-colors"
              >
                <FaUserCircle size={20} className="text-orange-600" />
                <span className="text-sm lg:text-base">{user.name}</span>
              </Link>
            </div>
          ) : (
            <>
            {/* Notifications for Guest Users */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsNotifOpen((prev) => !prev)}
                  className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-haspopup="menu"
                  aria-expanded={isNotifOpen}
                  aria-label="Notifications"
                >
                  <FaBell size={18} className="text-gray-700" />
                </button>
                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">Notifikasi</p>
                      <p className="text-xs text-gray-500">Silahkan Login untuk melihat update</p>
                    </div>
                    <div className="p-3">
                      <p className="text-sm text-gray-700">Belum ada notifikasi.</p>
                    </div>
                  </div>
                )}
              </div>
              <Link href="/pages/register">
                <button className="px-3 py-2 lg:px-4 lg:py-2 bg-orange-100 text-orange-600 rounded-md hover:bg-orange-200 transition-colors text-sm lg:text-base">
                  Create account
                </button>
              </Link>
              <Link href="/pages/login">
                <button className="px-3 py-2 lg:px-4 lg:py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-sm lg:text-base">
                  Sign In
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu - Slides down when hamburger is clicked */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-50 border-b border-gray-200 animate-slideDown">
          <div className="flex flex-col p-4 space-y-4">

            {/* Notifications for Mobile */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotifOpen((prev) => !prev)}
                className="flex w-full items-center justify-between p-3 rounded-md"
                aria-haspopup="menu"
                aria-expanded={isNotifOpen}
                aria-label="Notifications"
              >
                <span className="text-sm font-medium text-gray-800">Notifikasi</span>
                <FaBell size={18} className="text-gray-700" />
              </button>
              {isNotifOpen && (
                <div className="mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-sm">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">Notifikasi</p>
                        <p className="text-xs text-gray-500">Terbaru untuk Anda</p>
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="rounded-md px-3 py-2 hover:bg-gray-50">
                          <p className="text-sm text-gray-800">Kelas baru tersedia: Next.js Dasar</p>
                          <p className="text-xs text-gray-500">2 jam yang lalu</p>
                        </div>
                        <div className="rounded-md px-3 py-2 hover:bg-gray-50">
                          <p className="text-sm text-gray-800">Progress Anda mencapai 80%</p>
                          <p className="text-xs text-gray-500">Kemarin</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">Notifikasi</p>
                        <p className="text-xs text-gray-500">Silahkan Login untuk melihat update</p>
                      </div>
                      <div className="p-3">
                        <p className="text-sm text-gray-700">Belum ada notifikasi.</p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Navigation Links for Mobile */}
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block p-3 rounded-md transition-colors ${
                  isActiveLink(link.href)
                    ? "bg-orange-50 text-orange-600 border-l-4 border-orange-600"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Auth Section for Mobile */}
            {user ? (
              <>
                <Link
                  href="/pages/profile"
                  className="flex items-center space-x-2 p-3 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUserCircle size={20} className="text-orange-600" />
                  <span>{user.name}</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/pages/register"
                  className="block p-3 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <button className="w-full text-left font-medium">Create account</button>
                </Link>
                <Link
                  href="/pages/login"
                  className="block p-3 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <button className="w-full text-left font-medium">Sign In</button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
