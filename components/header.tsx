"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { LoginPopup } from "./login-popup"
import { SignupPopup } from "./signup-popup"
import { UserMenu } from "./user-menu"
import { useUser } from "@/contexts/user-context"
import { Menu, X } from "lucide-react"

interface HeaderProps {
  unboundedFont: string
  isLandingPage: boolean
  onLogoClick: () => void
}

export function Header({ unboundedFont, isLandingPage, onLogoClick }: HeaderProps) {
  const { user } = useUser()
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const [showSignupPopup, setShowSignupPopup] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-border/40">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-8">
          <button onClick={onLogoClick} className="flex items-center space-x-2 focus:outline-none group">
            <div className="h-6 w-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6 text-primary group-hover:text-primary/80"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
              </svg>
            </div>
            <span
              className={cn(
                "font-bold sm:inline-block text-primary group-hover:text-primary/80 text-xl",
                unboundedFont,
              )}
            >
              NEWS BEAT
            </span>
          </button>
          <nav className="flex items-center gap-6">
            {!isLandingPage && (
              <div className="relative py-1 group">
                <button className="text-[#5FF4F4] hover:text-[#5FF4F4]/80 text-[15px] font-normal transition-colors duration-200">
                  Chat
                </button>
              </div>
            )}
            {user ? (
              <UserMenu />
            ) : (
              <>
                <button
                  className="text-white/60 hover:text-white text-[15px] font-normal"
                  onClick={() => setShowLoginPopup(true)}
                >
                  Log in
                </button>
                <Button
                  variant="default"
                  onClick={() => setShowSignupPopup(true)}
                  className="bg-white hover:bg-white/90 text-black font-medium px-6 uppercase"
                >
                  Sign Up
                </Button>
              </>
            )}
          </nav>
        </div>
        {isMobile && isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-black border-b border-border/40 py-4 px-8">
            <nav className="flex flex-col space-y-4">
              {!isLandingPage && (
                <div className="relative py-1 group">
                  <button className="text-[#5FF4F4] hover:text-[#5FF4F4]/80 text-[15px] font-normal transition-colors duration-200 text-left">
                    Chat
                  </button>
                </div>
              )}
              {user ? (
                <UserMenu />
              ) : (
                <>
                  <button
                    className="text-white/60 hover:text-white text-[15px] font-normal text-left"
                    onClick={() => {
                      setShowLoginPopup(true)
                      closeMenu()
                    }}
                  >
                    Log in
                  </button>
                  <Button
                    variant="default"
                    className="justify-start bg-white hover:bg-white/90 text-black font-medium uppercase"
                    onClick={() => {
                      setShowSignupPopup(true)
                      closeMenu()
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      {showLoginPopup && (
        <LoginPopup
          onClose={() => setShowLoginPopup(false)}
          onSwitchToSignup={() => {
            setShowLoginPopup(false)
            setShowSignupPopup(true)
          }}
        />
      )}
      {showSignupPopup && (
        <SignupPopup
          onClose={() => setShowSignupPopup(false)}
          onSwitchToLogin={() => {
            setShowSignupPopup(false)
            setShowLoginPopup(true)
          }}
        />
      )}
    </>
  )
}

