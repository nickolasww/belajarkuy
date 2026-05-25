"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { FaBars, FaTimes, FaUserCircle, FaBell } from "react-icons/fa"
import { supabase } from "@/app/lib/supabase"

type Profile = {
  username: string
  email: string
}

const Navbar = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) await fetchProfile(session.user.id)
      setIsAuthLoading(false)
    }
    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          await fetchProfile(session.user.id)
          setIsAuthLoading(false)
        }
        if (event === "SIGNED_OUT") {
          setProfile(null)
          setIsAuthLoading(false)
        }
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("username, email")
      .eq("id", userId)
      .single()
    if (!error && data) setProfile(data)
  }

  const isActiveLink = (path: string) => pathname === path

  const navigationLinks = [
    { href: "/pages/home", label: "Home" },
    { href: "/pages/courses", label: "Courses" },
    { href: "/pages/Komunitas", label: "Komunitas" },
    { href: "/pages/quiz", label: "Quiz" },
  ]

  const showAuth = isMounted && !isAuthLoading

  return (
    <div className="relative">
      {/* Desktop Navbar */}
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-5 border-b border-gray-200">

        {/* Logo */}
        <Link href="/pages/home">
          <h1 className="text-2xl md:text-3xl font-bold">BelajarKuy</h1>
        </Link>

        {/* Nav Links - Center */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className="relative group">
              <span className={`text-base lg:text-lg font-medium transition-colors duration-200 ${
                isActiveLink(link.href) ? "text-orange-600" : "text-gray-700 hover:text-orange-600"
              }`}>
                {link.label}
              </span>
              <span className={`absolute -bottom-2 left-0 right-0 h-0.5 bg-orange-600 transition-all duration-200 ${
                isActiveLink(link.href) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`} />
            </Link>
          ))}
        </div>

        {/* Hamburger - Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Right Side - Desktop */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">

          {/* Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsNotifOpen((prev) => !prev)}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Notifications"
            >
              <FaBell size={18} className="text-gray-700" />
              {showAuth && profile && (
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-orange-500" />
              )}
            </button>
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">Notifikasi</p>
                  <p className="text-xs text-gray-500">
                    {showAuth && profile ? "Terbaru untuk Anda" : "Silahkan Login untuk melihat update"}
                  </p>
                </div>
                <div className="p-3 space-y-2">
                  {showAuth && profile ? (
                    <>
                      <div className="rounded-md px-3 py-2 hover:bg-gray-50">
                        <p className="text-sm text-gray-800">Kelas baru tersedia: Next.js Dasar</p>
                        <p className="text-xs text-gray-500">2 jam yang lalu</p>
                      </div>
                      <div className="rounded-md px-3 py-2 hover:bg-gray-50">
                        <p className="text-sm text-gray-800">Progress Anda mencapai 80%</p>
                        <p className="text-xs text-gray-500">Kemarin</p>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-gray-700">Belum ada notifikasi.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Auth Section Desktop */}
          {!showAuth ? (
            <div className="w-[160px] h-8" />
          ) : profile ? (
            <Link
              href="/pages/profile"
              className="flex items-center space-x-2 hover:text-orange-600 transition-colors"
            >
              <FaUserCircle size={20} className="text-orange-600" />
              <span className="text-sm lg:text-base font-medium">{profile.username}</span>
            </Link>
          ) : (
            <>
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-50 border-b border-gray-200">
          <div className="flex flex-col p-4 space-y-4">

            {/* Notif Mobile */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotifOpen((prev) => !prev)}
                className="flex w-full items-center justify-between p-3 rounded-md hover:bg-gray-50"
              >
                <span className="text-sm font-medium text-gray-800">Notifikasi</span>
                <FaBell size={18} className="text-gray-700" />
              </button>
              {isNotifOpen && (
                <div className="mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-sm">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Notifikasi</p>
                    <p className="text-xs text-gray-500">
                      {showAuth && profile ? "Terbaru untuk Anda" : "Silahkan Login untuk melihat update"}
                    </p>
                  </div>
                  <div className="p-3 space-y-2">
                    {showAuth && profile ? (
                      <>
                        <div className="rounded-md px-3 py-2 hover:bg-gray-50">
                          <p className="text-sm text-gray-800">Kelas baru tersedia: Next.js Dasar</p>
                          <p className="text-xs text-gray-500">2 jam yang lalu</p>
                        </div>
                        <div className="rounded-md px-3 py-2 hover:bg-gray-50">
                          <p className="text-sm text-gray-800">Progress Anda mencapai 80%</p>
                          <p className="text-xs text-gray-500">Kemarin</p>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-gray-700">Belum ada notifikasi.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Nav Links Mobile */}
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

            <div className="border-t border-gray-200" />

            {/* Auth Mobile */}
            {!showAuth ? (
              <div className="h-10" />
            ) : profile ? (
              <Link
                href="/pages/profile"
                className="flex items-center space-x-2 p-3 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUserCircle size={20} className="text-orange-600" />
                <span className="font-medium">{profile.username}</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/pages/register"
                  className="block p-3 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-medium">Create account</span>
                </Link>
                <Link
                  href="/pages/login"
                  className="block p-3 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-medium">Sign In</span>
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