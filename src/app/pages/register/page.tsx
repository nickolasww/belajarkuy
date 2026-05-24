"use client"
import type React from "react"
import { useState } from "react"
import Input from "@/app/components/input/input"
import Image from "next/image"
import Button from "@/app/components/button/button"
import RegisterImg from "@/app/assets/RegisterImg.png"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/lib/supabase"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.username.trim()) {
      newErrors.username = "Username harus diisi"
    } else if (formData.username.length < 3) {
      newErrors.username = "Username minimal 3 karakter"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }
    if (!formData.password) {
      newErrors.password = "Password harus diisi"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter"
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password harus diisi"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok"
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Anda harus menyetujui syarat dan ketentuan"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      // ✅ Register ke Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username, // dikirim ke trigger handle_new_user
          },
        },
      })

      if (error) {
        if (error.message.includes("already registered")) {
          setErrors({ email: "Email sudah terdaftar" })
        } else {
          setErrors({ general: error.message })
        }
        return
      }

      if (data.user) {
        alert("Registrasi berhasil! Silakan login dengan akun Anda.")
        router.push("/pages/login")
      }
    } catch (error) {
      console.error("Registration error:", error)
      setErrors({ general: "Terjadi kesalahan saat registrasi. Silakan coba lagi." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-56">
        <a href="/pages/home">
          <h1 className="text-xl md:text-2xl font-bold">BelajarKuy</h1>
        </a>
        <div className="flex space-x-2 md:space-x-4 items-center">
          <a href="/pages/login">
            <button className="text-gray-400 text-sm md:text-base hidden sm:block">Have account?</button>
          </a>
          <a href="/pages/login">
            <button className="px-2 py-1 md:px-4 md:py-2 bg-orange-100 text-orange-600 rounded text-sm md:text-base">
              Sign In
            </button>
          </a>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center flex-grow">
        <div className="hidden lg:block lg:w-1/2 h-full">
          <div className="relative h-full min-h-[500px] xl:min-h-[600px]">
            <Image
              src={RegisterImg || "/placeholder.svg"}
              alt="Register Image"
              fill
              style={{ objectFit: "cover" }}
              priority
              className="p-4 lg:p-6 xl:p-8"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 px-4 py-8 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6 md:mb-8 lg:mb-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Create Your Account</h1>
              <p className="text-gray-600 mt-2 text-sm md:text-base">Join BelajarKuy and start your learning journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{errors.general}</p>
                </div>
              )}

              <div className="w-full">
                <Input
                  label="Username"
                  type="text"
                  placeholder="Masukkan username"
                  required
                  value={formData.username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("username", e.target.value)}
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              </div>

              <div className="w-full">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Masukkan alamat email"
                  required
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("email", e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="w-full">
                <Input
                  label="Password"
                  type="password"
                  placeholder="Masukkan password"
                  showPasswordToggle
                  required
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("password", e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="w-full">
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Konfirmasi password"
                  showPasswordToggle
                  required
                  value={formData.confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("confirmPassword", e.target.value)}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              <div className="w-full py-2">
                <label className="flex items-start gap-2 text-gray-600 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("agreeTerms", e.target.checked)}
                    className="mt-1 flex-shrink-0"
                  />
                  <span className="leading-relaxed">
                    Saya menyetujui{" "}
                    <a href="#" className="text-orange-600 hover:underline">syarat dan ketentuan</a>{" "}
                    serta{" "}
                    <a href="#" className="text-orange-600 hover:underline">kebijakan privasi</a>
                  </span>
                </label>
                {errors.agreeTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>}
              </div>

              <div className="w-full pt-2">
                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? "Mendaftar..." : "Create Account"}
                </Button>
              </div>
            </form>

            <p className="mt-6 text-center text-gray-600 text-sm md:text-base">
              Sudah punya akun?{" "}
              <a href="/pages/login" className="text-orange-600 hover:underline font-medium">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage