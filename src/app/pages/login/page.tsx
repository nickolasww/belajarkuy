"use client"

import React from "react"
import Input from "@/app/components/input/input"
import Image from "next/image"
import LoginImg from "@/app/assets/LoginImg.png"
import Button from "@/app/components/button/button"
import { useRouter } from "next/navigation"

const LoginPage = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (email && password) {
        const user = { name: email.split("@")[0], email }
        localStorage.setItem("user", JSON.stringify(user))

        router.push("/pages/home")
      } else {
        setError("Email dan password harus diisi")
      }
    } catch {
      setError("Terjadi kesalahan saat login")
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
          <a href="/pages/register">
            <button className="text-gray-400 text-sm md:text-base hidden sm:block">{"Don't have account?"}</button>
          </a>
          <a href="/pages/register">
            <button className="px-2 py-1 md:px-4 md:py-2 bg-orange-100 text-orange-600 rounded text-sm md:text-base">
              Create Account
            </button>
          </a>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center flex-grow">
        <div className="hidden lg:block lg:w-1/2 h-full">
          <div className="relative h-full min-h-[500px] xl:min-h-[600px]">
            <Image
              src={LoginImg || "/placeholder.svg"}
              alt="Login Image"
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Sign in to your account</h1>
              <p className="text-gray-600 mt-2 text-sm md:text-base">Welcome back! Please enter your details</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div className="w-full">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Username or email address..."
                  required
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </div>

              <div className="w-full">
                <Input
                  label="Password"
                  type="password"
                  placeholder="Password"
                  showPasswordToggle
                  required
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <div className="w-full">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-center gap-4 sm:gap-0 pt-2">
                <label className="flex gap-2 text-gray-500 text-sm md:text-base">
                  <input type="checkbox" name="agree" className="mt-0.5" />
                  Remember me
                </label>
                <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </div>
            </form>

            <p className="mt-6 text-center text-gray-600 text-sm md:text-base">
              {"Don't have an account?"}{" "}
              <a href="/pages/register" className="text-orange-600 hover:underline font-medium">
                Create Account
              </a>
            </p>
            
            <p className="mt-2 text-center">
              <a href="#" className="text-orange-600 hover:underline text-sm">
                Forgot your password?
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
