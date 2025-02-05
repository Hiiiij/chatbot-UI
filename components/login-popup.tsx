"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Mail, Eye, EyeOff, Lock } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { FaApple } from "react-icons/fa"
import { useUser } from "@/contexts/user-context"

interface LoginPopupProps {
  onClose: () => void
  onSwitchToSignup?: () => void
}

export function LoginPopup({ onClose, onSwitchToSignup }: LoginPopupProps) {
  const { login } = useUser()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login - replace with actual login logic
    login({
      id: "1",
      name: "John Doe",
      email: email,
    })
    onClose()
  }

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log("Google login clicked")
  }

  const handleAppleLogin = () => {
    // Implement Apple login logic here
    console.log("Apple login clicked")
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const responsiveWidth = "w-full md:w-[80%] lg:w-[70%] xl:w-[60%]"

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#121212] rounded-xl p-6 px-12 w-full max-w-2xl relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-zinc-400 hover:text-white" aria-label="Close">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Login</h2>

        <div className="w-full flex flex-col items-center space-y-4">
          <form onSubmit={handleEmailLogin} className={`${responsiveWidth} space-y-4`}>
            <div className="space-y-4">
              <div className="w-full">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-zinc-900 text-white border-zinc-700 focus:border-primary focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-10 h-12 text-lg rounded-xl placeholder:text-zinc-500 placeholder:text-sm"
                    aria-describedby="email-description"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full bg-zinc-900 text-white border-zinc-700 focus:border-primary focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-10 h-12 text-lg rounded-xl pr-10 placeholder:text-zinc-500 placeholder:text-sm"
                    aria-describedby="password-requirements"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" className="mt-0.5 border-zinc-600 data-[state=checked]:bg-primary" />
                <label htmlFor="terms" className="text-sm text-zinc-400">
                  I confirm that I have read, consent and agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base md:text-lg rounded-xl"
              >
                Log in
              </Button>

              <div className="flex justify-start text-primary text-sm">
                <a href="#" className="hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
          </form>

          <div className={`${responsiveWidth} space-y-4`}>
            <div className="flex items-center gap-2">
              <hr className="flex-grow border-t border-zinc-600" />
              <span className="text-zinc-400">OR</span>
              <hr className="flex-grow border-t border-zinc-600" />
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleGoogleLogin}
                className="w-full bg-zinc-900 hover:bg-zinc-800 active:bg-black text-white border border-primary h-12 text-base md:text-lg rounded-xl flex items-center justify-center space-x-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              >
                <FcGoogle className="h-5 w-5" />
                <span>Continue with Google</span>
              </Button>
              <Button
                onClick={handleAppleLogin}
                className="w-full bg-zinc-900 hover:bg-zinc-800 active:bg-black text-white border border-primary h-12 text-base md:text-lg rounded-xl flex items-center justify-center space-x-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              >
                <FaApple className="h-5 w-5 text-white" />
                <span>Continue with Apple</span>
              </Button>
            </div>
          </div>

          <div className={`${responsiveWidth} pt-4`}>
            <div className="text-center text-zinc-400">
              Don't have an account?{" "}
              <button onClick={onSwitchToSignup} className="text-primary hover:underline focus:outline-none">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

