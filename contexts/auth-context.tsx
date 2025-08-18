"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name?: string
  isPremium: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string) => Promise<boolean>
  logout: () => void
  resetPassword: (email: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token")
        const userData = localStorage.getItem("user_data")

        if (token && userData) {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)

      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      const mockUser: User = {
        id: "1",
        email,
        name: email.split("@")[0],
        isPremium: false,
      }

      const mockToken = "mock_jwt_token_" + Date.now()

      localStorage.setItem("auth_token", mockToken)
      localStorage.setItem("user_data", JSON.stringify(mockUser))
      setUser(mockUser)

      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)

      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful signup
      const mockUser: User = {
        id: "1",
        email,
        name: email.split("@")[0],
        isPremium: false,
      }

      const mockToken = "mock_jwt_token_" + Date.now()

      localStorage.setItem("auth_token", mockToken)
      localStorage.setItem("user_data", JSON.stringify(mockUser))
      setUser(mockUser)

      return true
    } catch (error) {
      console.error("Signup failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    setUser(null)
  }

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true)

      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful password reset
      return true
    } catch (error) {
      console.error("Password reset failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
