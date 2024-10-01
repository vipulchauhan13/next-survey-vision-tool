"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated on initial load
    const token = localStorage.getItem('authToken')
    setIsAuthenticated(!!token)
  }, [])

  const login = async (email: string, password: string) => {
    // Dummy credentials
    if (email === 'user@example.com' && password === 'password') {
      localStorage.setItem('authToken', 'dummy_token')
      setIsAuthenticated(true)
      router.push('/dashboard')
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setIsAuthenticated(false)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}